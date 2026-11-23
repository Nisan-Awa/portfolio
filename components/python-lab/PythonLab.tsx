"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BookOpen, Check, CheckCircle2, Code2, Download, FileText, Lightbulb, List, Play, Plus, RotateCcw, Search, ShieldCheck, Sparkles, Square, Terminal, Upload, X } from "lucide-react";
import { CodeEditor } from "./CodeEditor";
import { usePythonRunner } from "./usePythonRunner";
import { updateProgress, useLabProgress } from "./progress-store";
import { learningStyles, lessons, modules, playgroundExamples, starterProgram } from "@/lib/python-lab/curriculum";
import { downloadText, MAX_BACKUP_BYTES, MAX_CODE_LENGTH, MAX_INPUT_LENGTH, parseProgress } from "@/lib/python-lab/progress";
import type { DataFile, LabMode, LearningStyle, Pane } from "@/lib/python-lab/types";

const errorHelp: Record<string, string> = {
  SyntaxError: "Check matching quotes and brackets, and look for a missing colon near the named line.",
  IndentationError: "Keep the lines in a block indented consistently. The Indent button inserts four spaces.",
  TabError: "Use spaces consistently for indentation. Avoid mixing tabs and spaces in the same block.",
  NameError: "Check the name's spelling and capitals. Assign a value before using the name.",
  TypeError: "Check the types of your values. For example, convert numeric input before adding it to a number.",
  ValueError: "The value has the wrong form for this operation. int() needs whole-number text; float() can accept decimal text.",
  ZeroDivisionError: "A number cannot be divided by zero. Check the divisor before the calculation.",
  IndexError: "That position is outside the collection. Positions start at 0; an empty collection has no first item.",
  KeyError: "That key is missing. Check the spelling or use dictionary.get() with a suitable default.",
  ModuleNotFoundError: "This browser session includes Python and its supported standard library. Desktop modules and additional packages may be unavailable.",
  ImportError: "Check the module and tool names. Some desktop-specific modules and external packages are unavailable here.",
  EOFError: "Add responses to Program input before running: one line for each input() call, in order.",
  AssertionError: "A test condition was false. Compare what your function returns with the expected result.",
};

