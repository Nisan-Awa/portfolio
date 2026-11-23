"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type { DataFile, LessonCheck, RunResult } from "@/lib/python-lab/types";

const channel = "nisan-python-lab-v1";
type Request = { code: string; input: string; operation: "run" | "check"; files?: DataFile[]; checks?: LessonCheck[]; constructs?: string[] };
export type RunState = "idle" | "loading" | "running" | "finished";

export function usePythonRunner(frame: RefObject<HTMLIFrameElement | null>) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<RunState>("idle");
  const [result, setResult] = useState<RunResult | null>(null);
  const job = useRef<{ id: string; finish?: (result: RunResult) => void } | null>(null);
  const watchdog = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimer = () => { if (watchdog.current) clearTimeout(watchdog.current); watchdog.current = null; };

  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.source !== frame.current?.contentWindow || event.data?.channel !== channel) return;
      const message = event.data;
      if (message.kind === "bridge-ready") { setReady(true); return; }
      if (!job.current || message.id !== job.current.id) return;
      if (message.kind === "loading") setState("loading");
      if (message.kind === "running") setState("running");
      if (message.kind === "result" && message.result && typeof message.result.stdout === "string" && Array.isArray(message.result.inputs)) {
        clearTimer();
        const finish = job.current.finish;
        job.current = null;
        setResult(message.result);
        setState("finished");
        finish?.(message.result);
      }
    }
    window.addEventListener("message", receive);
    // A cached iframe can finish before React installs this listener.
    frame.current?.contentWindow?.postMessage({ channel, action: "ping" }, "*");
    return () => { window.removeEventListener("message", receive); clearTimer(); };
  }, [frame]);

  function ping() { frame.current?.contentWindow?.postMessage({ channel, action: "ping" }, "*"); }
  function stop() {
    if (job.current) frame.current?.contentWindow?.postMessage({ channel, action: "stop", id: job.current.id }, "*");
    clearTimer();
    job.current = null;
    setState("finished");
    setResult({ stdout: "", inputs: [], error: { name: "Stopped", message: "You stopped this run. Your code is still in the editor." } });
  }
  function clear() { if (!job.current) { setResult(null); setState("idle"); } }

  function run(request: Request, finish?: (result: RunResult) => void) {
    if (job.current) return;
    if (!ready || !frame.current?.contentWindow) {
      setResult({ stdout: "", inputs: [], error: { name: "LoadError", message: "The runner is getting ready. Try Run again in a moment, or reload this page if the problem continues." } });
      setState("finished");
      return;
    }
    const id = crypto.randomUUID();
    job.current = { id, finish };
    setResult(null);
    setState("loading");
    frame.current.contentWindow.postMessage({ channel, action: "execute", id, ...request }, "*");
    watchdog.current = setTimeout(() => {
      if (job.current?.id !== id) return;
      frame.current?.contentWindow?.postMessage({ channel, action: "stop", id }, "*");
      job.current = null;
      setResult({ stdout: "", inputs: [], error: { name: "LoadError", message: "The runner did not respond. Reload the page and try again. Your saved draft will remain on this browser." } });
      setState("finished");
    }, 72000);
  }
  return { ping, ready, run, stop, clear, state, result, busy: state === "loading" || state === "running" };
}
