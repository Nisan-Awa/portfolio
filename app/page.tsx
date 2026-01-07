"use client";

import React, { useState } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, ChevronDown, Code, Zap, Radio, Wifi, Smartphone, Menu, X } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-teal-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
              Awa Nisan Tojah
            </span>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
              {['About', 'Experience', 'Skills', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="hover:text-teal-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-b border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['About', 'Experience', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-2 text-slate-300 hover:text-teal-400"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-teal-400 uppercase bg-teal-400/10 rounded-full">
            Available for Hire
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Building the Future of <br />
            <span className="text-teal-400">Software</span> & <span className="text-blue-500">Power</span>.
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
            I am a 500-level Electrical & Electronics Engineering student and Flutter Developer. I bridge the gap between complex hardware systems and modern mobile applications.
          </p>
          <div className="flex space-x-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-teal-500/20"
            >
              Contact Me
            </button>
            <a 
              href="https://github.com/Nisan-Awa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 rounded-lg transition-all flex items-center gap-2"
            >
              <Github size={18} /> GitHub
            </a>
          </div>
        </div>
        
        {/* Abstract Tech Graphic Placeholder */}
        <div className="md:w-1/2 flex justify-center relative">
          <div className="relative w-72 h-72 md:w-96 md:h-96 bg-gradient-to-tr from-teal-500/20 to-blue-500/20 rounded-full blur-3xl absolute -z-10 animate-pulse"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl flex flex-col items-center justify-center aspect-square hover:-translate-y-2 transition-transform duration-300">
              <Smartphone className="w-10 h-10 text-teal-400 mb-3" />
              <span className="font-semibold text-slate-200">Mobile Apps</span>
            </div>
            <div className="p-6 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl flex flex-col items-center justify-center aspect-square mt-8 hover:-translate-y-2 transition-transform duration-300">
              <Zap className="w-10 h-10 text-yellow-400 mb-3" />
              <span className="font-semibold text-slate-200">Power Systems</span>
            </div>
            <div className="p-6 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl flex flex-col items-center justify-center aspect-square -mt-8 hover:-translate-y-2 transition-transform duration-300">
              <Wifi className="w-10 h-10 text-blue-400 mb-3" />
              <span className="font-semibold text-slate-200">Networks</span>
            </div>
            <div className="p-6 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl flex flex-col items-center justify-center aspect-square hover:-translate-y-2 transition-transform duration-300">
              <Radio className="w-10 h-10 text-purple-400 mb-3" />
              <span className="font-semibold text-slate-200">Broadcast</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-slate-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Professional Experience</h2>
          
          <div className="space-y-12">
            {/* Featuremind */}
            <div className="relative pl-8 md:pl-0">
              <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-slate-700 transform -translate-x-1/2"></div>
              
              <div className="md:flex items-center justify-between group">
                <div className="hidden md:block w-[45%] text-right pr-8">
                  <h3 className="text-xl font-bold text-slate-100">Mobile App Developer</h3>
                  <p className="text-teal-400">Featuremind Limited</p>
                  <p className="text-sm text-slate-400 mt-1">Feb 2025 - Aug 2025</p>
                </div>
                
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-teal-500 border-4 border-slate-900 transform -translate-x-[5px] md:-translate-x-1/2 mt-1.5 md:mt-0 z-10 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
                
                <div className="md:w-[45%] pl-8 md:pl-8">
                  <div className="md:hidden mb-2">
                    <h3 className="text-xl font-bold text-slate-100">Mobile App Developer</h3>
                    <p className="text-teal-400">Featuremind Limited</p>
                    <p className="text-sm text-slate-400">Feb 2025 - Aug 2025</p>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Designed and deployed "NisanApp" using Flutter. Focused on clean architecture, state management, and seamless UI/UX implementation. Collaborated with backend teams to integrate RESTful APIs.
                  </p>
                </div>
              </div>
            </div>

            {/* Winrock & TCN (Simultaneous) */}
            <div className="relative pl-8 md:pl-0">
              <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-slate-700 transform -translate-x-1/2"></div>
              
              <div className="md:flex items-center justify-between group">
                <div className="md:w-[45%] pr-8 text-right md:text-right hidden md:block">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    A unique dual-internship managing grid operations and network infrastructure simultaneously. Maintained high-voltage 330kV systems while deploying fiber optic solutions for ISPs.
                  </p>
                </div>

                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-900 transform -translate-x-[5px] md:-translate-x-1/2 mt-1.5 md:mt-0 z-10"></div>

                <div className="md:w-[45%] pl-8">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-slate-100">Engineering Intern (Dual Role)</h3>
                    <p className="text-blue-400">TCN & Winrock Nigeria Ltd</p>
                    <p className="text-sm text-slate-400">June 2024 - Aug 2024</p>
                  </div>
                  <div className="md:hidden">
                     <p className="text-slate-400 text-sm leading-relaxed">
                      Maintained high-voltage 330kV systems at TCN while simultaneously deploying fiber optic internet solutions and microwave links at Winrock.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FRCN */}
            <div className="relative pl-8 md:pl-0">
               <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-slate-700 transform -translate-x-1/2"></div>
              
              <div className="md:flex items-center justify-between group">
                <div className="hidden md:block w-[45%] text-right pr-8">
                  <h3 className="text-xl font-bold text-slate-100">Broadcast Engineering Intern</h3>
                  <p className="text-purple-400">Kapital FM 92.9 (FRCN)</p>
                  <p className="text-sm text-slate-400 mt-1">June 2023 - Aug 2023</p>
                </div>
                
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-purple-500 border-4 border-slate-900 transform -translate-x-[5px] md:-translate-x-1/2 mt-1.5 md:mt-0 z-10"></div>
                
                <div className="md:w-[45%] pl-8 md:pl-8">
                  <div className="md:hidden mb-2">
                    <h3 className="text-xl font-bold text-slate-100">Broadcast Engineering Intern</h3>
                    <p className="text-purple-400">Kapital FM 92.9 (FRCN)</p>
                    <p className="text-sm text-slate-400">June 2023 - Aug 2023</p>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Managed master control room operations, maintained UPS battery banks, and ensured signal fidelity for live RF transmissions on 92.9MHz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Technical Arsenal</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-teal-500 transition-colors">
            <div className="flex items-center mb-4">
              <Code className="text-teal-400 mr-3" />
              <h3 className="text-xl font-semibold">Software Development</h3>
            </div>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>• Flutter & Dart (Expert)</li>
              <li>• Python Scripting</li>
              <li>• Git & Version Control</li>
              <li>• REST API Integration</li>
              <li>• Mobile UI/UX Design</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
            <div className="flex items-center mb-4">
              <Wifi className="text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold">Network Infrastructure</h3>
            </div>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>• Fiber Optic Splicing</li>
              <li>• OTDR Fault Analysis</li>
              <li>• Microwave Radio Links</li>
              <li>• Router Config (VLAN/IP)</li>
              <li>• PRTG Network Monitor</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
            <div className="flex items-center mb-4">
              <Zap className="text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold">Electrical Systems</h3>
            </div>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>• High Voltage Grid Operations</li>
              <li>• Substation Maintenance</li>
              <li>• UPS & Inverter Systems</li>
              <li>• RF Transmission</li>
              <li>• Electronic Circuit Design</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
          <p className="text-slate-400 mb-12">
            I am currently open to opportunities in Mobile Development, Network Engineering, or Electrical Systems.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <a href="https://wa.me/2349124004256" target="_blank" rel="noopener noreferrer" className="group p-4 bg-slate-800 rounded-lg hover:bg-green-600/10 hover:border-green-500 border border-slate-700 transition-all cursor-pointer">
              <Phone className="mx-auto mb-2 text-green-500" />
              <span className="block text-sm font-medium text-slate-300 group-hover:text-green-400">WhatsApp</span>
            </a>

            <a href="mailto:nisanawa5@gmail.com" className="group p-4 bg-slate-800 rounded-lg hover:bg-red-600/10 hover:border-red-500 border border-slate-700 transition-all cursor-pointer">
              <Mail className="mx-auto mb-2 text-red-500" />
              <span className="block text-sm font-medium text-slate-300 group-hover:text-red-400">Email Me</span>
            </a>

            <a href="https://www.linkedin.com/in/nisan-awa-tojah" target="_blank" rel="noopener noreferrer" className="group p-4 bg-slate-800 rounded-lg hover:bg-blue-600/10 hover:border-blue-500 border border-slate-700 transition-all cursor-pointer">
              <Linkedin className="mx-auto mb-2 text-blue-500" />
              <span className="block text-sm font-medium text-slate-300 group-hover:text-blue-400">LinkedIn</span>
            </a>

            <a href="https://github.com/Nisan-Awa" target="_blank" rel="noopener noreferrer" className="group p-4 bg-slate-800 rounded-lg hover:bg-slate-600/10 hover:border-slate-500 border border-slate-700 transition-all cursor-pointer">
              <Github className="mx-auto mb-2 text-slate-300" />
              <span className="block text-sm font-medium text-slate-300 group-hover:text-white">GitHub</span>
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-800 text-slate-500 text-sm">
            © {new Date().getFullYear()} Awa Nisan Tojah. Built with Next.js & Tailwind CSS.
          </div>
        </div>
      </section>
    </div>
  );
}