export default function PythonLab() {
  const searchParams = useSearchParams();
  const { progress, saving } = useLabProgress();
  const selected = lessons.find(item => item.id === searchParams.get("lesson")) ?? lessons.find(item => item.id === progress.lastLesson) ?? lessons[0];
  const mode: LabMode = searchParams.get("mode") === "play" ? "play" : "learn";
  const key = mode === "play" ? "playground" : selected.id;
  const code = progress.drafts[key] ?? (mode === "play" ? starterProgram : selected.starter ?? selected.example);
  const input = progress.inputs[key] ?? (mode === "play" ? "" : selected.input ?? "");
  const choice = progress.predictions[selected.id];
  const style = learningStyles.find(item => item.id === progress.style)!;
  const isYoung = progress.style === "little" || progress.style === "explorer";
  const currentIndex = lessons.indexOf(selected);
  const [pane, setPane] = useState<Pane>("lesson");
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [hints, setHints] = useState(0);
  const [notice, setNotice] = useState("");
  const [files, setFiles] = useState<DataFile[]>([]);
  const [undo, setUndo] = useState<{ key: string; code: string; input: string } | null>(null);
  const backupInput = useRef<HTMLInputElement>(null);
  const codeInput = useRef<HTMLInputElement>(null);
  const dataInput = useRef<HTMLInputElement>(null);
  const workspace = useRef<HTMLElement>(null);
  const runnerFrame = useRef<HTMLIFrameElement>(null);
  const runner = usePythonRunner(runnerFrame);
  const completion = Math.round(progress.completed.length / lessons.length * 100);

  function showPane(next: Pane, focusHeading = false) {
    setPane(next);
    requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 760px)").matches) workspace.current?.scrollIntoView({ behavior: "instant", block: "start" });
      if (focusHeading) document.getElementById(next === "code" ? "editor-title" : next === "output" ? "output-title" : "lesson-heading")?.focus({ preventScroll: true });
    });
  }
  function movePane(event: KeyboardEvent<HTMLButtonElement>, current: Pane) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const views: Pane[] = mode === "play" ? ["code", "output"] : ["lesson", "code", "output"];
    const position = views.indexOf(current);
    const next = event.key === "Home" ? views[0] : event.key === "End" ? views[views.length - 1] : views[(position + (event.key === "ArrowRight" ? 1 : views.length - 1)) % views.length];
    showPane(next);
    document.getElementById("tab-" + next)?.focus();
  }

  function editCode(value: string) {
    if (value.length > MAX_CODE_LENGTH) { setNotice("Keep programs within 30,000 characters so this workspace stays responsive."); return; }
    updateProgress(previous => ({ ...previous, drafts: { ...previous.drafts, [key]: value } }));
  }
  function editInput(value: string) { updateProgress(previous => ({ ...previous, inputs: { ...previous.inputs, [key]: value.slice(0, MAX_INPUT_LENGTH) } })); }
  function replaceCode(value: string, responses = input) {
    if (runner.busy) return;
    setUndo({ key, code, input });
    updateProgress(previous => ({ ...previous, drafts: { ...previous.drafts, [key]: value }, inputs: { ...previous.inputs, [key]: responses } }));
    runner.clear();
    showPane("code", true);
    setNotice("Code loaded. You can restore your previous code with Undo below.");
  }
  function go(nextMode: LabMode, lessonId = selected.id, scroll = true) {
    if (runner.busy) runner.stop();
    runner.clear();
    const url = new URL(window.location.href);
    if (nextMode === "play") { url.searchParams.set("mode", "play"); url.searchParams.delete("lesson"); }
    else { url.searchParams.delete("mode"); url.searchParams.set("lesson", lessonId); }
    window.history.replaceState(null, "", url.pathname + url.search);
    if (nextMode === "learn") updateProgress(previous => ({ ...previous, lastLesson: lessonId }));
    setHints(0);
    setNotice("");
    setOutlineOpen(false);
    setPane(nextMode === "play" ? "code" : "lesson");
    if (scroll) requestAnimationFrame(() => workspace.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }));
  }
  function run(operation: "run" | "check" = "run") {
    if (runner.busy) return;
    if (operation === "check" && mode === "learn" && choice !== selected.prediction.right) {
      setNotice(choice === undefined ? "Make a prediction in the lesson before checking your task." : "Revisit your prediction first. The explanation will help you understand this task.");
      showPane("lesson", true);
      return;
    }
    setNotice("");
    showPane("output", true);
    const lessonId = selected.id;
    runner.run({ operation, code, input, files: mode === "play" ? files : [], checks: operation === "check" ? selected.checks : undefined, constructs: operation === "check" ? selected.constructs : undefined }, result => {
      if (operation === "check" && result.passed) {
        updateProgress(previous => ({ ...previous, completed: [...new Set([...previous.completed, lessonId])] }));
      }
    });
  }
  async function importBackup(file?: File) {
    if (!file) return;
    try {
      if (file.size > MAX_BACKUP_BYTES) throw new Error("Choose a progress backup smaller than 12 MB.");
      const restored = parseProgress(JSON.parse(await file.text()));
      updateProgress(previous => ({ ...restored, drafts: { ...restored.drafts, ...previous.drafts }, inputs: { ...restored.inputs, ...previous.inputs }, predictions: { ...restored.predictions, ...previous.predictions }, completed: [...new Set([...previous.completed, ...restored.completed])] }));
      setNotice("Progress imported. Your current drafts were kept wherever both backups contained the same lesson.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "That backup could not be read. Your work has been kept."); }
  }
  async function importCode(file?: File) {
    if (!file) return;
    try {
      if (!file.name.toLowerCase().endsWith(".py") || file.size > 100000) throw new Error("Choose a .py text file, up to 100 KB.");
      const text = await file.text();
      if (text.length > MAX_CODE_LENGTH || text.includes("\0")) throw new Error("Choose a Python text file with no more than 30,000 characters.");
      replaceCode(text);
    } catch (error) { setNotice(error instanceof Error ? error.message : "The code file could not be read."); }
  }
  async function importData(file?: File) {
    if (!file) return;
    try {
      if (!/\.(txt|csv|json|py)$/i.test(file.name) || !/^[^/\\]+$/.test(file.name) || file.size > 100000) throw new Error("Choose a text, CSV, JSON or Python file up to 100 KB.");
      if (files.length >= 5 && !files.some(item => item.name === file.name)) throw new Error("Attach up to five data files per run.");
      const text = await file.text();
      if (text.includes("\0")) throw new Error("This file contains binary data. Choose a UTF-8 text file.");
      setFiles(previous => [...previous.filter(item => item.name !== file.name), { name: file.name, text }]);
      setNotice(`${file.name} attached for playground runs. Attached files are kept in this tab's memory, not in progress backups.`);
    } catch (error) { setNotice(error instanceof Error ? error.message : "The data file could not be read."); }
  }

  return <div className={"python-lab style-" + progress.style} style={{ "--reading-size": `${progress.fontSize}px` } as CSSProperties}>
    <section className="lab-intro" aria-labelledby="lab-title">
      <div>
        <p className="lab-eyebrow"><span className="lab-mark"><Code2 size={17} aria-hidden="true" /></span> Python Lab <span className="lab-byline">by Nisan Awa</span></p>
        <h1 id="lab-title">Small steps.<br /><span>Real Python.</span></h1>
        <p className="lab-lead">Turn “I wonder…” into “I made this.” Learn one idea, try it, and make it your own. A welcoming place to start, at any age.</p>
        <div className="lab-intro-actions"><button className="lab-button primary" onClick={() => go("learn", selected.id, true)}><BookOpen size={18} />{progress.completed.length ? "Continue learning" : "Start with your first line"}</button><button className="lab-button quiet" onClick={() => go("play", selected.id, true)}><Terminal size={18} />Open playground</button></div>
        <p className="lab-small intro-footnote">Free to explore · No account needed · Your own pace</p>
      </div>
      <div className="lab-welcome-card">
        <div className="welcome-card-top"><span className="welcome-icon"><Terminal size={23} /></span><span>One line is a beginning.</span><span className="python-version">Python 3</span></div>
        <pre aria-label="Example Python instruction"><span className="syntax-comment"># Every programmer starts somewhere.</span>{"\n"}<span className="syntax-keyword">print</span>(<span className="syntax-string">&quot;I can build this.&quot;</span>)</pre>
        <p className="welcome-output">I can build this.<span className="welcome-caret" aria-hidden="true" /></p>
        <div className="welcome-progress"><div><strong>{progress.completed.length}<span> / 40</span></strong><p>lessons completed</p></div><div className="progress-ring" style={{ "--progress": `${completion}%` } as CSSProperties}><span>{completion}%</span></div></div>
        <p className="lab-small">10 chapters, from your first message to a useful little program.</p>
      </div>
    </section>

    <section className="lab-home-controls" aria-label="Learning preferences">
      <div className="lab-mode-switch" aria-label="Choose a workspace"><button aria-pressed={mode === "learn"} className={mode === "learn" ? "selected" : ""} onClick={() => go("learn")}><BookOpen size={17} />Learn step by step</button><button aria-pressed={mode === "play"} className={mode === "play" ? "selected" : ""} onClick={() => go("play")}><Code2 size={18} />Playground</button></div>
      <div className="learning-style-control"><label htmlFor="learning-style">Make it feel like you</label><select id="learning-style" value={progress.style} onChange={event => {
        const nextStyle = event.target.value as LearningStyle;
        updateProgress(previous => ({ ...previous, style: nextStyle, fontSize: nextStyle === "little" ? Math.max(18, previous.fontSize) : previous.fontSize }));
      }}>{learningStyles.map(item => <option key={item.id} value={item.id}>{item.title} · {item.ages}</option>)}</select></div>
    </section>
    <p className="style-description"><Sparkles size={15} aria-hidden="true" />{style.description} <span>Age ranges are suggestions. Every lesson stays open.</span></p>

    <section ref={workspace} id="workspace" className={"lab-layout " + (mode === "play" ? "playground-layout" : "")} aria-label={mode === "learn" ? "Python learning workspace" : "Open Python playground"}>
      {mode === "learn" && <aside className={"lab-outline " + (outlineOpen ? "outline-open" : "")} aria-label="Course lessons">
        <button className="outline-toggle" onClick={() => setOutlineOpen(open => !open)} aria-expanded={outlineOpen} aria-controls="lesson-list"><List size={18} />Lessons<span>{progress.completed.length}/40</span></button>
        <div id="lesson-list" className="outline-content">
          <div className="outline-heading"><h2>Your learning path</h2><span>{progress.completed.length}/40</span></div>
          <progress max={40} value={progress.completed.length} aria-label="Completed lessons" />
          <label className="lesson-search"><Search size={16} aria-hidden="true" /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Find an idea…" aria-label="Search lessons" /></label>
          <div className="module-list">{modules.map((module, index) => {
            const group = lessons.filter(item => item.module === index + 1 && (!search || `${item.title} ${item.goal} ${module.title}`.toLowerCase().includes(search.toLowerCase())));
            if (!group.length) return null;
            return <details key={module.title + (search ? "-search" : "")} open={search ? true : selected.module === index + 1} className="course-module">
              <summary><span className="module-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{module.title}<small>{module.level}</small></span>{lessons.filter(item => item.module === index + 1).every(item => progress.completed.includes(item.id)) && <CheckCircle2 size={15} className="module-completed" aria-label="Chapter completed" />}</summary>
              <div>{group.map(item => <a key={item.id} href={`?lesson=${item.id}`} aria-current={item.id === selected.id ? "step" : undefined} onClick={event => { if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return; event.preventDefault(); go("learn", item.id); }}><span className={progress.completed.includes(item.id) ? "lesson-status complete" : "lesson-status"}>{progress.completed.includes(item.id) ? <Check size={12} aria-label="Completed" /> : <span aria-hidden="true" />}</span>{item.title}</a>)}</div>
            </details>;
          })}{!lessons.some(item => `${item.title} ${item.goal} ${modules[item.module - 1].title}`.toLowerCase().includes(search.toLowerCase())) && <p className="lab-small">No matching lesson. Try “input”, “list” or “function”.</p>}</div>
        </div>
      </aside>}
      <div className="lab-work-area">
        <div className="workspace-heading"><div><p className="lab-eyebrow">{mode === "learn" ? `Chapter ${selected.module} · Lesson ${currentIndex + 1}` : "An open page for your ideas"}</p><h2>{mode === "learn" ? selected.title : "What will you make?"}</h2></div><span className={"save-state " + saving}>{saving === "pending" ? "Saving…" : saving === "memory" ? "Session only · export to keep" : "Saved on this browser"}</span></div>
        <div className="lab-mobile-tabs" role="tablist" aria-label="Workspace view">{(mode === "play" ? ["code", "output"] : ["lesson", "code", "output"]).map(item => <button key={item} id={"tab-" + item} role="tab" aria-selected={(mode === "play" && pane === "lesson" ? "code" : pane) === item} aria-controls={"pane-" + item} tabIndex={(mode === "play" && pane === "lesson" ? "code" : pane) === item ? 0 : -1} onKeyDown={event => movePane(event, item as Pane)} onClick={() => showPane(item as Pane)}>{item === "lesson" ? "Learn" : item === "code" ? "Code" : "Output"}{item === "output" && runner.busy && <span className="tab-working" aria-label="Working" />}</button>)}</div>
        {notice && <div className="lab-notice" role="status"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={16} /></button></div>}
        {undo?.key === key && <div className="undo-row"><button onClick={() => { if (!undo || runner.busy) return; updateProgress(previous => ({ ...previous, drafts: { ...previous.drafts, [key]: undo.code }, inputs: { ...previous.inputs, [key]: undo.input } })); setUndo(null); setNotice("Previous code restored."); }} disabled={runner.busy}><RotateCcw size={14} />Undo code replacement</button></div>}
        <div className={"workspace-panes active-" + (mode === "play" && pane === "lesson" ? "code" : pane)}>
          {mode === "learn" && <article id="pane-lesson" role="tabpanel" className="lab-lesson lab-panel" aria-labelledby="lesson-heading">
            <div className="panel-heading"><BookOpen size={17} /><h3 id="lesson-heading" tabIndex={-1}>Understand it</h3><span className="lesson-time">5–10 min · take your time</span></div>
            <div className="lesson-reading">
              <p className="lesson-goal">{selected.goal}</p>
              {progress.style === "little" ? <><p className="young-explanation">{selected.young}</p><details className="extra-explanation"><summary>Read a little more together</summary>{selected.explain.map(text => <p key={text}>{text}</p>)}</details></> : selected.explain.map(text => <p key={text}>{text}</p>)}
              {(progress.style === "everyday" || progress.style === "independent") && <p className="everyday-context"><Lightbulb size={17} aria-hidden="true" />{selected.everyday}</p>}
              <div className="worked-example"><div><h4>A small example</h4><button onClick={() => replaceCode(selected.example, selected.input ?? "")} disabled={runner.busy}>Try this code</button></div><pre><code>{selected.example}</code></pre><span className="example-label">Expected output{selected.input ? " · using the sample input" : ""}</span><pre className="example-output">{selected.exampleOutput}</pre></div>
              <fieldset className="prediction"><legend>Pause & predict</legend><p>{selected.prediction.question}</p>{selected.prediction.options.map((option, index) => <label key={option} className={choice === index ? "chosen" : ""}><input type="radio" name={"prediction-" + selected.id} checked={choice === index} disabled={runner.busy} onChange={() => updateProgress(previous => ({ ...previous, predictions: { ...previous.predictions, [selected.id]: index } }))} /><span>{option}</span></label>)}{choice !== undefined && <p className={"prediction-explanation " + (choice === selected.prediction.right ? "correct" : "")} role="status">{choice === selected.prediction.right ? "That's right. " : "Take another look. "}{selected.prediction.why}</p>}</fieldset>
              <div className="lesson-challenge"><p className="lab-eyebrow">Now make it yours</p><h4>Your small challenge</h4><p>{selected.challenge}</p><button className="lab-button primary" onClick={() => showPane("code", true)}><Code2 size={17} />Work on the code</button></div>
              <div className="lesson-hints"><button className="hint-button" onClick={() => setHints(value => Math.min(value + 1, selected.hints.length))} disabled={hints >= selected.hints.length}><Lightbulb size={17} />{hints === 0 ? "A little hint" : hints >= selected.hints.length ? "Both hints are open" : "One more hint"}</button>{selected.hints.slice(0, hints).map((hint, index) => <p key={hint}><strong>Hint {index + 1}.</strong> {hint}</p>)}<details key={selected.id + "-solution"}><summary>See one possible solution</summary><p>Read it, explain it in your own words, then try writing it again.</p><pre><code>{selected.solution}</code></pre><button className="lab-button quiet" onClick={() => replaceCode(selected.solution, selected.input ?? "")} disabled={runner.busy}>Explore this solution</button></details></div>
              {progress.completed.includes(selected.id) && <div className="lesson-milestone"><CheckCircle2 size={23} /><div><strong>{isYoung ? "Another step to be proud of!" : "Activity completed"}</strong><p>You predicted the example and passed the coding checks.</p></div></div>}
              <div className="lesson-navigation"><button className="lab-button quiet" disabled={currentIndex === 0} onClick={() => go("learn", lessons[currentIndex - 1].id)}>Previous</button><button className="lab-button quiet" onClick={() => currentIndex < lessons.length - 1 ? go("learn", lessons[currentIndex + 1].id) : go("play")}>{currentIndex === lessons.length - 1 ? "Build your own project" : "Next lesson"}</button></div>
            </div>
          </article>}
          <div className="lab-coding-column">
            <section id="pane-code" role="tabpanel" className="lab-editor-panel lab-panel" aria-labelledby="editor-title">
              <div className="panel-heading"><Code2 size={18} /><h3 id="editor-title" tabIndex={-1}>{mode === "play" ? "your_idea.py" : "your_code.py"}</h3><div className="font-controls"><button aria-label="Decrease reading and code text size" disabled={progress.fontSize <= 14} onClick={() => updateProgress(previous => ({ ...previous, fontSize: Math.max(14, previous.fontSize - 2) }))}>A−</button><button aria-label="Increase reading and code text size" disabled={progress.fontSize >= 24} onClick={() => updateProgress(previous => ({ ...previous, fontSize: Math.min(24, previous.fontSize + 2) }))}>A+</button></div></div>
              {mode === "play" && <div className="playground-presets"><label htmlFor="playground-example">Start anywhere</label><select id="playground-example" value="" disabled={runner.busy} onChange={event => { const example = playgroundExamples.find(item => item.title === event.target.value); if (example) replaceCode(example.code, example.input); }}><option value="" disabled>Choose a starting point…</option>{playgroundExamples.map(item => <option key={item.title} value={item.title}>{item.title}</option>)}</select></div>}
              <div className="mobile-run-top"><button className="lab-button primary" onClick={() => run()} disabled={runner.busy}><Play size={16} />Run code</button>{runner.busy ? <button className="lab-button stop-button" onClick={runner.stop}><Square size={14} />Stop</button> : mode === "learn" && <button className="lab-button check-button" onClick={() => run("check")}><CheckCircle2 size={16} />Check my task</button>}</div>
              <CodeEditor code={code} onChange={editCode} fontSize={progress.fontSize} busy={runner.busy} onRun={() => run()} />
              <details className="program-input" open={/\binput\s*\(/.test(code) || input !== ""}><summary>Program input <span>for input()</span></summary><label htmlFor="program-input" className="sr-only">Program input responses, one per line</label><textarea id="program-input" value={input} onChange={event => editInput(event.target.value)} placeholder={"One response per line, before Run.\nFor example:\nAda\n12"} maxLength={MAX_INPUT_LENGTH} spellCheck={false} readOnly={runner.busy} rows={3} /><p className="lab-small">One line per input() call, in question order. You can use made-up information.</p></details>
              {mode === "play" && <div className="data-files"><button onClick={() => dataInput.current?.click()} disabled={runner.busy}><Plus size={15} />Attach a data file</button><span className="lab-small">.txt, .csv, .json, .py · up to 100 KB each</span>{files.map(file => <span className="file-chip" key={file.name}><FileText size={14} />{file.name}<button onClick={() => setFiles(previous => previous.filter(item => item.name !== file.name))} disabled={runner.busy} aria-label={"Remove " + file.name}><X size={13} /></button></span>)}</div>}
              <div className="run-controls"><div><button className="lab-button primary run-button" onClick={() => run()} disabled={runner.busy}><Play size={17} fill="currentColor" />Run code</button>{runner.busy && <button className="lab-button stop-button" onClick={runner.stop}><Square size={14} fill="currentColor" />Stop</button>}{mode === "learn" && <button className="lab-button check-button" onClick={() => run("check")} disabled={runner.busy}><CheckCircle2 size={17} />Check my task</button>}</div>{mode === "learn" && <p className="lab-small">Run uses your input. Check tries the activity’s test cases.</p>}</div>
              <div className="code-file-actions"><button onClick={() => replaceCode(mode === "play" ? starterProgram : selected.starter ?? selected.example, mode === "play" ? "" : selected.input ?? "")} disabled={runner.busy}><RotateCcw size={14} />Reset code</button><button onClick={() => downloadText(mode === "play" ? "my_python_program.py" : selected.id + ".py", code)}><Download size={14} />Download .py</button><button onClick={() => codeInput.current?.click()} disabled={runner.busy}><Upload size={14} />Open .py</button><span>{code.length.toLocaleString()} / 30,000</span></div>
            </section>
            <section id="pane-output" role="tabpanel" className="lab-output lab-panel" aria-labelledby="output-title">
              <div className="panel-heading"><Terminal size={17} /><h3 id="output-title" tabIndex={-1}>Output</h3><span className="runtime-label">{runner.busy ? "Working on your device" : "Python 3 · in your browser"}</span><button className="clear-output" onClick={runner.clear} disabled={runner.busy}>Clear</button></div>
              {runner.busy ? <div className="runtime-working" role="status"><span className="runtime-spinner" /><div><strong>{runner.state === "loading" ? "Getting Python ready…" : "Running your program…"}</strong><p>{runner.state === "loading" ? "The first run downloads Python. On a slow connection, this can take a little while." : "You can stop this run at any time."}</p></div><button className="lab-button quiet" onClick={runner.stop}><Square size={14} />Stop</button></div> : runner.result ? <div className="output-content">
                {typeof runner.result.passed === "boolean" && <div className={"check-feedback " + (runner.result.passed ? "passed" : "try-again")} role="status"><strong>{runner.result.passed ? (isYoung ? "You did it!" : "Task checks passed") : "A useful next step"}</strong><pre>{runner.result.feedback}</pre>{runner.result.passed && mode === "learn" && <button className="lab-button quiet" onClick={() => currentIndex < 39 ? go("learn", lessons[currentIndex + 1].id) : go("play")}>{currentIndex < 39 ? "Keep learning" : "Make something of your own"}</button>}</div>}
                {runner.result.inputs.length > 0 && <details className="used-inputs"><summary>Inputs used in this run ({runner.result.inputs.length})</summary>{runner.result.inputs.map((item, index) => <p key={index}><span>{item.prompt || `Input ${index + 1}: `}</span><code>{item.response === "" ? "(blank line)" : item.response}</code></p>)}</details>}
                <pre className="terminal-output" tabIndex={0} aria-label="Python program output">{runner.result.stdout || (runner.result.error ? "" : "Your program finished without printed output. Use print() to display a result.")}</pre>
                {runner.result.error && <div className="python-error" role="alert"><strong>{runner.result.error.name}{runner.result.error.line ? ` · line ${runner.result.error.line}` : ""}</strong><p>{runner.result.error.message}</p>{errorHelp[runner.result.error.name] && <p className="error-tip"><Lightbulb size={16} />{errorHelp[runner.result.error.name]}</p>}{runner.result.error.detail && <details><summary>Technical details</summary><pre>{runner.result.error.detail}</pre></details>}</div>}
                {!!runner.result.files?.length && <div className="output-files"><h4>Files from this run</h4>{runner.result.files.map(file => <button key={file.name} onClick={() => downloadText(file.name, file.text)}><Download size={15} />{file.name}</button>)}<p className="lab-small">Download to keep them. Each new run starts with a fresh file space.</p></div>}
                {!runner.result.error && !runner.result.passed && <p className="run-finished"><Check size={14} />Run finished{runner.result.cases ? ` · check ${runner.result.cases}` : ""}</p>}
              </div> : <div className="output-empty"><span><Terminal size={26} /></span><strong>Your next discovery goes here.</strong><p>Write a line, press Run code, and see what happens. Errors are clues, too.</p>{mode === "play" && <p className="lab-small">Your own Python programs are welcome, including functions, loops and supported standard-library modules.</p>}</div>}
              {mode === "learn" && <button className="mobile-back-to-code" onClick={() => showPane("code", true)}><Code2 size={16} />Back to code</button>}
            </section>
          </div>
        </div>
      </div>
    </section>

    <section className="lab-keep-going" aria-label="Keep your learning"><div><ShieldCheck size={21} /><div><h2>Your learning belongs to you.</h2><p>Drafts and progress stay on this browser. Export a backup to move devices or keep a copy. No sign-in, tracking account or public scores.</p></div></div><div className="backup-actions"><button onClick={() => downloadText("python-lab-progress.json", JSON.stringify(progress, null, 2), "application/json")}><Download size={16} />Export progress</button><button onClick={() => backupInput.current?.click()}><Upload size={16} />Import progress</button><button onClick={async () => { try { await navigator.clipboard.writeText(window.location.href); setNotice("Lesson link copied. It shares the activity, not your code or personal progress."); } catch { setNotice("Copy the address in your browser to share this activity. Your drafts are not included in the link."); } }}>Copy lesson link</button></div></section>

    <section id="learning-guide" className="lab-guide" aria-labelledby="guide-title"><div><p className="lab-eyebrow">Good learning is a habit</p><h2 id="guide-title">Understand a little.<br />Make something with it.</h2><p>Take one idea at a time. Try a prediction before Run. Change something small, explain the result, and come back when you are ready.</p><Link href="/" className="lab-portfolio-link">Explore Nisan’s portfolio</Link></div><div className="guide-questions">
      <details><summary>Where should I start?</summary><p>Start with “Say hello” if programming is new. If you already know the basics, choose any chapter. All 40 lessons are open; the suggested ages change the presentation, not access. Little steps is designed for learning with an adult helper, especially before confident reading and typing.</p></details>
      <details><summary>Can I run my own code?</summary><p>Yes. Open Playground and type, paste or open a .py file. Python 3 runs on your device. Enter input() responses before Run. Supported standard-library modules such as math, random, json, csv and pathlib are available. Desktop windows, operating-system automation, network services and arbitrary pip packages are outside this lab.</p><p>Each run has a fresh session, an 8-second execution limit and a 12,000-character output limit. Code is limited to 30,000 characters. These bounds keep everyday experiments manageable; very large allocations can still exhaust a browser tab. Run code you understand.</p></details>
      <details><summary>Is it free? Does it work offline?</summary><p>The lab uses no paid execution API or AI assistant. The first Run downloads the Python runtime from a public CDN and uses your internet connection; browser caching can speed up later runs. Reliable offline use is not guaranteed. If a school network blocks cdn.jsdelivr.net, the lessons still work but Python cannot load until that access is available.</p><p>The website remains subject to its existing hosting limits. No account, paid plan or purchase is needed to use these learning features.</p></details>
      <details><summary>How do files and saving work?</summary><p>Autosave uses this browser’s local storage, not a cloud account. Clearing browser data can remove drafts. In private browsing or when storage is unavailable, export progress before leaving. Shared-device users should use their own browser profile or keep individual backups; local progress is not a secure assessment record.</p><p>Playground data files stay in this tab’s memory and are excluded from progress backups. A run can read attached files and create text, CSV, JSON or Python files in its temporary workspace. Download output files to keep them. No program gets direct access to your device’s folders.</p></details>
      <details><summary>Learning together, or teaching a class?</summary><p>Choose a lesson and copy its link. Demonstrate one idea, let everyone predict the output, then give them time to change and explain the code. Two short activities can fill a practical session. Take turns typing when sharing a device. Ask “What changed, and why?” before supplying a solution.</p><p>Checks are practice feedback on this device. They do not send marks to a teacher or provide secure exam grading. If devices or internet are unavailable, read the examples together and predict results on paper.</p></details>
      <details><summary>What comes after these lessons?</summary><p>Make a different quiz, expand a shopping helper, or read a small CSV file in Playground. Practise functions and testing before adding complexity. For larger projects, use a local Python installation and an editor.</p><p><a href="https://docs.python.org/3/tutorial/" target="_blank" rel="noopener noreferrer">Python’s official tutorial</a> is a useful next reference once you know programming basics. <a href="https://www.python.org/about/gettingstarted/" target="_blank" rel="noopener noreferrer">Python’s getting-started guide</a> explains how to continue on your own device.</p></details>
    </div></section>
    <footer className="lab-footer"><p>Python Lab · Made for curious people, by Nisan Awa.</p><Link href="/">Back to portfolio</Link></footer>
    <input ref={backupInput} type="file" accept=".json,application/json" hidden aria-label="Import progress backup" onChange={event => { void importBackup(event.target.files?.[0]); event.target.value = ""; }} />
    <input ref={codeInput} type="file" accept=".py,text/x-python,text/plain" hidden aria-label="Open Python code file" onChange={event => { void importCode(event.target.files?.[0]); event.target.value = ""; }} />
    <input ref={dataInput} type="file" accept=".txt,.csv,.json,.py" hidden aria-label="Attach a data file" onChange={event => { void importData(event.target.files?.[0]); event.target.value = ""; }} />
    <iframe ref={runnerFrame} onLoad={runner.ping} src="/python-lab/runner.html" sandbox="allow-scripts" referrerPolicy="no-referrer" title="Isolated Python execution" className="python-runner-frame" tabIndex={-1} aria-hidden="true" />
  </div>;
}
