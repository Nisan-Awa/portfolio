import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Contact } from "@/components/sections/Contact";

export const metadata = {
  title: "Profile & Perspective | Nisan Awa",
  description: "Awa Nisan Tojah: Software Engineer, web and mobile app developer, Electrical & Electronics Engineer and educator. Background, contributions and lessons from collaboration.",
};

export default function ProfilePage() {
  return (
    <main id="main-content" className="pt-32">
      <Header />
      <article className="section-shell">
        <Link className="text-link inline-flex items-center gap-2 mb-10" href="/#about"><ArrowLeft size={16} />Back to portfolio</Link>
        <header className="profile-intro">
          <div><p className="eyebrow">Awa Nisan Tojah · Nisan Awa</p><h1 className="display-title">The person <br />behind <span className="text-primary">the work.</span></h1><p className="body-copy mt-7">I am a Software Engineer focused on web and mobile applications, an Electrical & Electronics Engineer, and an educator. I graduated from Afe Babalola University with Second Class Upper in 2026. I build mobile apps and websites, explore engineering problems through software, and help younger learners take their first steps in programming.</p><p className="body-copy mt-5">My interests are broad, but the thread is consistent: understand a problem, learn what is needed, and make something useful. I am continually looking for ways to deepen my skills and contribute to the people and communities around me.</p></div>
          <figure><div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden border border-border"><Image src="/hero-portrait.jpg" alt="Awa Nisan Tojah, original portfolio portrait" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover object-top" /></div><figcaption className="text-xs text-muted-foreground mt-3">A familiar face from the first version of this portfolio.</figcaption></figure>
        </header>
        <section className="editorial-section">
          <p className="eyebrow">What I bring</p><h2 className="display-title max-w-3xl">Practical work.<br />A wider responsibility.</h2>
          <div className="contribution-grid mt-9">
            <div><span className="contribution-number">01</span><h3>For companies & brands</h3><p>Mobile products and websites that make information easier to find and services easier to use. I bring Flutter development, experience working with clients and collaborators, and an engineering habit of examining how the pieces fit together.</p><Link className="text-link" href="/#client-work">See client work ↗</Link></div>
            <div><span className="contribution-number">02</span><h3>For teams & employers</h3><p>Experience across software delivery, power transmission, connectivity and broadcast engineering. I can contribute to development and technical support, document what I learn, and work with specialists across disciplines.</p><Link className="text-link" href="/#experience">Explore my experience ↗</Link></div>
            <div><span className="contribution-number">03</span><h3>For communities & countries</h3><p>I want to contribute to stronger digital skills, more efficient use of energy, and practical automation. My teaching, energy research and robotics capstone are starting points for that contribution. I am interested in teams and institutions turning these needs into sustained work.</p><Link className="text-link" href="/#mentoring">See teaching & mentorship ↗</Link></div>
          </div>
        </section>
        <section id="lessons" className="profile-lessons editorial-section">
          <div><div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden border border-border"><Image src="/assets/portraits/suit-4.webp" alt="Nisan Awa in a dark suit" fill sizes="(max-width: 768px) 100vw, 380px" className="object-cover object-top" /></div><p className="eyebrow mt-5">Perspective</p><h2 className="text-4xl font-black leading-tight">Some lessons came<br />from what ended early.</h2><p className="body-copy mt-5">Not every opportunity becomes a finished project. I want this portfolio to reflect those experiences too, and the changes they have made to how I communicate and commit my time.</p></div>
          <div className="space-y-8">
            <article className="reflection"><p className="eyebrow">Zayn Global Media · Masterclass facilitation</p><h3 className="text-2xl font-black mb-4">Communication needs as much care as the work.</h3><p className="body-copy">Courage Obafemi invited me to help facilitate a two-month video editing and visual storytelling masterclass for Zayn Global Media. My involvement included helping bring the programme to students, videographers, photographers and others interested in visual media.</p><p className="body-copy mt-4">A communication misunderstanding led us to part ways before the masterclass ended. I did not complete the engagement. The experience reinforced the importance of agreeing on responsibilities, expectations and communication early.</p><div className="flex flex-wrap gap-x-6 gap-y-3 mt-5"><a className="text-link" href="https://zaynglobalgroup.com/" target="_blank" rel="noopener noreferrer">Zayn Global Group ↗</a><a className="text-link" href="https://www.instagram.com/courageobafem/" target="_blank" rel="noopener noreferrer">Courage Obafemi ↗</a></div></article>
            <article className="reflection"><p className="eyebrow">BLISS STAR · Early-stage collaboration</p><h3 className="text-2xl font-black mb-4">A worthwhile idea still needs enough time.</h3><p className="body-copy">I was invited to contribute to BLISS STAR, Blessing Ucheaga’s social-media marketing brand. Blessing manages social accounts and helps brands strengthen their presence online.</p><p className="body-copy mt-4">We explored a broader concept, BLISS STAR MEDIA: connecting African businesses with creators and tracking the path from content to clicks, leads and sales. The proposed messages were “Create. Convert. Earn.” for creators and “Stop paying for content alone. Start paying for results.” for brands.</p><p className="body-copy mt-4">This remained an early-stage concept. I stepped back because my existing work commitments left too little time to give it the attention it needed. I respect Blessing’s marketing work, and the experience taught me to assess capacity before accepting a new responsibility.</p><div className="flex flex-wrap gap-x-6 gap-y-3 mt-5"><a className="text-link" href="https://www.instagram.com/blessingucheaga/" target="_blank" rel="noopener noreferrer">Blessing on Instagram ↗</a><a className="text-link" href="https://www.linkedin.com/in/ucheagablessing/" target="_blank" rel="noopener noreferrer">Blessing on LinkedIn ↗</a></div></article>
          </div>
        </section>
      </article>
      <Contact />
    </main>
  );
}
