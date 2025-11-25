import { Experience, Project, Metric, SkillCategory, Certification } from './types';

export const METRICS: Metric[] = [
  { name: 'MTTR', value: '-40%', change: 'Improved', positive: true, description: 'Mean Time to Recovery' },
  { name: 'Deploy Freq', value: '3x', change: 'Increase', positive: true, description: 'Deployment Velocity' },
  { name: 'Setup Time', value: '-70%', change: 'Reduced', positive: true, description: 'Manual Infrastructure Work' },
  { name: 'Uptime', value: '99.9%', change: 'Sustained', positive: true, description: 'Service Availability' },
  { name: 'Security', value: '-50%', change: 'incidents', positive: true, description: 'High-Severity Recurrence' },
];

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    role: 'DevOps Engineer',
    company: 'Genesis Creations S.A.E.',
    period: '04/2023 - Present',
    summary: 'Driving DevSecOps adoption and automating delivery for a software house.',
    achievements: [
      'Designed and deployed CI/CD pipelines with GitHub Actions and Jenkins, tripling deployment frequency.',
      'Automated infrastructure provisioning with Terraform and Ansible, reducing manual setup by 70%.',
      'Integrated container security scanning to support DevSecOps adoption.',
      'Standardized Docker workflows, significantly reducing environment drift.'
    ]
  },
  {
    id: '2',
    role: 'IT Specialist',
    company: 'Genesis Creations S.A.E.',
    period: '09/2023 - Present',
    summary: 'Managing enterprise security and system reliability.',
    achievements: [
      'Automated system patching and monitoring across 30+ nodes.',
      'Conducted incident analysis, cutting high-severity recurrence by 50%.',
      'Enhanced endpoint security and trained staff on cybersecurity hygiene.'
    ]
  },
  {
    id: '3',
    role: 'Software Engineering Intern',
    company: 'ALX Africa / Holberton School',
    period: '07/2023 - 02/2025',
    summary: 'Intensive specialization in backend systems and infrastructure.',
    achievements: [
      'Built Dockerized microservices deployed on AWS ECS.',
      'Implemented IaC for repeatable infrastructure deployments.',
      'Led post-mortem simulations and practiced incident command techniques.'
    ]
  },
  {
    id: '4',
    role: 'IT Manager',
    company: 'El-sorady Company',
    period: '02/2021 - 11/2022',
    summary: 'Oversaw critical network infrastructure and server operations.',
    achievements: [
      'Managed Windows servers and mail systems ensuring 99.9% uptime.',
      'Designed and maintained internal network infrastructure (cabling, switches, routers).',
      'Implemented secure access control and monitoring systems.'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Enterprise CI/CD Standardization',
    problem: 'Inconsistent manual deployment processes across 10+ distinct mobile and web applications.',
    solution: 'Implemented a centralized Jenkins-based automation ecosystem with standardized pipelines for iOS, Android, and Web builds.',
    result: 'Unified deployment strategy reducing failure rates and accelerating delivery cycles.',
    tech: ['Jenkins', 'Docker', 'Groovy', 'Git']
  },
  {
    id: 'p2',
    title: 'IoT Digital Twin Infrastructure',
    problem: 'Complex real-time synchronization required between physical assets and digital dashboards for large-scale smart facility projects.',
    solution: 'Architected a scalable API layer ensuring seamless integration between IoT sensors and the visualization dashboard.',
    result: 'Successful deployment of high-fidelity Digital Twin systems for data centers and location monitoring.',
    tech: ['IoT API', 'Cloud', 'Real-time Data', 'Monitoring']
  },
  {
    id: 'p3',
    title: 'Internal Operations KPI System',
    problem: 'Lack of visibility into company performance metrics and manual tracking inefficiencies.',
    solution: 'Built a bespoke internal tool to automate KPI tracking and company workflow reporting.',
    result: 'Streamlined internal operations and provided real-time data insights for leadership.',
    tech: ['Python', 'Automation', 'Internal Tools']
  },
  {
    id: 'p4',
    title: 'VR/AR Content Delivery Backend',
    problem: 'High-latency delivery of heavy assets for immersive VR training and simulation applications.',
    solution: 'Optimized backend infrastructure to support Unity/Unreal builds and secure API integrations.',
    result: 'Stable, high-performance backend supporting immersive VR learning and security simulation experiences.',
    tech: ['Unity Backend', 'AWS', 'API Optimization']
  },
  {
    id: 'p5',
    title: 'Service Health Monitoring Platform',
    problem: 'Fragmented monitoring tools led to delayed incident detection and lack of uptime visibility.',
    solution: 'Engineered a comprehensive monitoring solution with real-time status dashboards and alerting.',
    result: 'Drastically improved Mean Time to Detect (MTTD) and provided stakeholders with transparent service health data.',
    tech: ['Monitoring', 'React', 'Dashboarding', 'Alerting']
  },
  {
    id: 'p6',
    title: 'AI Data Entry Automation',
    problem: 'High-volume legacy data entry was creating significant operational bottlenecks and data consistency issues.',
    solution: 'Developed an intelligent AI-driven agent to automate data extraction and entry into the target management system.',
    result: 'Eliminated manual entry bottlenecks, ensuring 100% data consistency and freeing up critical staff hours.',
    tech: ['AI/ML', 'Python', 'Automation', 'Data Engineering']
  },
  {
    id: 'p7',
    title: 'Marketing Workflow Orchestration',
    problem: 'Disconnected marketing tools and CRM systems resulted in lead leakage and inefficient campaign management.',
    solution: 'Implemented complex event-driven automation pipelines using n8n to synchronize data across all marketing platforms.',
    result: 'Achieved seamless tool interoperability and fully automated critical business logic workflows.',
    tech: ['n8n', 'Workflow Automation', 'API Integration']
  },
  {
    id: 'p8',
    title: 'E-Commerce Scale Architecture',
    problem: 'Legacy systems could not support the growing inventory complexity and transaction volume for specialized medical supplies.',
    solution: 'Architected and deployed a scalable full-stack e-commerce infrastructure with a custom inventory admin dashboard.',
    result: 'Delivered a high-availability platform supporting seamless transactions and real-time inventory management.',
    tech: ['Full-stack', 'Database Design', 'Cloud Hosting']
  }
];

