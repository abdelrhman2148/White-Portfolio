import React from 'react';
import { Theme } from '../types';

interface DiagramProps {
  theme: Theme;
  projectId: string;
}

const InfrastructureDiagram: React.FC<DiagramProps> = ({ theme, projectId }) => {
  const isTerminal = theme === 'terminal';
  const isAccent = theme === 'accent';
  
  const stroke = isTerminal ? '#00ff41' : isAccent ? '#2563EB' : '#171717';
  const fill = isTerminal ? '#000000' : isAccent ? '#EFF6FF' : '#ffffff';
  const text = isTerminal ? '#00ff41' : isAccent ? '#1e293b' : '#171717';
  const accentFill = isTerminal ? '#003300' : isAccent ? '#DBEAFE' : '#f3f4f6';
  const gridColor = isTerminal ? '#113311' : '#e2e8f0';

  // --- Reusable SVG Components ---

  const Defs = () => (
    <defs>
      <marker id={`arrow-${projectId}`} markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill={stroke} />
      </marker>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke={gridColor} strokeWidth="0.5" opacity="0.5"/>
      </pattern>
    </defs>
  );

  const DataPacket = ({ pathId, duration = "2s", delay = "0s", r = "3" }: { pathId: string, duration?: string, delay?: string, r?: string }) => (
    <circle r={r} fill={stroke}>
      <animateMotion dur={duration} repeatCount="indefinite" begin={delay} calcMode="linear">
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  );

  const Label = ({ x, y, children, align = "middle", size = "10", bold = false }: any) => (
    <text x={x} y={y} textAnchor={align} fill={text} fontSize={size} fontWeight={bold ? "bold" : "normal"} fontFamily="monospace">
      {children}
    </text>
  );

  const DatabaseShape = ({ x, y, label }: { x: number, y: number, label: string }) => (
    <g transform={`translate(${x}, ${y})`}>
      <path d="M0,10 C0,4 40,4 40,10 L40,50 C40,56 0,56 0,50 Z" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <path d="M0,10 C0,16 40,16 40,10" fill="none" stroke={stroke} strokeWidth="1.5" />
      <path d="M0,25 C0,31 40,31 40,25" fill="none" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <path d="M0,40 C0,46 40,46 40,40" fill="none" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <text x="20" y="70" textAnchor="middle" fill={text} fontSize="9">{label}</text>
    </g>
  );

  const ServerBox = ({ x, y, w, h, label, sub }: { x: number, y: number, w: number, h: number, label: string, sub?: string }) => (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={w} height={h} rx="4" fill={accentFill} stroke={stroke} strokeWidth="1.5" />
      <line x1="10" y1="10" x2={w-10} y2="10" stroke={stroke} strokeWidth="1" opacity="0.5"/>
      <circle cx="15" cy="10" r="2" fill={stroke} />
      <text x={w/2} y={h/2 + 4} textAnchor="middle" fill={text} fontSize="10" fontWeight="bold">{label}</text>
      {sub && <text x={w/2} y={h + 15} textAnchor="middle" fill={text} fontSize="9" opacity="0.8">{sub}</text>}
    </g>
  );

  const CloudZone = ({ x, y, w, h, label }: { x: number, y: number, w: number, h: number, label: string }) => (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={w} height={h} rx="8" fill="none" stroke={stroke} strokeDasharray="4 4" opacity="0.4" />
      <text x="10" y="20" fill={text} fontSize="10" opacity="0.6" fontWeight="bold">{label.toUpperCase()}</text>
    </g>
  );

  // --- Diagram Renderers ---

  const renderDiagram = () => {
    switch (projectId) {
      case 'p1': // CI/CD
        return (
          <g>
            <Label x="400" y="280" size="12">AUTOMATED DELIVERY PIPELINE</Label>
            
            {/* Developer */}
            <g transform="translate(50, 130)">
               <circle cx="20" cy="20" r="15" fill="none" stroke={stroke} />
               <path d="M10,35 C10,35 10,25 20,25 C30,25 30,35 30,35" fill="none" stroke={stroke} />
               <Label x="20" y="55" size="9">DEV</Label>
            </g>

            {/* Git */}
            <g transform="translate(130, 125)">
               <circle cx="25" cy="25" r="25" fill={fill} stroke={stroke} strokeWidth="1.5"/>
               <Label x="25" y="30" bold>GIT</Label>
            </g>

            {/* CI Server */}
            <g transform="translate(230, 100)">
                <rect width="100" height="80" rx="4" fill={accentFill} stroke={stroke} strokeWidth="1.5" />
                <Label x="50" y="20" size="9" bold>JENKINS</Label>
                <rect x="10" y="30" width="80" height="10" rx="2" fill={fill} stroke={stroke} />
                <rect x="10" y="45" width="80" height="10" rx="2" fill={fill} stroke={stroke} />
                <rect x="10" y="60" width="80" height="10" rx="2" fill={fill} stroke={stroke} />
                <text x="50" y="38" textAnchor="middle" fontSize="6" fill={text}>BUILD</text>
                <text x="50" y="53" textAnchor="middle" fontSize="6" fill={text}>TEST</text>
                <text x="50" y="68" textAnchor="middle" fontSize="6" fill={text}>SCAN</text>
            </g>

            {/* Registry */}
            <g transform="translate(380, 110)">
                <path d="M0,0 L50,0 L50,60 L0,60 Z" fill={fill} stroke={stroke} strokeWidth="1.5" />
                <line x1="10" y1="15" x2="40" y2="15" stroke={stroke} />
                <line x1="10" y1="30" x2="40" y2="30" stroke={stroke} />
                <line x1="10" y1="45" x2="40" y2="45" stroke={stroke} />
                <Label x="25" y="75" size="9">ECR</Label>
            </g>

            {/* Environments */}
            <CloudZone x={480} y={50} w={250} h={180} label="K8s Cluster" />
            
            <g transform="translate(500, 80)">
                <rect width="90" height="60" rx="4" fill={fill} stroke={stroke} />
                <Label x="45" y="35" size="9">STAGING</Label>
            </g>

            <g transform="translate(620, 150)">
                <rect width="90" height="60" rx="4" fill={stroke} stroke={stroke} fillOpacity="0.1" />
                <Label x="45" y="35" size="9" bold>PROD</Label>
            </g>

            {/* Paths */}
            <path id="p1-git" d="M80 150 L130 150" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
            <path id="p1-ci" d="M180 150 L230 150" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
            <path id="p1-reg" d="M330 140 L380 140" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
            <path id="p1-stage" d="M430 140 L460 140 L460 110 L500 110" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
            <path id="p1-prod" d="M460 140 L460 180 L620 180" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />

            <DataPacket pathId="p1-git" />
            <DataPacket pathId="p1-ci" delay="0.5s" />
            <DataPacket pathId="p1-reg" delay="1.5s" />
            <DataPacket pathId="p1-stage" delay="2s" />
            <DataPacket pathId="p1-prod" delay="2.5s" />
          </g>
        );

      case 'p2': // IoT
        return (
          <g>
             <Label x="400" y="280" size="12">DIGITAL TWIN IOT PIPELINE</Label>
             
             {/* Edge Devices */}
             <g transform="translate(50, 80)">
                <rect width="40" height="140" rx="4" fill="none" stroke={stroke} strokeDasharray="2 2" />
                <Label x="20" y="-10" size="9">FIELD</Label>
                <circle cx="20" cy="30" r="8" fill={fill} stroke={stroke} />
                <circle cx="20" cy="70" r="8" fill={fill} stroke={stroke} />
                <circle cx="20" cy="110" r="8" fill={fill} stroke={stroke} />
             </g>

             {/* MQTT Gateway */}
             <ServerBox x={150} y={120} w={80} h={60} label="MQTT" sub="Broker" />

             {/* Cloud Processor */}
             <CloudZone x={280} y={50} w={450} h={200} label="Cloud Core" />
             
             <g transform="translate(320, 120)">
                <path d="M0,0 L60,0 L80,30 L60,60 L0,60 L20,30 Z" fill={accentFill} stroke={stroke} />
                <Label x="40" y="35" size="8">STREAM</Label>
             </g>

             {/* Storage */}
             <DatabaseShape x={450} y={80} label="TimeSeries" />
             <DatabaseShape x={450} y={160} label="MetaDB" />

             {/* API & App */}
             <ServerBox x={550} y={115} w={60} h={70} label="API" />
             
             <g transform="translate(660, 110)">
                <rect width="80" height="80" rx="8" fill={fill} stroke={stroke} />
                <rect x="10" y="10" width="60" height="40" rx="2" fill={stroke} fillOpacity="0.1"/>
                <Label x="40" y="70" size="9">DASHBOARD</Label>
             </g>

             {/* Paths */}
             <path id="p2-ingest" d="M90 150 L150 150" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
             <path id="p2-stream" d="M230 150 L320 150" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
             <path id="p2-db1" d="M400 150 L420 150 L420 110 L450 110" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
             <path id="p2-db2" d="M420 150 L420 190 L450 190" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
             <path id="p2-api" d="M490 110 L520 110 L520 150 L550 150" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
             <path id="p2-app" d="M610 150 L660 150" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />

             <DataPacket pathId="p2-ingest" duration="1s" />
             <DataPacket pathId="p2-stream" duration="1s" delay="0.5s" />
             <DataPacket pathId="p2-db1" duration="1s" delay="1s" />
             <DataPacket pathId="p2-api" duration="1s" delay="2s" />
             <DataPacket pathId="p2-app" duration="1s" delay="2.5s" />
          </g>
        );

      case 'p3': // KPI / Automation
        return (
           <g>
            <Label x="400" y="280" size="12">INTERNAL DATA AGGREGATION</Label>
            
            {/* Sources */}
            <g transform="translate(50, 60)">
                <rect x="0" y="0" width="40" height="40" rx="2" fill={fill} stroke={stroke} />
                <Label x="20" y="25" size="8">JIRA</Label>
                
                <rect x="0" y="60" width="40" height="40" rx="2" fill={fill} stroke={stroke} />
                <Label x="20" y="85" size="8">GIT</Label>

                <rect x="0" y="120" width="40" height="40" rx="2" fill={fill} stroke={stroke} />
                <Label x="20" y="145" size="8">TIME</Label>
            </g>

            {/* ETL Worker */}
            <g transform="translate(200, 80)">
                <circle cx="50" cy="50" r="50" fill="none" stroke={stroke} strokeDasharray="4 4" />
                <path d="M50 20 L50 80 M20 50 L80 50" stroke={stroke} opacity="0.2" />
                <ServerBox x={20} y={25} w={60} h={50} label="ETL" sub="Python" />
            </g>

            {/* Data Warehouse */}
            <DatabaseShape x={400} y={90} label="Warehouse" />

            {/* Backend API */}
            <ServerBox x={520} y={90} w={60} h={60} label="API" />

            {/* Frontend */}
            <g transform="translate(650, 70)">
                <rect width="100" height="80" rx="4" fill={accentFill} stroke={stroke} />
                <rect x="10" y="10" width="35" height="25" fill={fill} stroke={stroke} />
                <rect x="55" y="10" width="35" height="25" fill={fill} stroke={stroke} />
                <rect x="10" y="45" width="80" height="25" fill={fill} stroke={stroke} />
                <Label x="50" y="95" size="9">KPI DASHBOARD</Label>
            </g>

            {/* Flows */}
            <path id="p3-in1" d="M90 80 L220 105" fill="none" stroke={stroke} strokeDasharray="2 2" />
            <path id="p3-in2" d="M90 140 L220 105" fill="none" stroke={stroke} strokeDasharray="2 2" />
            <path id="p3-etl" d="M300 130 L400 130" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
            <path id="p3-api" d="M440 130 L520 130" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
            <path id="p3-ui" d="M580 130 L650 130" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />

            <DataPacket pathId="p3-in1" delay="0s" />
            <DataPacket pathId="p3-in2" delay="0.5s" />
            <DataPacket pathId="p3-etl" delay="1.5s" />
           </g>
        );

      case 'p4': // VR Backend
        return (
          <g>
            <Label x="400" y="280" size="12">VR ASSET & STATE ARCHITECTURE</Label>

            {/* VR Client */}
            <g transform="translate(50, 110)">
                 <path d="M0,10 L40,10 L50,20 L50,40 L40,50 L0,50 Z" fill={fill} stroke={stroke} />
                 <rect x="5" y="15" width="25" height="30" rx="2" fill={stroke} />
                 <Label x="25" y="65" size="9">VR CLIENT</Label>
            </g>

            {/* Route 53 / LB */}
            <g transform="translate(150, 120)">
                <circle cx="20" cy="20" r="20" fill={fill} stroke={stroke} />
                <text x="20" y="25" textAnchor="middle" fontSize="8" fill={text}>DNS/LB</text>
            </g>

            {/* Split Path Top: CDN/S3 */}
            <g transform="translate(300, 50)">
                 <rect width="100" height="60" rx="4" fill={accentFill} stroke={stroke} />
                 <Label x="50" y="35" bold>CDN Edge</Label>
            </g>
            <g transform="translate(500, 50)">
                 <path d="M0,0 L40,0 L40,60 L0,60 Z" fill={fill} stroke={stroke} />
                 <Label x="20" y="35" size="9">S3</Label>
                 <Label x="20" y="75" size="8">ASSETS</Label>
            </g>

            {/* Split Path Bottom: API */}
            <g transform="translate(300, 180)">
                <ServerBox x={0} y={0} w={100} h={60} label="Game Server" sub="Node.js" />
            </g>
             <DatabaseShape x={500} y={180} label="UserDB" />

             {/* Connections */}
             <path id="p4-req" d="M100 135 L150 140" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
             
             {/* Asset Flow */}
             <path id="p4-asset" d="M190 130 L250 80 L300 80" fill="none" stroke={stroke} strokeWidth="2" />
             <path id="p4-s3" d="M400 80 L500 80" fill="none" stroke={stroke} strokeDasharray="2 2" />
             
             {/* Data Flow */}
             <path id="p4-api" d="M190 150 L250 210 L300 210" fill="none" stroke={stroke} />
             <path id="p4-db" d="M400 210 L500 210" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />

             <DataPacket pathId="p4-req" />
             <DataPacket pathId="p4-asset" r="4" delay="0.5s" duration="1.5s" />
             <DataPacket pathId="p4-api" r="2" delay="0.5s" />
          </g>
        );

      case 'p5': // Monitoring
        return (
          <g>
             <Label x="400" y="280" size="12">OBSERVABILITY STACK</Label>

             {/* Targets */}
             <g transform="translate(60, 80)">
                <rect width="100" height="120" rx="4" fill="none" stroke={stroke} strokeDasharray="4 4" />
                <Label x="50" y="-10" size="9">INFRASTRUCTURE</Label>
                
                <rect x="20" y="20" width="60" height="20" rx="2" fill={fill} stroke={stroke} />
                <rect x="20" y="50" width="60" height="20" rx="2" fill={fill} stroke={stroke} />
                <rect x="20" y="80" width="60" height="20" rx="2" fill={fill} stroke={stroke} />
                <text x="50" y="115" textAnchor="middle" fontSize="8" fill={text}>EXPORTERS</text>
             </g>

             {/* Prometheus */}
             <g transform="translate(250, 110)">
                <circle cx="40" cy="40" r="40" fill={accentFill} stroke={stroke} strokeWidth="2" />
                <Label x="40" y="45" bold>PROMETHEUS</Label>
             </g>

             {/* Alert Manager */}
             <g transform="translate(400, 60)">
                <path d="M0,0 L80,0 L80,50 L0,50 Z" fill={fill} stroke={stroke} />
                <Label x="40" y="30" size="9">AlertMgr</Label>
             </g>

             {/* Grafana */}
             <g transform="translate(400, 160)">
                <path d="M0,0 L80,0 L80,50 L0,50 Z" fill={fill} stroke={stroke} />
                <Label x="40" y="30" size="9">Grafana</Label>
             </g>

             {/* Notification */}
             <g transform="translate(550, 60)">
                 <circle cx="20" cy="25" r="15" fill={fill} stroke={stroke} />
                 <Label x="20" y="60" size="8">SLACK</Label>
             </g>

             {/* User */}
             <g transform="translate(550, 160)">
                 <circle cx="20" cy="25" r="15" fill={fill} stroke={stroke} />
                 <Label x="20" y="60" size="8">ADMIN</Label>
             </g>

             {/* Flows */}
             <path id="p5-scrape" d="M160 140 L250 150" fill="none" stroke={stroke} strokeDasharray="2 2" markerEnd={`url(#arrow-${projectId})`} />
             <path id="p5-alert" d="M300 120 L400 85" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
             <path id="p5-vis" d="M330 150 L400 185" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
             <path id="p5-notif" d="M480 85 L550 85" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />

             <DataPacket pathId="p5-scrape" duration="2s" />
             <DataPacket pathId="p5-alert" duration="2s" delay="1s" />
             <DataPacket pathId="p5-vis" duration="2s" delay="1s" />
          </g>
        );

      case 'p6': // Kroll AI
        return (
          <g>
            <Label x="400" y="280" size="12">AI AGENT AUTOMATION</Label>

            {/* Input */}
            <g transform="translate(50, 120)">
                <rect x="0" y="0" width="40" height="50" fill={fill} stroke={stroke} />
                <line x1="10" y1="10" x2="30" y2="10" stroke={stroke} />
                <line x1="10" y1="20" x2="30" y2="20" stroke={stroke} />
                <line x1="10" y1="30" x2="30" y2="30" stroke={stroke} />
                <Label x="20" y="65" size="8">RX DOCS</Label>
            </g>

            {/* OCR */}
            <g transform="translate(150, 120)">
                <rect x="0" y="0" width="60" height="50" rx="4" fill={fill} stroke={stroke} />
                <Label x="30" y="30">OCR</Label>
            </g>

            {/* Brain/Model */}
            <g transform="translate(280, 100)">
                 <path d="M0,20 C0,0 80,0 80,20 L80,70 C80,90 0,90 0,70 Z" fill={accentFill} stroke={stroke} />
                 <Label x="40" y="45" bold>LLM AGENT</Label>
                 <circle cx="20" cy="30" r="3" fill={stroke} opacity="0.5"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite"/></circle>
                 <circle cx="60" cy="30" r="3" fill={stroke} opacity="0.5"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin="0.5s" repeatCount="indefinite"/></circle>
                 <circle cx="40" cy="60" r="3" fill={stroke} opacity="0.5"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin="1s" repeatCount="indefinite"/></circle>
            </g>

            {/* Parser/Validator */}
            <g transform="translate(420, 120)">
                <path d="M0,0 L60,0 L50,50 L10,50 Z" fill={fill} stroke={stroke} />
                <Label x="30" y="30" size="8">VALIDATOR</Label>
            </g>

            {/* Kroll DB */}
            <DatabaseShape x={550} y={110} label="Kroll DB" />
            
            {/* Success */}
            <g transform="translate(650, 130)">
                 <circle cx="15" cy="15" r="15" fill="none" stroke={stroke} />
                 <path d="M8,15 L13,20 L22,10" fill="none" stroke={stroke} strokeWidth="2" />
            </g>

            {/* Flows */}
            <path id="p6-ocr" d="M90 145 L150 145" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
            <path id="p6-ai" d="M210 145 L280 145" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
            <path id="p6-val" d="M360 145 L420 145" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
            <path id="p6-db" d="M480 145 L550 145" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
            
            <DataPacket pathId="p6-ocr" />
            <DataPacket pathId="p6-ai" delay="0.5s" />
            <DataPacket pathId="p6-val" delay="1.5s" />
            <DataPacket pathId="p6-db" delay="2s" />
          </g>
        );

      case 'p7': // n8n
        return (
          <g>
            <Label x="400" y="280" size="12">EVENT-DRIVEN WORKFLOW</Label>

            {/* Triggers */}
            <g transform="translate(60, 60)">
                <circle cx="25" cy="25" r="25" fill={fill} stroke={stroke} />
                <Label x="25" y="30" size="9">WEBHOOK</Label>
            </g>
            <g transform="translate(60, 160)">
                <rect width="50" height="50" rx="4" fill={fill} stroke={stroke} />
                <Label x="25" y="30" size="9">FORM</Label>
            </g>

            {/* n8n Hub */}
            <g transform="translate(200, 100)">
                <rect width="120" height="80" rx="12" fill={accentFill} stroke={stroke} strokeWidth="2" />
                <Label x="60" y="45" bold>n8n CORE</Label>
                
                {/* Node connections inside */}
                <circle cx="20" cy="40" r="3" fill={stroke} />
                <circle cx="100" cy="40" r="3" fill={stroke} />
                <path d="M20,40 C40,40 40,60 60,60 C80,60 80,40 100,40" fill="none" stroke={stroke} strokeWidth="1" />
            </g>

            {/* Logic Branch */}
            <g transform="translate(380, 120)">
                <path d="M0,20 L20,0 L40,20 L20,40 Z" fill={fill} stroke={stroke} />
                <Label x="20" y="60" size="8">FILTER</Label>
            </g>

            {/* Integrations */}
            <g transform="translate(500, 50)">
                 <rect width="60" height="40" rx="4" fill={fill} stroke={stroke} />
                 <Label x="30" y="25" size="8">Salesforce</Label>
            </g>
            <g transform="translate(500, 120)">
                 <rect width="60" height="40" rx="4" fill={fill} stroke={stroke} />
                 <Label x="30" y="25" size="8">Mailchimp</Label>
            </g>
            <g transform="translate(500, 190)">
                 <rect width="60" height="40" rx="4" fill={fill} stroke={stroke} />
                 <Label x="30" y="25" size="8">Slack</Label>
            </g>

            {/* Paths */}
            <path id="p7-t1" d="M110 85 L200 120" fill="none" stroke={stroke} />
            <path id="p7-t2" d="M110 185 L200 160" fill="none" stroke={stroke} />
            <path id="p7-out" d="M320 140 L380 140" fill="none" stroke={stroke} />
            
            <path id="p7-b1" d="M420 140 L460 140 L460 70 L500 70" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
            <path id="p7-b2" d="M420 140 L500 140" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
            <path id="p7-b3" d="M420 140 L460 140 L460 210 L500 210" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />

            <DataPacket pathId="p7-t1" />
            <DataPacket pathId="p7-out" delay="1s" />
            <DataPacket pathId="p7-b1" delay="1.5s" />
          </g>
        );

      case 'p8': // E-Commerce (DentaQ) - ELB + EKS + 3 EC2
        return (
          <g>
            <Label x="400" y="280" size="12">EKS SCALABLE ARCHITECTURE</Label>

            {/* Cloud Wrapper */}
            <CloudZone x={40} y={30} w={720} h={230} label="AWS VPC" />

            {/* Traffic Source */}
             <g transform="translate(10, 140)">
                 <path d="M0,0 L30,0" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />
            </g>

            {/* ELB */}
            <g transform="translate(60, 110)">
                <rect width="60" height="60" rx="4" fill={accentFill} stroke={stroke} />
                <Label x="30" y="35" bold>ELB</Label>
            </g>

            {/* EKS Cluster */}
            <g transform="translate(160, 50)">
                <rect width="400" height="190" rx="8" fill="none" stroke={stroke} strokeDasharray="4 4" opacity="0.5" />
                <Label x="200" y="15" bold>EKS CLUSTER</Label>
                
                {/* Node 1 */}
                <ServerBox x={50} y={30} w={100} h={40} label="EC2 Node 1" />
                
                {/* Node 2 */}
                <ServerBox x={50} y={80} w={100} h={40} label="EC2 Node 2" />
                
                {/* Node 3 */}
                <ServerBox x={50} y={130} w={100} h={40} label="EC2 Node 3" />
                
                {/* Pods/Scalability visual */}
                <g transform="translate(200, 30)">
                   <rect width="150" height="140" rx="4" fill={fill} stroke={stroke} strokeOpacity="0.2" />
                   <Label x="75" y="20" size="9">POD SCALING GRP</Label>
                   <circle cx="40" cy="50" r="15" fill={accentFill} stroke={stroke} />
                   <circle cx="110" cy="50" r="15" fill={accentFill} stroke={stroke} />
                   <circle cx="75" cy="100" r="15" fill={accentFill} stroke={stroke} />
                   <Label x="40" y="54" size="8">Auth</Label>
                   <Label x="110" y="54" size="8">Cart</Label>
                   <Label x="75" y="104" size="8">Pay</Label>
                </g>
            </g>

            {/* Database */}
            <g transform="translate(600, 100)">
                <DatabaseShape x={0} y={0} label="RDS" />
            </g>

            {/* Connecting Lines */}
            {/* ELB to Nodes */}
            <path id="p8-n1" d="M120 140 L140 140 L140 100 L210 100" fill="none" stroke={stroke} />
            <path id="p8-n2" d="M120 140 L210 140" fill="none" stroke={stroke} />
            <path id="p8-n3" d="M120 140 L140 140 L140 200 L210 200" fill="none" stroke={stroke} />

            {/* Nodes to Pods (Conceptual) */}
            <path d="M310 100 L360 100" stroke={stroke} strokeDasharray="2 2" opacity="0.3"/>
            <path d="M310 150 L360 150" stroke={stroke} strokeDasharray="2 2" opacity="0.3"/>
            <path d="M310 200 L360 180" stroke={stroke} strokeDasharray="2 2" opacity="0.3"/>

            {/* Pods to DB */}
            <path id="p8-db" d="M510 140 L600 140" fill="none" stroke={stroke} markerEnd={`url(#arrow-${projectId})`} />

            {/* Animations */}
            <DataPacket pathId="p8-n1" delay="0s" />
            <DataPacket pathId="p8-n2" delay="0.5s" />
            <DataPacket pathId="p8-n3" delay="1s" />
            <DataPacket pathId="p8-db" delay="1.5s" />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`
      w-full aspect-[16/9] flex items-center justify-center overflow-hidden transition-all duration-500
      ${isTerminal ? 'bg-black border-2 border-green-900 shadow-[0_0_20px_rgba(0,255,65,0.1)]' : ''}
      ${isAccent ? 'bg-white border border-slate-200 rounded-xl shadow-lg' : ''}
      ${theme === 'minimal' ? 'bg-gray-50 border border-gray-200' : ''}
    `}>
      <svg viewBox="0 0 800 300" className="w-full h-full p-4 md:p-6">
        <Defs />
        {isTerminal && <rect width="100%" height="100%" fill="url(#grid)" />}
        {renderDiagram()}
      </svg>
    </div>
  );
};

export default InfrastructureDiagram;