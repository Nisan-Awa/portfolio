"use client";

import { useRef, type CSSProperties } from "react";
import { MAX_CODE_LENGTH } from "@/lib/python-lab/progress";

function highlight(code: string) {
  const pattern = /(#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:def|return|class|if|elif|else|for|while|in|import|from|as|with|try|except|finally|raise|assert|and|or|not|break|continue|pass|True|False|None)\b|\b\d+(?:\.\d+)?\b)/g;
  const parts = [];
  let start = 0;
  for (const match of code.matchAll(pattern)) {
    const position = match.index!;
    if (position > start) parts.push(code.slice(start, position));
    const token = match[0];
    const kind = token.startsWith("#") ? "comment" : /^["']/.test(token) ? "string" : /^\d/.test(token) ? "number" : "keyword";
    parts.push(<span className={"syntax-" + kind} key={position}>{token}</span>);
    start = position + token.length;
  }
  if (start < code.length) parts.push(code.slice(start));
  return parts;
}

export function CodeEditor({ code, onChange, fontSize, busy, onRun }: { code: string; onChange: (value: string) => void; fontSize: number; busy: boolean; onRun: () => void }) {
  const editor = useRef<HTMLTextAreaElement>(null);
  const colour = useRef<HTMLPreElement>(null);
  const gutter = useRef<HTMLPreElement>(null);

  function insert(text: string, caretOffset = text.length) {
    const element = editor.current;
    if (!element || busy) return;
    const start = element.selectionStart;
    const end = element.selectionEnd;
    const next = code.slice(0, start) + text + code.slice(end);
    if (next.length > MAX_CODE_LENGTH) return;
    onChange(next);
    requestAnimationFrame(() => { element.focus(); element.setSelectionRange(start + caretOffset, start + caretOffset); });
  }

  const pieces = [
    { label: 'print("")', value: 'print("")', caret: 7 },
    { label: 'input("")', value: 'input("")', caret: 7 },
    { label: "Indent", value: "    ", caret: 4 },
    { label: '" "', value: '""', caret: 1 },
    { label: "( )", value: "()", caret: 1 },
    { label: "[ ]", value: "[]", caret: 1 },
    { label: ":", value: ":", caret: 1 },
  ];

  return <>
    <div className="code-pieces" aria-label="Code pieces for touch and keyboard users">
      {pieces.map(piece => <button key={piece.label} type="button" onClick={() => insert(piece.value, piece.caret)} disabled={busy} aria-label={piece.label === "Indent" ? "Insert four spaces" : "Insert " + piece.label}>{piece.label}</button>)}
    </div>
    <div className="python-editor" style={{ "--code-size": `${fontSize}px` } as CSSProperties}>
      <pre className="code-gutter" aria-hidden="true" ref={gutter}>{Array.from({ length: code.split("\n").length }, (_, index) => index + 1).join("\n")}</pre>
      <div className="code-surface">
        <pre ref={colour} className="code-colours" aria-hidden="true">{highlight(code)}{"\n"}</pre>
        <label htmlFor="python-code" className="sr-only">Python code editor</label>
        <textarea ref={editor} id="python-code" value={code} onChange={event => onChange(event.target.value)} maxLength={MAX_CODE_LENGTH} spellCheck={false} autoCorrect="off" autoCapitalize="off" autoComplete="off" wrap="off" readOnly={busy} aria-describedby="editor-help" onScroll={event => {
          if (colour.current) { colour.current.scrollTop = event.currentTarget.scrollTop; colour.current.scrollLeft = event.currentTarget.scrollLeft; }
          if (gutter.current) gutter.current.scrollTop = event.currentTarget.scrollTop;
        }} onKeyDown={event => {
          if (event.nativeEvent.isComposing) return;
          if ((event.ctrlKey || event.metaKey) && event.key === "Enter") { event.preventDefault(); onRun(); }
          if (event.key === "Enter" && !event.ctrlKey && !event.metaKey && !busy) {
            event.preventDefault();
            const before = code.slice(0, event.currentTarget.selectionStart);
            const line = before.slice(before.lastIndexOf("\n") + 1);
            const indentation = line.match(/^\s*/)?.[0] ?? "";
            insert("\n" + indentation + (line.trimEnd().endsWith(":") ? "    " : ""));
          }
        }} />
      </div>
    </div>
    <p id="editor-help" className="lab-small editor-help">Enter keeps indentation. Tab moves to the next control. Use Indent for four spaces. Ctrl/⌘ + Enter runs code.</p>
  </>;
}