export const SKILLS: SkillCategory[] = [
  { category: 'Cloud & Infrastructure', skills: ['AWS', 'Terraform', 'Ansible', 'Linux (RHEL/Ubuntu)'] },
  { category: 'CI/CD & DevOps', skills: ['Jenkins', 'GitHub Actions', 'Docker', 'GitOps'] },
  { category: 'Security (DevSecOps)', skills: ['Container Security', 'Access Control', 'Network Security', 'VPNs'] },
  { category: 'Monitoring & Logging', skills: ['Prometheus', 'Grafana', 'ELK Stack', 'Zabbix'] },
  { category: 'Programming', skills: ['Python', 'Bash', 'JavaScript', 'C/C++'] },
  { category: 'Networking', skills: ['Cisco (CCNA/DevNet)', 'Routing & Switching', 'Protocol Analysis'] },
];

export const CERTIFICATIONS: Certification[] = [
  { name: 'AWS Certified Security - Specialty (SCS-C02)', issuer: 'AWS', year: 'Current' },
  { name: 'AWS Certified Solutions Architect – Associate', issuer: 'AWS', year: 'Current' },
  { name: 'Cisco CyberOps Associate', issuer: 'Cisco', year: 'Current' },
  { name: 'Cisco DevNet Associate', issuer: 'Cisco', year: 'Current' },
  { name: 'CompTIA Network+ (N10-007)', issuer: 'CompTIA', year: 'Current' },
  { name: 'CompTIA Linux+', issuer: 'CompTIA', year: 'Current' },
];