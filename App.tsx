import { useState } from 'react';
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
  Phone
} from 'lucide-react';

const App = () => {
  const [theme, setTheme] = useState<Theme>('minimal');

  const isTerminal = theme === 'terminal';
  const isAccent = theme === 'accent';
  
  // Base structural classes
  const containerClass = `min-h-screen transition-colors duration-500 ease-in-out font-sans 
    ${isTerminal ? 'bg-terminal-black text-terminal-green font-mono' : ''}
    ${isAccent ? 'bg-slate-50 text-slate-900' : ''}
    ${theme === 'minimal' ? 'bg-white text-gray-900' : ''}
  `;

  const sectionClass = `max-w-7xl mx-auto px-6 py-24 md:px-12`;
  const headingClass = `text-4xl md:text-5xl font-bold mb-16 tracking-tight 
    ${isTerminal ? 'uppercase border-l-4 border-green-500 pl-4' : ''}
    ${isAccent ? 'text-accent-blue' : ''}
  `;
  const subHeadingClass = `text-xl font-semibold mb-6 flex items-center gap-3`;
  const cardClass = `
    transition-all duration-300
    ${isTerminal ? 'border border-green-900 p-6 hover:bg-green-900/10' : ''}
    ${isAccent ? 'bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100' : ''}
    ${theme === 'minimal' ? 'p-6 hover:bg-gray-50 border-t border-gray-100' : ''}
  `;
  
  const skillTagClass = `
    text-sm px-3 py-1 rounded-md font-medium
    ${isTerminal ? 'border border-green-800 text-green-400' : ''}
    ${isAccent ? 'bg-blue-50 text-blue-700' : ''}
    ${theme === 'minimal' ? 'bg-gray-100 text-gray-700' : ''}
  `;

  return (
    <div className={containerClass}>
      <ThemeSwitcher currentTheme={theme} setTheme={setTheme} />

      {/* HERO */}
      <header className={`${sectionClass} min-h-[85vh] flex flex-col justify-center relative`}>
        {isTerminal && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-0" />
        )}
        <div className="z-10">
            <div className={`inline-block mb-6 px-3 py-1 text-sm font-mono
                ${isTerminal ? 'border border-green-500' : 'bg-gray-900 text-white'}
            `}>
                ABDELRHMAN FIKRI
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
                Automating<br/>
                <span className={isAccent ? 'text-blue-600' : isTerminal ? 'text-green-700' : 'text-gray-400'}>Optimizing</span><br/>
                Delivering.
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl opacity-80 leading-relaxed font-light">
                DevOps Engineer specializing in scalable CI/CD pipelines, infrastructure automation, and DevSecOps integration.
            </p>
            
            <div className="mt-12 flex gap-6">
                <a href="#projects" className={`
                    px-8 py-4 font-bold text-sm tracking-widest uppercase transition-all
                    ${isTerminal ? 'bg-green-500 text-black hover:bg-green-400' : ''}
                    ${isAccent ? 'bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30' : ''}
                    ${theme === 'minimal' ? 'bg-black text-white hover:bg-gray-800' : ''}
                `}>
                    View Case Studies
                </a>
                <a href="#contact" className={`
                    px-8 py-4 font-bold text-sm tracking-widest uppercase transition-all flex items-center gap-2
                    ${isTerminal ? 'border border-green-500 text-green-500 hover:bg-green-900/20' : ''}
                    ${isAccent ? 'text-blue-600 hover:bg-blue-50 rounded-lg' : ''}
                    ${theme === 'minimal' ? 'border border-gray-200 hover:border-black' : ''}
                `}>
                    Contact Me <ArrowRight size={16} />
                </a>
            </div>
        </div>
      </header>

      {/* METRICS */}
      <section className={`${sectionClass} border-t ${isTerminal ? 'border-green-900' : 'border-gray-100'}`}>
        <h2 className={headingClass}>Impact Metrics</h2>
        <Metrics metrics={METRICS} theme={theme} />
      </section>

      {/* EXPERIENCE */}
      <section className={`${sectionClass} border-t ${isTerminal ? 'border-green-900' : 'border-gray-100'}`}>
        <h2 className={headingClass}>Experience</h2>
        <div className="space-y-16">
            {EXPERIENCE.map((exp) => (
                <div key={exp.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 group">
                    <div className="md:col-span-4">
                        <h3 className="text-2xl font-bold">{exp.company}</h3>
                        <div className={`text-lg mt-1 mb-4 font-medium ${isTerminal ? 'text-green-700' : 'text-gray-500'}`}>{exp.role}</div>
                        <div className="font-mono text-sm opacity-60">{exp.period}</div>
                    </div>
                    <div className="md:col-span-8">
                        <p className="text-lg mb-6 leading-relaxed font-light">{exp.summary}</p>
                        <ul className="space-y-3">
                            {exp.achievements.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className={`mt-1 flex-shrink-0 w-5 h-5 ${isAccent ? 'text-blue-500' : isTerminal ? 'text-green-600' : 'text-gray-400'}`} />
                                    <span className="opacity-90 leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* PROJECTS & DIAGRAMS */}
      <section id="projects" className={`${sectionClass} border-t ${isTerminal ? 'border-green-900' : 'border-gray-100'}`}>
        <h2 className={headingClass}>Engineering Case Studies</h2>
        
        <div className="space-y-32">
            {PROJECTS.map((project, index) => (
                <div key={project.id} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Project Info */}
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} flex flex-col justify-center h-full`}>
                        <div className="mb-8">
                            <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 ${isAccent ? 'text-blue-600' : isTerminal ? 'text-green-600' : 'text-gray-400'}`}>
                                <Layers size={14}/> Project 0{index + 1}
                            </div>
                            <h3 className="text-4xl font-bold mb-6 leading-tight">{project.title}</h3>
                        </div>
                        
                        <div className={`p-6 mb-8 ${isTerminal ? 'bg-green-900/10 border-l-2 border-green-500' : 'bg-gray-50 border-l-4 border-gray-200'} rounded-r-lg`}>
                            <div className="font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wide opacity-70"><Server size={14}/> The Challenge</div>
                            <p className="opacity-90 leading-relaxed">{project.problem}</p>
                        </div>
                        
                        <div className="mb-8 pl-4 border-l border-dashed border-gray-300 dark:border-gray-700">
                             <div className="font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wide opacity-70"><GitMerge size={14}/> The Solution</div>
                             <p className="opacity-90 leading-relaxed">{project.solution}</p>
                        </div>

                         <div className="mb-10 pl-4 border-l border-dashed border-gray-300 dark:border-gray-700">
                             <div className="font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wide opacity-70"><TerminalIcon size={14}/> The Result</div>
                             <p className={`font-medium ${isAccent ? 'text-blue-700' : isTerminal ? 'text-green-400' : 'text-black'}`}>{project.result}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {project.tech.map(t => (
                                <span key={t} className={skillTagClass}>{t}</span>
                            ))}
                        </div>
                    </div>
                    
                    {/* Architecture Diagram */}
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} sticky top-24`}>
                        <div className="relative group">
                             {/* Glow effect */}
                            <div className={`absolute -inset-2 opacity-50 blur-2xl transition-all duration-500
                                ${isAccent ? 'bg-blue-100 group-hover:bg-blue-200' : ''}
                                ${isTerminal ? 'bg-green-900/20' : ''}
                            `}></div>
                            <div className="relative">
                                <InfrastructureDiagram theme={theme} projectId={project.id} />
                                <div className={`flex justify-between items-center mt-4 px-2 font-mono text-xs ${isTerminal ? 'opacity-50' : 'opacity-40'}`}>
                                    <span>FIG {index + 1}.0 // ARCHITECTURE_SIMULATION</span>
                                    <span>STATUS: LIVE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className={`${sectionClass} border-t ${isTerminal ? 'border-green-900' : 'border-gray-100'}`}>
        <h2 className={headingClass}>Technical Proficiency</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SKILLS.map((cat) => (
                <div key={cat.category} className={cardClass}>
                    <h3 className={subHeadingClass}>
                        {cat.category.includes('Cloud') && <Cloud size={20} />}
                        {cat.category.includes('Container') && <Box size={20} />}
                        {cat.category.includes('IaC') && <Code2 size={20} />}
                        {cat.category.includes('CI/CD') && <GitMerge size={20} />}
                        {cat.category.includes('Monitoring') && <Cpu size={20} />}
                        {cat.category.includes('Security') && <ShieldCheck size={20} />}
                        {cat.category.includes('Programming') && <TerminalIcon size={20} />}
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
      </section>

      {/* CERTIFICATIONS */}
      <section className={`${sectionClass} border-t ${isTerminal ? 'border-green-900' : 'border-gray-100'}`}>
        <h2 className={headingClass}>Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className={`
                    flex items-center gap-4 p-6
                    ${isTerminal ? 'border border-green-800' : ''}
                    ${isAccent ? 'bg-white border border-slate-100 shadow-sm rounded-xl' : ''}
                    ${theme === 'minimal' ? 'border border-gray-200 bg-gray-50' : ''}
                `}>
                    <div className={`text-2xl p-3 rounded-full ${isAccent ? 'bg-blue-50' : isTerminal ? 'bg-green-900/20' : 'bg-white'}`}>
                        {cert.name.includes('AWS') ? '☁️' : cert.name.includes('Cisco') ? '🛡️' : '🎓'}
                    </div>
                    <div>
                        <div className="font-bold text-sm mb-1">{cert.name}</div>
                        <div className="text-xs opacity-60 font-mono">{cert.issuer} • {cert.year}</div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer id="contact" className={`
        ${sectionClass} text-center mt-12 py-32
        ${isTerminal ? 'bg-green-900/5' : 'bg-gray-50'}
      `}>
        <h2 className="text-4xl font-bold mb-8">Ready to Scale?</h2>
        <p className="max-w-xl mx-auto mb-12 opacity-60 text-lg">
            I am available for full-time roles and high-impact consulting projects. Let's build resilient infrastructure together.
        </p>
        <div className="flex justify-center flex-wrap gap-6 mb-16">
            <a href="mailto:abdelrhmanfikri182017@gmail.com" className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all ${isTerminal ? 'bg-green-900/20 text-green-500 hover:bg-green-900/40' : 'bg-white shadow-lg hover:shadow-xl hover:-translate-y-1'}`} title="abdelrhmanfikri182017@gmail.com">
                <Mail size={20} /> Email
            </a>
            <a href="tel:+201272790237" className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all ${isTerminal ? 'bg-green-900/20 text-green-500 hover:bg-green-900/40' : 'bg-white shadow-lg hover:shadow-xl hover:-translate-y-1'}`} title="+20 127 279 0237">
                <Phone size={20} /> +20 127 279 0237
            </a>
            <a href="https://www.linkedin.com/in/abdelrhman-fikri" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all ${isTerminal ? 'bg-green-900/20 text-green-500 hover:bg-green-900/40' : 'bg-white shadow-lg hover:shadow-xl hover:-translate-y-1'}`} title="LinkedIn">
                <Linkedin size={20} /> LinkedIn
            </a>
            <a href="https://github.com/abdelrhman2148" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all ${isTerminal ? 'bg-green-900/20 text-green-500 hover:bg-green-900/40' : 'bg-white shadow-lg hover:shadow-xl hover:-translate-y-1'}`} title="GitHub">
                <Github size={20} /> GitHub
            </a>
        </div>
        <div className="opacity-40 text-sm font-mono flex flex-col gap-2">
            <span>CAIRO, EGYPT • REMOTE READY</span>
            <span>&copy; 2024 ABDELRHMAN FIKRI</span>
        </div>
      </footer>
    </div>
  );
};

export default App;