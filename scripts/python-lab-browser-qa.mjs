// No npm browser dependency. Set CHROME_PATH, LAB_BASE_URL and PYTHON_LAB_QA_DIR as needed.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = process.env.PYTHON_LAB_QA_DIR || path.join(root, '.python-lab-qa');
const base = process.env.LAB_BASE_URL || process.argv.find(arg => arg.startsWith('--url='))?.slice(6) || 'http://127.0.0.1:3037';
const smoke = process.argv.includes('--smoke');
const edges = process.argv.includes('--edges');
const blocked = process.argv.includes('--network-blocked');
const alternatives = process.argv.includes('--alternatives');
const visuals = process.argv.includes('--visuals');
const chrome = process.env.CHROME_PATH || (process.platform === 'win32' ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' : process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : '/usr/bin/google-chrome');
fs.mkdirSync(out, { recursive: true });
const downloads = fs.mkdtempSync(path.join(out, 'downloads-'));
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'python-lab-browser-'));
const report = { started: new Date().toISOString(), base, tests: [], screenshots: [], errors: [], resources: [] };
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
async function downloaded(file) {
  const started = Date.now();
  while (!fs.existsSync(file) && Date.now() - started < 10000) await pause(100);
  return fs.readFileSync(file, 'utf8');
}
const browser = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', '--remote-allow-origins=*', '--user-data-dir=' + profile, ...(blocked ? ['--host-resolver-rules=MAP cdn.jsdelivr.net ~NOTFOUND'] : []), 'about:blank'], { windowsHide: true, stdio: 'ignore' });
let socket;
let failure;
function pass(name, detail) { report.tests.push({ name, passed: true, detail }); console.log('PASS', name); }
try {
  browser.on('error', error => { failure = error; });
  let port;
  for (let i = 0; i < 80; i++) {
    if (failure) throw failure;
    try { port = Number(fs.readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0]); break; }
    catch { await pause(200); }
  }
  if (!port) throw new Error('Chrome did not start. Set CHROME_PATH to an installed Chromium browser.');
  const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  socket = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let serial = 0;
  const pending = new Map();
  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.method === 'Runtime.exceptionThrown') report.errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') report.errors.push(message.params.entry.text);
    if (message.method === 'Network.responseReceived' && message.params.response.url.includes('cdn.jsdelivr.net')) report.resources.push({ url: message.params.response.url, status: message.params.response.status, fromDiskCache: message.params.response.fromDiskCache });
    if (message.id && pending.has(message.id)) {
      const callback = pending.get(message.id); pending.delete(message.id);
      if (message.error) callback.reject(new Error(JSON.stringify(message.error))); else callback.resolve(message.result);
    }
  };
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++serial;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); reject(new Error('CDP timeout: ' + method)); } }, 85000).unref();
  });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true, userGesture: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result?.value;
  };
  const waitFor = async (expression, timeout = 30000) => {
    const started = Date.now();
    while (Date.now() - started < timeout) { if (await evaluate(expression)) return; await pause(150); }
    throw new Error('Timed out waiting for ' + expression);
  };
  const viewport = (width, height = 1000) => send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 760 });
  const shot = async (name, expression = 'window.scrollTo(0, 0)') => {
    await evaluate(expression); await pause(350);
    const capture = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    fs.writeFileSync(path.join(out, name + '.png'), Buffer.from(capture.data, 'base64'));
    report.screenshots.push(name + '.png');
  };
  const setValue = async (selector, value) => {
    await evaluate(`(() => { const element = document.querySelector(${JSON.stringify(selector)}); const owner = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : element instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(owner, 'value').set.call(element, ${JSON.stringify(value)}); element.dispatchEvent(new Event('input', {bubbles:true})); element.dispatchEvent(new Event('change', {bubbles:true})); })()`);
    await pause(100);
  };
  const clickText = text => evaluate(`(() => { const button = [...document.querySelectorAll('button')].find(button => button.getClientRects().length && button.textContent.trim() === ${JSON.stringify(text)}); if (!button) throw new Error('Missing visible button: ' + ${JSON.stringify(text)}); button.click(); })()`);
  const upload = async (selector, file) => { const dom = await send('DOM.getDocument'); const node = await send('DOM.querySelector', { nodeId: dom.root.nodeId, selector }); await send('DOM.setFileInputFiles', { nodeId: node.nodeId, files: [file] }); await pause(400); };
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable'); await send('Network.enable');
  await send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloads });
  await viewport(1440, 1100);
  await send('Page.navigate', { url: base + '/learn/python' });
  await waitFor('!!document.querySelector("#python-code")');
  await pause(600);
  assert.equal(await evaluate('document.title.includes("Python Lab")'), true);
  assert.equal(await evaluate('document.querySelector("link[rel=canonical]").href'), 'https://www.nisanawa.tech/learn/python');
  pass('Page loads with nisanawa.tech canonical');
  assert.equal(await evaluate('document.querySelector("iframe").getAttribute("sandbox")'), 'allow-scripts');
  assert.equal(await evaluate('(() => {try {return document.querySelector("iframe").contentWindow.localStorage.length === -1;} catch {return true;}})()'), true);
  pass('Runner has an opaque origin, separated from portfolio storage');
  if (visuals) {
    assert.equal(await evaluate('document.documentElement.dataset.scrollBehavior'), 'smooth'); pass('Framework navigation receives the declared scroll behaviour');
    await shot('python-lab-desktop');
    await shot('python-lab-workspace', 'document.querySelector("#workspace").scrollIntoView({behavior:"instant"})');
    for (const [width, height] of [[1280, 900], [768, 1024], [390, 844], [320, 680]]) {
      await viewport(width, height); await pause(100);
      assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true); pass('Final typography fits viewport: ' + width);
    }
    await viewport(390, 844); await evaluate('document.querySelector("#tab-code").click()');
    await shot('python-lab-mobile-code', 'document.querySelector("#workspace").scrollIntoView({behavior:"instant"})');
    await evaluate('document.querySelector("#tab-output").click()');
    await shot('python-lab-mobile-output', 'document.querySelector("#workspace").scrollIntoView({behavior:"instant"})');
    await setValue('#learning-style', 'little'); await shot('python-lab-mobile', 'window.scrollTo(0,0)');
    await viewport(1440, 1100); await setValue('#learning-style', 'everyday');
    await evaluate(`document.querySelector('[aria-label="Toggle light and dark theme"]').click()`); await shot('python-lab-light');
    await clickText('Open playground'); await pause(150);
    await shot('python-lab-playground', 'document.querySelector("#workspace").scrollIntoView({behavior:"instant"})');
  } else if (alternatives) {
    await send('Page.navigate', { url: base + '/learn/python?lesson=named-values' }); await waitFor('!!document.querySelector("#python-code")');
    await evaluate('document.querySelectorAll(".prediction input")[1].click()');
    for (const [name, source, expected] of [
      ['A valid f-string solution is accepted', 'score = 25\nprint(f"{score}")\n', true],
      ['A valid expression using the variable is accepted', 'score = 25\nprint(score + 0)\n', true],
      ['A hard-coded answer does not replace the variable practice', 'score = 25\nprint(25)\n', false],
    ]) {
      await setValue('#python-code', source); await clickText('Check my task'); await pause(100);
      await waitFor('!!document.querySelector(".check-feedback") && !document.querySelector(".runtime-working")', 72000);
      assert.equal(await evaluate('!!document.querySelector(".check-feedback.passed")'), expected); pass(name);
    }
  } else if (blocked) {
    await clickText('Run code'); await pause(100);
    await waitFor('!!document.querySelector(".python-error")', 72000);
    assert.equal(await evaluate('document.querySelector(".python-error strong").textContent'), 'LoadError');
    assert.equal(await evaluate('document.querySelector(".python-error").textContent.includes("connection")'), true);
    assert.equal(await evaluate('document.querySelector(".run-button").disabled'), false);
    pass('Blocked CDN produces a helpful, retryable loading error');
    assert.equal(await evaluate('!!document.querySelector("#python-code") && document.querySelector("#python-code").value.includes("Hello")'), true);
    pass('Lessons and draft remain available when the runtime cannot download');
  } else if (edges) {
    await viewport(390, 844);
    await evaluate('document.querySelector("#tab-code").click()');
    await evaluate('document.querySelector("#python-code").focus()');
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab' });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab' });
    assert.equal(await evaluate('document.activeElement.id !== "python-code"'), true); pass('Tab leaves the code editor without trapping focus');
    await setValue('#python-code', 'if True:');
    await evaluate('const editor = document.querySelector("#python-code"); editor.focus(); editor.setSelectionRange(editor.value.length, editor.value.length)');
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter' });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter' }); await pause(100);
    assert.equal(await evaluate('document.querySelector("#python-code").value'), 'if True:\n    '); pass('Enter keeps indentation and starts a Python block');
    await setValue('#python-code', '');
    await evaluate('document.querySelector("#python-code").setSelectionRange(0, 0)');
    await evaluate(`document.querySelector('[aria-label="Insert ( )"]').click()`); await pause(100);
    assert.equal(await evaluate('document.querySelector("#python-code").value'), '()');
    assert.equal(await evaluate('document.querySelector("#python-code").selectionStart'), 1); pass('Touch code pieces insert at the caret');
    await evaluate('document.querySelector("#tab-code").focus()');
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight' });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowRight', code: 'ArrowRight' }); await pause(100);
    assert.equal(await evaluate('document.activeElement.id'), 'tab-output'); pass('Workspace tabs support arrow-key navigation');
    await evaluate('document.querySelector("#tab-code").click()');
    for (let i = 0; i < 4; i++) { await evaluate(`document.querySelector('[aria-label="Increase reading and code text size"]').click()`); await pause(60); }
    await viewport(320, 680);
    assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true);
    assert.equal(await evaluate('getComputedStyle(document.querySelector("#python-code")).fontSize'), '24px'); pass('Large text remains usable at 320 pixels');
    const accessibility = await send('Accessibility.getFullAXTree');
    assert.ok(accessibility.nodes.some(node => node.name?.value === 'Python code editor')); pass('Editor has an accessible name');
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'forced-colors', value: 'active' }] });
    assert.notEqual(await evaluate('getComputedStyle(document.querySelector("#python-code")).webkitTextFillColor'), 'rgba(0, 0, 0, 0)'); pass('Forced-colour mode exposes readable editor text');
    await send('Emulation.setEmulatedMedia', { features: [] });
    await viewport(1440, 1100);
    await send('Page.navigate', { url: base + '/learn/python?lesson=unknown&mode=unknown' }); await waitFor('!!document.querySelector("#python-code")');
    assert.equal(await evaluate('document.querySelector(".workspace-heading h2").textContent'), 'Say hello'); pass('Unknown URL choices fall back safely');
    await setValue('#python-code', 'print("Lesson draft")');
    await clickText('Playground'); await pause(150); await setValue('#python-code', 'print("Playground draft")');
    await clickText('Learn step by step'); await pause(150);
    assert.equal(await evaluate('document.querySelector("#python-code").value'), 'print("Lesson draft")');
    await clickText('Playground'); await pause(150);
    assert.equal(await evaluate('document.querySelector("#python-code").value'), 'print("Playground draft")'); pass('Lesson and playground drafts stay separate');
    const codeFixture = path.join(out, 'fixture-code.py'); fs.writeFileSync(codeFixture, 'print("Imported code works")\n');
    await upload('input[aria-label="Open Python code file"]', codeFixture);
    assert.equal(await evaluate('document.querySelector("#python-code").value'), 'print("Imported code works")\n'); pass('Opening a .py file loads editable code');
    const csvFixture = path.join(out, 'fixture-values.csv'); fs.writeFileSync(csvFixture, 'value\n1\n2\n');
    await upload('input[aria-label="Attach a data file"]', csvFixture);
    await setValue('#python-code', 'import csv\nwith open("fixture-values.csv") as file:\n    print(sum(int(row["value"]) for row in csv.DictReader(file)))\n');
    await clickText('Run code'); await pause(100); await waitFor('!!document.querySelector(".terminal-output") && !document.querySelector(".runtime-working")', 72000);
    assert.equal(await evaluate('document.querySelector(".terminal-output").textContent.trim()'), '3'); pass('Playground data-file upload reaches real Python execution');
    await clickText('Download .py'); await pause(400);
    assert.ok((await downloaded(path.join(downloads, 'my_python_program.py'))).includes('csv.DictReader')); pass('Code download preserves the program');
    await setValue('#python-code', 'import sys\nprint(sum(int(value) for value in sys.stdin.read().split()))\n');
    await setValue('#program-input', '4\n6\n'); await clickText('Run code'); await pause(100);
    await waitFor('!!document.querySelector(".terminal-output") && !document.querySelector(".runtime-working")', 72000);
    assert.equal(await evaluate('document.querySelector(".terminal-output").textContent.trim()'), '10'); pass('Standard input also supports sys.stdin.read()');
    await setValue('#python-code', 'import sys\nprint(sys.stdin.buffer.read().decode("utf-8").strip())\n');
    await setValue('#program-input', 'Python\n'); await clickText('Run code'); await pause(100);
    await waitFor('!!document.querySelector(".terminal-output") && !document.querySelector(".runtime-working")', 72000);
    assert.equal(await evaluate('document.querySelector(".terminal-output").textContent.trim()'), 'Python'); pass('Binary standard input is available to compatible scripts');
    const helperFixture = path.join(out, 'helper.py'); fs.writeFileSync(helperFixture, 'value = input()\n');
    await upload('input[aria-label="Attach a data file"]', helperFixture);
    await setValue('#python-code', 'import helper\nprint(helper.value.upper())\n');
    await setValue('#program-input', 'ready\n'); await clickText('Run code'); await pause(100);
    await waitFor('!!document.querySelector(".terminal-output") && !document.querySelector(".runtime-working")', 72000);
    assert.equal(await evaluate('document.querySelector(".terminal-output").textContent.trim()'), 'READY'); pass('Attached Python modules share standard input');
    const denied = await send('Page.addScriptToEvaluateOnNewDocument', { source: `Storage.prototype.getItem = function(){throw new DOMException('Storage disabled','SecurityError')}; Storage.prototype.setItem = function(){throw new DOMException('Storage disabled','SecurityError')};` });
    await send('Page.navigate', { url: base + '/learn/python?mode=play' }); await waitFor('!!document.querySelector("#python-code")'); await pause(300);
    assert.equal(await evaluate('document.querySelector(".save-state").textContent.includes("Session only")'), true); pass('Unavailable browser storage has an explicit session-only state');
    await setValue('#python-code', 'print("Storage is optional")\n');
    await clickText('Run code'); await pause(100); await waitFor('!!document.querySelector(".terminal-output") && !document.querySelector(".runtime-working")', 72000);
    assert.equal(await evaluate('document.querySelector(".terminal-output").textContent.trim()'), 'Storage is optional'); pass('Code still runs when storage is unavailable');
    await clickText('Export progress'); await pause(400);
    assert.equal(JSON.parse(await downloaded(path.join(downloads, 'python-lab-progress.json'))).drafts.playground, 'print("Storage is optional")\n'); pass('Session-only work can still be exported');
    await send('Page.removeScriptToEvaluateOnNewDocument', { identifier: denied.identifier });
  } else {
  await shot('python-lab-desktop');
  const firstRun = Date.now();
  await clickText('Run code');
  await pause(150);
  await waitFor('!!document.querySelector(".terminal-output") && !document.querySelector(".runtime-working")', 72000);
  const firstOutput = await evaluate('document.querySelector(".terminal-output").textContent');
  const firstError = await evaluate('document.querySelector(".python-error")?.innerText');
  if (firstError) {
    report.frames = await send('Page.getFrameTree');
    const allTargets = await send('Target.getTargets');
    report.frameDiagnostics = [];
    for (const target of allTargets.targetInfos.filter(item => item.type === 'iframe')) {
      const attachment = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
      await send('Log.enable', {}, attachment.sessionId);
      const diagnostic = await send('Runtime.evaluate', { expression: '({url:location.href,html:document.documentElement.outerHTML.slice(0,1600),hasWorker:typeof self.pythonWorkerMain,ready:document.readyState})', returnByValue:true }, attachment.sessionId);
      report.frameDiagnostics.push(diagnostic);
    }
    await pause(300);
  }
  assert.equal(firstOutput.trim(), 'Hello, Python!', firstError || firstOutput);
  pass('First real browser Python execution', { milliseconds: Date.now() - firstRun });
  await shot('python-lab-workspace', 'document.querySelector("#workspace").scrollIntoView({behavior:"instant"})');
  await setValue('#python-code', 'print(sum(number * number for number in range(1, 6)))\n');
  await clickText('Run code'); await pause(100);
  await waitFor('!!document.querySelector(".terminal-output") && !document.querySelector(".runtime-working")', 72000);
  assert.equal(await evaluate('document.querySelector(".terminal-output").textContent.trim()'), '55');
  pass('UI runs learner-written code beyond lesson examples');
  await pause(550);
  await send('Page.reload'); await waitFor('!!document.querySelector("#python-code")'); await pause(600);
  assert.equal(await evaluate('document.querySelector("#python-code").value'), 'print(sum(number * number for number in range(1, 6)))\n');
  pass('Draft survives reload');
  await clickText('Reset code'); await pause(100); await clickText('Undo code replacement');
  assert.equal(await evaluate('document.querySelector("#python-code").value'), 'print(sum(number * number for number in range(1, 6)))\n');
  pass('Replacing code is reversible');
  await clickText('Check my task'); await pause(100);
  assert.equal(await evaluate('document.querySelector(".lab-notice")?.textContent.includes("Make a prediction")'), true);
  pass('Activity completion asks for understanding before checking code');
  await evaluate('document.querySelector(".prediction input").click()');
  await setValue('#python-code', 'print("I can learn Python!")\n');
  await clickText('Check my task'); await pause(100);
  await waitFor('!!document.querySelector(".check-feedback.passed")', 72000);
  await pause(550);
  assert.equal(await evaluate('JSON.parse(localStorage.getItem("nisan-python-lab-v1")).completed.includes("hello-python")'), true);
  pass('Successful UI check records completed learning');

  // Exercise the actual isolated bridge without exposing a test API in the application.
  await evaluate(`window.__labExecute = job => new Promise((resolve, reject) => { const frame = document.querySelector('.python-runner-frame'); const id = crypto.randomUUID(); const timeout = setTimeout(() => {window.removeEventListener('message', receive); reject(new Error('Runner did not respond'));}, 73000); function receive(event) {if (event.source === frame.contentWindow && event.data?.channel === 'nisan-python-lab-v1' && event.data.id === id && event.data.kind === 'result') {clearTimeout(timeout); window.removeEventListener('message', receive); resolve(event.data.result);}} window.addEventListener('message', receive); frame.contentWindow.postMessage({channel:'nisan-python-lab-v1',action:'execute',id,operation:'run',code:'',input:'',...job}, '*'); window.__lastLabJob = id; });`);
  const execute = job => evaluate(`window.__labExecute(${JSON.stringify(job)})`);
  let result = await execute({ code: 'import math, json\nprint(math.sqrt(49))\nprint(json.loads(\'{"value": 12}\')["value"])' });
  assert.equal(result.stdout.trim(), '7.0\n12'); pass('Custom programs can use supported standard-library modules');
  result = await execute({ code: 'a = int(input("First: "))\nb = int(input("Second: "))\nprint(a + b)', input: '9\n4\n' });
  assert.equal(result.stdout.trim(), '13'); assert.equal(result.inputs.length, 2); pass('Multiple input() calls and trailing newline');
  result = await execute({ code: 'print(repr(input()))', input: '\n' }); assert.equal(result.stdout.trim(), "''"); pass('Blank-line input');
  result = await execute({ code: 'input()' }); assert.equal(result.error?.name, 'EOFError'); pass('Missing input gives a recoverable error');
  result = await execute({ code: 'print("unfinished)' }); assert.equal(result.error?.name, 'SyntaxError'); assert.equal(result.error?.line, 1); pass('Syntax errors identify the learner code line');
  result = await execute({ code: 'print(1 / 0)' }); assert.equal(result.error?.name, 'ZeroDivisionError'); pass('Runtime errors are returned safely');
  result = await execute({ code: 'print("<img id=owned src=x onerror=alert(1)>")' }); assert.ok(result.stdout.includes('<img')); assert.equal(await evaluate('!!document.querySelector("#owned")'), false); pass('Program output stays text');
  await execute({ code: 'secret = 42' }); result = await execute({ code: 'print("secret" in globals())' }); assert.equal(result.stdout.trim(), 'False'); pass('Each run has a fresh namespace');
  result = await execute({ code: 'print("x" * 13000)' }); assert.equal(result.error?.name, 'OutputLimit'); assert.equal(result.stdout.length, 12000); pass('Excessive output is capped');
  result = await execute({ code: 'import csv, json\nwith open("scores.csv", encoding="utf-8") as file:\n    total = sum(int(row["score"]) for row in csv.DictReader(file))\nwith open("result.json", "w") as file:\n    json.dump({"total": total}, file)\nprint(total)', files: [{ name: 'scores.csv', text: 'name,score\nAda,8\nLee,12\n' }] });
  assert.equal(result.stdout.trim(), '20'); assert.equal(JSON.parse(result.files.find(file => file.name === 'result.json').text).total, 20); pass('Attached CSV data and generated JSON file');
  if (!smoke) {
    const lessons = JSON.parse(fs.readFileSync(path.join(root, 'lib/python-lab/lessons.json'), 'utf8'));
    for (const lesson of lessons) {
      result = await execute({ operation: 'check', code: lesson.solution, checks: lesson.checks, constructs: lesson.constructs });
      assert.equal(result.passed, true, `${lesson.id}: ${JSON.stringify(result)}`);
      pass('Browser activity check: ' + lesson.id);
    }
    result = await execute({ operation: 'check', code: 'print("12")', checks: [{ input: '6', output: '12' }, { input: '0', output: '0' }], constructs: [] });
    assert.equal(result.passed, false); pass('Multiple test inputs reject a hard-coded answer');
    result = await execute({ code: 'while True:\n    pass' }); assert.equal(result.error?.name, 'TimeLimit'); pass('Endless loop is terminated');
    result = await execute({ code: 'print("Recovered")' }); assert.equal(result.stdout.trim(), 'Recovered'); pass('Runner recovers after a terminated loop');
    const pending = execute({ code: 'while True:\n    pass' });
    await pause(1800);
    await evaluate(`document.querySelector('.python-runner-frame').contentWindow.postMessage({channel:'nisan-python-lab-v1',action:'stop',id:window.__lastLabJob}, '*')`);
    result = await pending; assert.equal(result.error?.name, 'Stopped'); pass('Stop control terminates a run');
  }

  for (const [width, height] of [[1280, 900], [768, 1024], [390, 844], [320, 680]]) {
    await viewport(width, height); await pause(150);
    assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true, 'Page overflow at ' + width);
    pass('Responsive page width: ' + width);
  }
  await viewport(390, 844);
  await evaluate('document.querySelector("#tab-code").click()');
  await shot('python-lab-mobile-code', 'document.querySelector("#workspace").scrollIntoView({behavior:"instant"})');
  await setValue('#python-code', 'print("Phone coding works!")\n'); await clickText('Run code'); await pause(100);
  await waitFor('!!document.querySelector(".terminal-output") && !document.querySelector(".runtime-working")', 72000);
  assert.equal(await evaluate('getComputedStyle(document.querySelector("#pane-output")).display !== "none"'), true);
  assert.equal(await evaluate('document.querySelector(".terminal-output").textContent.trim()'), 'Phone coding works!');
  pass('Phone Run opens the output view');
  await shot('python-lab-mobile-output', 'document.querySelector("#workspace").scrollIntoView({behavior:"instant"})');
  await setValue('#learning-style', 'little');
  assert.equal(await evaluate('!!document.querySelector(".young-explanation")'), true);
  pass('Little steps provides age-appropriate scaffolding');
  await shot('python-lab-mobile', 'window.scrollTo(0,0)');
  await viewport(1440, 1100); await setValue('#learning-style', 'everyday');
  await evaluate(`document.querySelector('[aria-label="Toggle light and dark theme"]').click()`);
  await shot('python-lab-light');
  await clickText('Open playground'); await pause(200);
  assert.equal(await evaluate('location.search.includes("mode=play")'), true); assert.equal(await evaluate('!!document.querySelector(".lab-outline")'), false);
  await shot('python-lab-playground', 'document.querySelector("#workspace").scrollIntoView({behavior:"instant"})');
  pass('Open playground is independent from lesson restrictions');

  const backupFile = path.join(out, 'fixture-progress.json');
  fs.writeFileSync(backupFile, JSON.stringify({version:1,completed:['hello-python','not-a-lesson'],drafts:{'in-order':'print("Backup draft")','__proto__':'bad'},inputs:{},predictions:{'in-order':2},lastLesson:'in-order',fontSize:999,style:'everyday'}));
  await upload('input[aria-label="Import progress backup"]', backupFile);
  await pause(600);
  const stored = await evaluate('JSON.parse(localStorage.getItem("nisan-python-lab-v1"))');
  assert.deepEqual(stored.completed, ['hello-python']); assert.equal(stored.fontSize, 24); assert.equal(stored.drafts['in-order'], 'print("Backup draft")');
  pass('Progress import validates IDs, limits and supported fields');
  const badFile = path.join(out, 'fixture-bad-progress.json'); fs.writeFileSync(badFile, '{"version":999}');
  await upload('input[aria-label="Import progress backup"]', badFile);
  assert.equal(await evaluate('document.querySelector(".lab-notice").innerText.includes("different format")'), true); pass('Invalid progress backup preserves existing work');
  await clickText('Export progress'); await pause(500);
  assert.equal(JSON.parse(await downloaded(path.join(downloads, 'python-lab-progress.json'))).version, 1); pass('Progress export creates a usable local file');
  await send('Page.navigate', { url: base + '/learn/python?lesson=arguments-and-returns' }); await waitFor('!!document.querySelector("#python-code")');
  assert.equal(await evaluate('document.querySelector(".workspace-heading h2").textContent'), 'Give a function an input and a result'); pass('Direct lesson links');
  await send('Page.navigate', { url: base + '/' }); await waitFor('!!document.querySelector("#mentoring")');
  assert.equal(await evaluate(`!!document.querySelector('.python-lab-invitation a[href="/learn/python"]')`), true); pass('Portfolio invitation links to the lab');
  for (const [width, height] of [[1440, 1000], [1024, 900], [390, 844]]) { await viewport(width, height); await pause(100); assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true, 'Portfolio overflow at ' + width); }
  pass('Portfolio remains responsive after navigation changes');
  await evaluate(`document.querySelector('[aria-label="Open navigation"]').click()`); await pause(250);
  assert.equal(await evaluate(`!!document.querySelector('#mobile-navigation a[href="/learn/python"]')`), true);
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' }); await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' }); await pause(300);
  assert.equal(await evaluate(`document.querySelector('[aria-controls="mobile-navigation"]').getAttribute('aria-expanded')`), 'false'); pass('Mobile navigation link and Escape dismissal');
  }
  report.finished = new Date().toISOString();
  assert.equal(report.errors.length, 0, report.errors.join('\n'));
  console.log('ALL CHECKS PASSED:', report.tests.length);
} catch (error) {
  report.failure = error.stack || String(error);
  console.error(report.failure);
  process.exitCode = 1;
} finally {
  fs.writeFileSync(path.join(out, visuals ? 'browser-visuals.json' : alternatives ? 'browser-alternatives.json' : blocked ? 'browser-network.json' : edges ? 'browser-edges.json' : smoke ? 'browser-smoke.json' : 'browser-qa.json'), JSON.stringify(report, null, 2));
  socket?.close(); browser.kill();
}
