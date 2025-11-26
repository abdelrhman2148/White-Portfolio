import React, { useState, useEffect, useRef } from 'react';
import { EXPERIENCE, PROJECTS, SKILLS, METRICS, CERTIFICATIONS } from './constants';
import { Theme } from './types';
import ThemeSwitcher from './components/ThemeSwitcher';
import Metrics from './components/Metrics';
import InfrastructureDiagram from './components/InfrastructureDiagram';
import { 
  Terminal as TerminalIcon, 
  Server, 
  ShieldCheck, 
  GitMerge, 
  Cloud, 
  Cpu, 
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  CheckCircle2,
  Box,
  Layers,
  Code2,
  Hash,
  Activity
} from 'lucide-react';

// Hook for scroll reveal animation
const useOnScreen = (ref: any) => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIntersecting(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [ref]);
  return isIntersecting;
};

const Section: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);
  return (
    <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
      {children}
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState<Theme>('minimal'); // Default to minimal for white version
  
  // Typing effect phrases
  const phrases = ["Automating Infrastructure.", "Optimizing Pipelines.", "Delivering Value."];
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setCurrentText(isDeleting 
        ? fullText.substring(0, currentText.length - 1) 
        : fullText.substring(0, currentText.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopNum, typingSpeed, phrases]);

  const isTerminal = theme === 'terminal';
  const isAccent = theme === 'accent';
  
  // Base structural classes
  const containerClass = `min-h-screen transition-colors duration-500 ease-in-out font-sans selection:bg-opacity-30 
    ${isTerminal ? 'bg-terminal-black text-terminal-green font-mono terminal-theme selection:bg-green-500' : ''}
    ${isAccent ? 'bg-slate-50 text-slate-900 selection:bg-blue-500' : ''}
    ${theme === 'minimal' ? 'bg-white text-gray-900 selection:bg-gray-300' : ''}
  `;

  const sectionClass = `max-w-7xl mx-auto px-6 py-32 md:px-12 relative z-10`;
  const headingClass = `text-4xl md:text-5xl font-bold mb-16 tracking-tight flex items-center gap-4
    ${isTerminal ? 'uppercase border-l-4 border-green-500 pl-6 terminal-glow' : ''}
    ${isAccent ? 'text-accent-blue' : ''}
  `;
  
  const skillTagClass = `
    text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider transition-all hover:scale-105 cursor-default
    ${isTerminal ? 'border border-green-800 text-green-400 bg-green-900/10' : ''}
    ${isAccent ? 'bg-white border border-blue-100 text-blue-700 shadow-sm' : ''}
    ${theme === 'minimal' ? 'bg-gray-100 text-gray-700 border border-transparent' : ''}
  `;

  return (
    <div className={containerClass}>
      {isTerminal && <div className="scanlines"></div>}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0"></div>

      <ThemeSwitcher currentTheme={theme} setTheme={setTheme} />

      {/* HERO */}
      <header className={`${sectionClass} min-h-screen flex flex-col justify-center relative`}>
        <div className="z-10">
            <div className={`inline-flex items-center gap-2 mb-8 px-4 py-2 text-sm font-mono font-bold tracking-widest rounded-full
                ${isTerminal ? 'border border-green-500 bg-green-900/10 text-green-400' : 'bg-gray-900 text-white'}
                animate-fade-in
            `}>
                <div className={`w-2 h-2 rounded-full ${isTerminal ? 'bg-green-500 animate-pulse' : 'bg-white'}`}></div>
                SYSTEM_ONLINE :: ABDELRHMAN FIKRI
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1] min-h-[160px] md:min-h-[240px]">
                DevOps Engineer.<br/>
                <span className={isAccent ? 'text-blue-600' : isTerminal ? 'text-green-500 terminal-glow' : 'text-gray-400'}>
                  {currentText}
                  <span className="animate-blink">|</span>
                </span>
            </h1>
            
            <p className="text-xl md:text-2xl max-w-2xl opacity-80 leading-relaxed font-light mb-12 animate-fade-in delay-200">
                I build the engines that power production. Specializing in high-velocity CI/CD, bulletproof infrastructure, and automated security systems.
            </p>
            
            <div className="flex flex-wrap gap-6 animate-fade-in delay-300">
                <a href="#projects" className={`
                    px-8 py-4 font-bold text-sm tracking-widest uppercase transition-all transform hover:-translate-y-1
                    ${isTerminal ? 'bg-green-500 text-black hover:bg-green-400 hover:shadow-[0_0_20px_rgba(0,255,65,0.5)]' : ''}
                    ${isAccent ? 'bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30' : ''}
                    ${theme === 'minimal' ? 'bg-black text-white hover:bg-gray-800' : ''}
                `}>
                    Analyze Systems
                </a>
                <a href="#contact" className={`
                    px-8 py-4 font-bold text-sm tracking-widest uppercase transition-all flex items-center gap-2 transform hover:-translate-y-1
                    ${isTerminal ? 'border border-green-500 text-green-500 hover:bg-green-900/20' : ''}
                    ${isAccent ? 'bg-white text-blue-600 border border-blue-100 hover:border-blue-300 rounded-lg shadow-sm' : ''}
                    ${theme === 'minimal' ? 'border border-gray-200 hover:border-black' : ''}
                `}>
                    Initialize Handshake <ArrowRight size={16} />
                </a>
            </div>
        </div>
      </header>

      {/* METRICS DASHBOARD */}
      <section className={`${sectionClass} !py-12`}>
        <Section>
          <div className="flex items-center gap-4 mb-8 opacity-60 font-mono text-sm tracking-widest uppercase">
            <Activity size={16} /> Live System Telemetry
            <div className="h-px bg-current flex-grow opacity-30"></div>
          </div>
          <Metrics metrics={METRICS} theme={theme} />
        </Section>
      </section>

      {/* PROJECTS & DIAGRAMS */}
      <section id="projects" className={sectionClass}>
        <Section>
          <h2 className={headingClass}>
            <Hash className="opacity-50" /> System Architecture
          </h2>
        </Section>
        
        <div className="space-y-40">
            {PROJECTS.map((project, index) => (
                <Section key={project.id} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Project Info */}
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} flex flex-col justify-center`}>
                        <div className="mb-8">
                            <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded border
                                ${isAccent ? 'border-blue-200 text-blue-600 bg-blue-50' : 
                                  isTerminal ? 'border-green-800 text-green-500 bg-green-900/20' : 
                                  'border-gray-200 text-gray-500'}
                            `}>
                                <Layers size={12}/> CASE_STUDY_0{index + 1}
                            </div>
                            <h3 className="text-4xl font-bold mb-6 leading-tight">{project.title}</h3>
                        </div>
                        
                        <div className={`p-8 mb-8 relative overflow-hidden group transition-all duration-300
                            ${isTerminal ? 'bg-green-900/5 border border-green-900 hover:border-green-500' : 
                              isAccent ? 'bg-white shadow-lg border border-slate-100 rounded-2xl' : 
                              'bg-gray-50 border border-gray-200'}
                        `}>
                            {/* Decorative Corner */}
                            {isTerminal && <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-green-500"></div>}
                            
                            <div className="grid gap-6">
                              <div>
                                <div className="font-bold mb-2 flex items-center gap-2 text-xs uppercase tracking-wide opacity-50"><Server size={12}/> Problem</div>
                                <p className="opacity-90 leading-relaxed text-sm md:text-base">{project.problem}</p>
                              </div>
                              <div>
                                <div className="font-bold mb-2 flex items-center gap-2 text-xs uppercase tracking-wide opacity-50"><GitMerge size={12}/> Solution</div>
                                <p className="opacity-90 leading-relaxed text-sm md:text-base">{project.solution}</p>
                              </div>
                              <div className={`pt-4 border-t ${isTerminal ? 'border-green-900' : 'border-gray-200'}`}>
                                <div className="font-bold mb-2 flex items-center gap-2 text-xs uppercase tracking-wide opacity-50"><TerminalIcon size={12}/> Impact</div>
                                <p className={`font-medium ${isAccent ? 'text-blue-700' : isTerminal ? 'text-green-400' : 'text-black'}`}>{project.result}</p>
                              </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {project.tech.map(t => (
                                <span key={t} className={skillTagClass}>{t}</span>
                            ))}
                        </div>
                    </div>
                    
                    {/* Architecture Diagram */}
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                        <div className={`relative group transition-all duration-500 hover:scale-[1.02]
                           ${isTerminal ? 'hover:shadow-[0_0_30px_rgba(0,255,65,0.15)]' : ''} 
                        `}>
                            <InfrastructureDiagram theme={theme} projectId={project.id} />
                            
                            {/* Tech readout overlay */}
                            <div className={`absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm border-t flex justify-between items-center text-[10px] font-mono uppercase tracking-wider
                                ${isTerminal ? 'border-green-900 bg-black/60 text-green-500' : 
                                  isAccent ? 'border-blue-100 bg-white/80 text-blue-900' : 
                                  'border-gray-200 bg-white/80 text-gray-500'}
                            `}>
                                <span>SIMULATION_RUNNING</span>
                                <span className="flex items-center gap-2">
                                  LATENCY: 12ms <div className={`w-1.5 h-1.5 rounded-full ${isTerminal ? 'bg-green-500 animate-pulse' : 'bg-green-500'}`}></div>
                                </span>
                            </div>
                        </div>
                    </div>
                </Section>
            ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className={sectionClass}>
        <Section>
          <div className="flex items-center gap-4 mb-16 opacity-60 font-mono text-sm tracking-widest uppercase">
            <Cpu size={16} /> Operational History
            <div className="h-px bg-current flex-grow opacity-30"></div>
          </div>
          
          <div className="space-y-8 relative">
              {/* Timeline Line */}
              <div className={`absolute left-8 md:left-[8.5rem] top-4 bottom-4 w-px 
                  ${isTerminal ? 'bg-green-900' : 'bg-gray-200'}
              `}></div>

              {EXPERIENCE.map((exp) => (
                  <div key={exp.id} className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 group">
                      <div className="md:col-span-3 text-left md:text-right pt-1">
                          <h3 className="text-xl font-bold">{exp.company}</h3>
                          <div className={`font-mono text-xs mt-2 uppercase tracking-wide opacity-60`}>{exp.period}</div>
                      </div>
                      
                      {/* Timeline Dot */}
                      <div className="hidden md:flex md:col-span-1 justify-center pt-2">
                          <div className={`w-4 h-4 rounded-full border-4 transition-all duration-300
                              ${isTerminal ? 'border-black bg-green-500 group-hover:shadow-[0_0_10px_#00ff41]' : 
                                isAccent ? 'border-white bg-blue-500 shadow-md' : 
                                'border-white bg-gray-400'}
                          `}></div>
                      </div>

                      <div className={`md:col-span-8 p-6 md:p-8 rounded-lg transition-all duration-300
                          ${isTerminal ? 'bg-green-900/5 hover:bg-green-900/10 border border-transparent hover:border-green-800' : 
                            isAccent ? 'bg-white hover:shadow-xl border border-slate-100 rounded-xl' : 
                            'bg-gray-50 hover:bg-gray-100'}
                      `}>
                          <div className={`text-sm font-bold uppercase tracking-widest mb-4 ${isTerminal ? 'text-green-500' : 'text-blue-600'}`}>
                            {exp.role}
                          </div>
                          <p className="mb-6 opacity-80">{exp.summary}</p>
                          <ul className="space-y-3">
                              {exp.achievements.map((item, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm">
                                      <CheckCircle2 className={`mt-0.5 flex-shrink-0 w-4 h-4 ${isAccent ? 'text-blue-500' : isTerminal ? 'text-green-600' : 'text-gray-400'}`} />
                                      <span className="opacity-90 leading-relaxed">{item}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>
              ))}
          </div>
        </Section>
      </section>

      {/* SKILLS */}
      <section className={sectionClass}>
        <Section>
           <div className="flex items-center gap-4 mb-16 opacity-60 font-mono text-sm tracking-widest uppercase">
            <Code2 size={16} /> Capabilities & Stack
            <div className="h-px bg-current flex-grow opacity-30"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILLS.map((cat) => (
                  <div key={cat.category} className={`
                      p-6 transition-all duration-300
                      ${isTerminal ? 'border border-green-900 bg-black hover:border-green-500' : ''}
                      ${isAccent ? 'bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg border border-slate-100' : ''}
                      ${theme === 'minimal' ? 'border border-gray-200 hover:border-gray-400' : ''}
                  `}>
                      <h3 className="font-bold mb-6 flex items-center gap-3">
                          {cat.category.includes('Cloud') && <Cloud size={18} />}
                          {cat.category.includes('Container') && <Box size={18} />}
                          {cat.category.includes('IaC') && <Code2 size={18} />}
                          {cat.category.includes('CI/CD') && <GitMerge size={18} />}
                          {cat.category.includes('Monitoring') && <Cpu size={18} />}
                          {cat.category.includes('Security') && <ShieldCheck size={18} />}
                          {cat.category.includes('Programming') && <TerminalIcon size={18} />}
                          {cat.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                          {cat.skills.map(skill => (
                              <span key={skill} className={skillTagClass}>{skill}</span>
                          ))}
                      </div>
                  </div>
              ))}
          </div>
        </Section>
      </section>

      {/* CERTIFICATIONS */}
      <section className={sectionClass}>
         <Section>
           <div className="flex items-center gap-4 mb-12 opacity-60 font-mono text-sm tracking-widest uppercase">
            <ShieldCheck size={16} /> Credentials
            <div className="h-px bg-current flex-grow opacity-30"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className={`
                      flex items-center gap-4 p-5 transition-all hover:-translate-y-1
                      ${isTerminal ? 'border border-green-900 bg-green-900/5' : ''}
                      ${isAccent ? 'bg-white border border-slate-100 shadow-sm hover:shadow-md rounded-xl' : ''}
                      ${theme === 'minimal' ? 'border border-gray-200 bg-gray-50' : ''}
                  `}>
                      <div className={`text-xl p-3 rounded-md ${isAccent ? 'bg-blue-50' : isTerminal ? 'bg-green-900/20 text-green-500' : 'bg-white border border-gray-200'}`}>
                          {cert.name.includes('AWS') ? '☁️' : cert.name.includes('Cisco') ? '🛡️' : '🎓'}
                      </div>
                      <div>
                          <div className="font-bold text-sm mb-1 leading-tight">{cert.name}</div>
                          <div className="text-xs opacity-60 font-mono">{cert.issuer}</div>
                      </div>
                  </div>
              ))}
          </div>
         </Section>
      </section>

      {/* FOOTER / CONTACT */}
      <footer id="contact" className={`
        relative text-center mt-20 py-32 overflow-hidden
        ${isTerminal ? 'bg-black border-t border-green-900' : 'bg-gray-50'}
      `}>
        {/* Background Grid for Footer */}
         <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className={`inline-block mb-8 p-3 rounded-full ${isTerminal ? 'bg-green-900/20 text-green-500' : 'bg-gray-200'}`}>
             <Mail size={24} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">System Ready for Scaling.</h2>
          <p className="max-w-xl mx-auto mb-12 opacity-60 text-lg">
              I am available for full-time roles and high-impact consulting projects. Let's architect your next breakthrough.
          </p>
          <div className="flex justify-center flex-wrap gap-6 mb-16">
              <a href="mailto:abdelrhmanfikri182017@gmail.com" className={`flex items-center gap-3 px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 ${isTerminal ? 'bg-green-600 text-black hover:bg-green-500' : 'bg-black text-white hover:bg-gray-800 shadow-xl'}`}>
                   Email Me
              </a>
              <a href="https://www.linkedin.com/in/abdelrhman-fikri" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 px-8 py-4 rounded-lg font-bold transition-all border transform hover:scale-105 ${isTerminal ? 'border-green-600 text-green-500 hover:bg-green-900/20' : 'bg-white border-gray-200 hover:border-gray-400'}`}>
                  <Linkedin size={20} /> LinkedIn
              </a>
               <a href="https://github.com/abdelrhman2148" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 px-8 py-4 rounded-lg font-bold transition-all border transform hover:scale-105 ${isTerminal ? 'border-green-600 text-green-500 hover:bg-green-900/20' : 'bg-white border-gray-200 hover:border-gray-400'}`}>
                  <Github size={20} /> GitHub
              </a>
          </div>
          <div className="opacity-40 text-xs font-mono flex flex-col gap-2 tracking-widest">
              <span>CAIRO, EGYPT • REMOTE CAPABLE</span>
              <span>SESSION_ID: {new Date().getTime().toString(16).toUpperCase()}</span>
              <span>&copy; 2024 ABDELRHMAN FIKRI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;