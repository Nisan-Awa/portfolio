import Image from "next/image";
import { ArrowUpRight, BookOpen } from "lucide-react";

const students = [
  { name: "Henry Ndubisi", href: "https://henry-ndubisi.ai.studio/", image: "/assets/websites/henry-ndubisi.webp", description: "Henry was one of the young learners I tutored in Python and website building. His portfolio brings together his interests in HTML, CSS, Python and AI, giving him a place to share his work and keep improving it." },
  { name: "Lotanna Obigwe", href: "https://lotanna-portfolio.ai.studio/", image: "/assets/websites/lotanna-obigwe.webp", description: "I supported Lotanna as he explored Python and built his own website. His portfolio shares projects including a Python quiz, a multiplication-table generator and a countdown timer, showing how small exercises can become work a learner is proud to present." },
];

export function Mentoring() {
  return (
    <section id="mentoring" className="editorial-section">
      <div className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">Teaching & mentorship</p>
          <h2 className="display-title">Knowledge goes further<br /><span className="text-primary">when it is shared.</span></h2>
          <p className="body-copy max-w-3xl">Over two months, I tutored Henry Ndubisi and Lotanna Obigwe in Python and web development, helping both learners build their own websites. Here are the portfolios they created.</p>
        </div>
        <div className="school-note">
          <BookOpen size={28} className="text-primary shrink-0" aria-hidden="true" />
          <div><p className="eyebrow">September 2026–present · Part-time</p><h3 className="text-2xl font-black mb-3">ICT Facilitator, Karryfield International School</h3><p className="body-copy">I teach children Python and provide practical ICT assistance to the school. The role lets me connect technical knowledge with the patience, explanation and everyday support that learning requires.</p><a className="text-link inline-flex items-center gap-2 mt-4" href="https://www.kis.com.ng/" target="_blank" rel="noopener noreferrer">Visit Karryfield International School <ArrowUpRight size={16} /></a></div>
        </div>
        <div className="website-grid mt-8">
          {students.map((student) => (
            <article className="website-card" key={student.name}>
              <a href={student.href} target="_blank" rel="noopener noreferrer" className="relative block aspect-[1440/1000] overflow-hidden bg-secondary border-b border-border" aria-label={"Visit " + student.name + "’s portfolio"}>
                <Image src={student.image} unoptimized alt={student.name + "’s portfolio website"} fill sizes="(max-width: 768px) 100vw, 580px" className="object-cover object-top" />
              </a>
              <div className="website-copy"><p className="eyebrow">Student portfolio</p><h3 className="text-2xl font-black mb-3">{student.name}</h3><p className="body-copy">{student.description}</p><a className="text-link inline-flex items-center gap-2 mt-5" href={student.href} target="_blank" rel="noopener noreferrer">Explore {student.name.split(" ")[0]}’s portfolio <ArrowUpRight size={16} /></a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
