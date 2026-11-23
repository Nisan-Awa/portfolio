import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import PythonLab from "@/components/python-lab/PythonLab";
import "./python-lab.css";

export const metadata: Metadata = {
  title: "Python Lab | Learn, write and run Python | Nisan Awa",
  description: "A free, welcoming Python learning space for children, teens and adults. Explore 40 short lessons or write and run your own Python 3 code in your browser. No account needed.",
  alternates: { canonical: "https://www.nisanawa.tech/learn/python" },
  openGraph: { title: "Python Lab by Nisan Awa", description: "Small steps. Real Python. Learn at your pace, or bring your own idea to the open playground.", url: "https://www.nisanawa.tech/learn/python", type: "website" },
  twitter: { card: "summary_large_image", title: "Python Lab by Nisan Awa", description: "40 short lessons and an open Python playground, for curious people of any age." },
};

export default function PythonLearningPage() {
  return <>
    <Header compact />
    <main id="main-content" className="python-lab-page">
      <Suspense fallback={<div className="lab-loading-page"><p>Python Lab by Nisan Awa</p><h1>Small steps. Real Python.</h1><p>Preparing your learning space…</p></div>}><PythonLab /></Suspense>
    </main>
  </>;
}
