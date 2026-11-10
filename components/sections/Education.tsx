import Image from "next/image";
import { ArrowUpRight, GraduationCap } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="editorial-section">
      <div className="section-shell">
        <div className="education-layout">
          <div className="graduation-visual">
            <div className="relative aspect-[2/3] overflow-hidden rounded-[1.5rem] border border-border">
              <Image src="/assets/portraits/graduate-2.webp" alt="Awa Nisan Tojah in graduation attire at the completion of his engineering degree" fill sizes="(max-width: 768px) 100vw, 460px" className="object-cover" />
            </div>
            <div className="graduation-thumbs">
              {[3, 4].map((n) => (
                <a key={n} href={"/assets/portraits/graduate-" + n + ".webp"} target="_blank" rel="noopener noreferrer" className="relative block aspect-[4/5] rounded-xl overflow-hidden border border-border" aria-label={"Open graduation portrait " + n}>
                  <Image src={"/assets/portraits/graduate-" + n + ".webp"} alt={n === 3 ? "Black and white graduation portrait" : "Graduation portrait with degree scroll"} fill sizes="140px" className="object-cover object-top" />
                </a>
              ))}
              <p className="text-xs leading-relaxed text-muted-foreground self-center">A chapter completed.<br />More work ahead.</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">Education · Afe Babalola University</p>
            <GraduationCap className="text-primary mb-5" size={32} aria-hidden="true" />
            <h2 className="display-title">An engineer.<br /><span className="text-primary">Still a learner.</span></h2>
            <p className="text-xl font-bold mt-6 mb-3">Bachelor of Engineering<br />Electrical & Electronics Engineering</p>
            <span className="inline-block rounded-full bg-primary/15 text-primary font-bold text-sm px-4 py-2 mb-6">Second Class (Hons.) Upper Division</span>
            <dl className="degree-facts">
              <div><dt>University</dt><dd>Afe Babalola University, Ado-Ekiti</dd></div>
              <div><dt>Graduated</dt><dd><time dateTime="2026-10-21">21 October 2026</time></dd></div>
              <div><dt>Degree certificate dated</dt><dd><time dateTime="2026-07-29">29 July 2026</time></dd></div>
            </dl>
            <p className="body-copy mt-6">Completing my degree gives a formal foundation to the work I have been doing across software, power, networks and automation. I want to keep applying that knowledge to useful products and practical problems, while learning from people who know more than I do.</p>
            <a href="/assets/certificates/engineering-degree.webp" target="_blank" rel="noopener noreferrer" className="degree-certificate">
              <div className="relative w-24 aspect-[4/5] shrink-0"><Image src="/assets/certificates/engineering-degree.webp" alt="B.Eng. degree certificate for Awa Nisan Tojah, Second Class Upper" fill sizes="96px" className="object-contain" /></div>
              <div><p className="font-bold mb-1">View my degree certificate</p><p className="text-sm text-muted-foreground">Open the full certificate image</p></div>
              <ArrowUpRight size={20} className="text-primary shrink-0 ml-auto" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
