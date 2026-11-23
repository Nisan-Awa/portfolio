/* The opaque-origin iframe owns workers. It has no access to portfolio storage. */
(() => {
  const channel = "nisan-python-lab-v1";
  let active = null;
  let parentOrigin = "*";
  const send = (id, kind, data = {}) => parent.postMessage({ channel, id, kind, ...data }, parentOrigin);
  const dispose = () => {
    if (!active) return;
    clearTimeout(active.timer);
    active.worker.terminate();
    URL.revokeObjectURL(active.url);
    active = null;
  };
  addEventListener("message", event => {
    if (event.source !== parent || event.data?.channel !== channel) return;
    parentOrigin = event.origin;
    const message = event.data;
    if (message.action === "ping") { send("", "bridge-ready"); return; }
    if (message.action === "stop") {
      if (active?.id === message.id) {
        dispose();
        send(message.id, "result", { result: { stdout: "", inputs: [], error: { name: "Stopped", message: "You stopped this run. Your code is still in the editor." } } });
      }
      return;
    }
    if (message.action !== "execute" || typeof message.id !== "string" || typeof message.code !== "string") return;
    if (message.code.length > 30000 || typeof message.input !== "string" || message.input.length > 10000) return;
    dispose();
    const id = message.id;
    try {
      const blob = new Blob(["(" + self.pythonWorkerMain.toString() + ")()"], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      // A classic blob entry keeps opaque-origin iframe support in Chromium.
      // The runtime itself is loaded as ESM with import(), never importScripts().
      const worker = new Worker(url, { name: "Python Lab" });
      const timeout = (milliseconds, name, description) => setTimeout(() => {
        if (active?.id !== id) return;
        dispose();
        send(id, "result", { result: { stdout: "", inputs: [], error: { name, message: description } } });
      }, milliseconds);
      active = { id, worker, url, timer: timeout(60000, "LoadError", "Python could not finish loading. Check your connection and try Run again.") };
      worker.onmessage = workerEvent => {
        if (active?.id !== id) return;
        const response = workerEvent.data;
        if (response.kind === "ready") {
          clearTimeout(active.timer);
          active.timer = timeout(8000, "TimeLimit", "This run reached the 8-second limit. Check for a loop that never ends, or try a smaller task.");
          send(id, "running");
        } else if (response.kind === "result" && response.result && typeof response.result.stdout === "string") {
          const result = response.result;
          dispose();
          send(id, "result", { result });
        }
      };
      worker.onerror = error => {
        if (active?.id !== id) return;
        dispose();
        send(id, "result", { result: { stdout: "", inputs: [], error: { name: "LoadError", message: "Python could not start. Check that this browser can reach cdn.jsdelivr.net, then try again.", detail: `${error.message || "Worker startup failed"} ${error.filename || ""}:${error.lineno || ""}` } } });
      };
      send(id, "loading");
      worker.postMessage(message);
    } catch {
      dispose();
      send(id, "result", { result: { stdout: "", inputs: [], error: { name: "LoadError", message: "This browser could not start a Python worker. Try an up-to-date browser." } } });
    }
  });
  send("", "bridge-ready");
})();
