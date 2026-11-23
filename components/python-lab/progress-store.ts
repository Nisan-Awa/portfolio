"use client";

import { useSyncExternalStore } from "react";
import { freshProgress, parseProgress, STORAGE_KEY } from "@/lib/python-lab/progress";
import type { LabProgress } from "@/lib/python-lab/types";

type Snapshot = { progress: LabProgress; saving: "saved" | "pending" | "memory" };
const server: Snapshot = { progress: freshProgress(), saving: "saved" };
let snapshot: Snapshot | undefined;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();
function notify() { listeners.forEach(listener => listener()); }
function read(): Snapshot {
  if (!snapshot) {
    try {
      const text = localStorage.getItem(STORAGE_KEY);
      snapshot = { progress: text ? parseProgress(JSON.parse(text)) : freshProgress(), saving: "saved" };
    } catch { snapshot = { progress: freshProgress(), saving: "memory" }; }
  }
  return snapshot;
}
function flush() {
  if (!snapshot) return;
  clearTimeout(timer);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot.progress)); snapshot = { ...snapshot, saving: "saved" }; }
  catch { snapshot = { ...snapshot, saving: "memory" }; }
  notify();
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("pagehide", flush);
  return () => { listeners.delete(listener); window.removeEventListener("pagehide", flush); };
}
export function updateProgress(update: (progress: LabProgress) => LabProgress) {
  const previous = read();
  snapshot = { progress: update(previous.progress), saving: previous.saving === "memory" ? "memory" : "pending" };
  clearTimeout(timer);
  timer = setTimeout(flush, 450);
  notify();
}
export function useLabProgress() { return useSyncExternalStore(subscribe, read, () => server); }
