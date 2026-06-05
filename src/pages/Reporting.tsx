import React, { useState } from 'react';
import { FileText, Download, Plus, Mail, Clock, CheckCircle } from 'lucide-react';

const reportTypes = [
  { id: 'weekly', label: 'Rapport hebdomadaire', icon: <Clock size={15} />, color: '#2980B9', desc: 'Synthèse opérationnelle de la semaine' },
  { id: 'investor', label: 'Rapport investisseur', icon: <FileText size={15} />, color: '#4B5563', desc: 'Reporting financier trimestriel' },
  { id: 'project', label: 'Rapport de projet', icon: <CheckCircle size={15} />, color: '#27AE60', desc: 'État d\'avancement par projet' },
  { id: 'commercial', label: 'Rapport commercial', icon: <FileText size={15} />, color: '#E67E22', desc: 'Synthèse ventes et réservations' },
];

const generatedReports = [
  { id: 1, name: 'Rapport Hebdomadaire — Semaine 29', type: 'Hebdomadaire', project: 'Multi-projets', date: '2024-07-22', generatedBy: 'Système automatique', format: 'PDF', pages: 12, size: '2.4 MB' },
  { id: 2, name: 'Rapport Investisseur Q2-2024', type: 'Investisseur', project: 'Sky Garden', date: '2024-07-15', generatedBy: 'Direction Financière', format: 'PDF', pages: 28, size: '5.1 MB' },
  { id: 3, name: 'Rapport Avancement — Urban Grove', type: 'Projet', project: 'Urban Grove by Sky Park', date: '2024-07-10', generatedBy: 'Direction Technique', format: 'Excel', pages: 8, size: '1.8 MB' },
  { id: 4, name: 'Synthèse Commerciale Juillet 2024', type: 'Commercial', project: 'Multi-projets', date: '2024-07-05', generatedBy: 'Direction Commerciale', format: 'PDF', pages: 15, size: '3.2 MB' },
  { id: 5, name: 'Rapport Chantier Panorama', type: 'Projet', project: 'Résidence Panorama', date: '2024-07-01', generatedBy: 'Conducteur Travaux', format: 'PDF', pages: 9, size: '2.8 MB' },
];

export default function ReportingPage() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [generated, setGenerated] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState('Hebdomadaire');
  const [selectedProject, setSelectedProject] = useState('Multi-projets');

  const handleGenerate = (id: string) => {
    setGenerating(id);
    setTimeout(() => {
      setGenerating(null);
      setGenerated(prev => [...prev, id]);
    }, 2000);
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">REPORTING AUTOMATIQUE</h1>
            <p className="text-white/50 text-xs mt-0.5">Génération PDF / Excel · Rapports investisseurs · Synthèses automatiques</p>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Report Type Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {reportTypes.map(r => (
            <div key={r.id} className="erp-card p-4">
              <div className="w-8 h-8 flex items-center justify-center mb-3" style={{ background: `${r.color}15`, color: r.color }}>
                {r.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">{r.label}</h3>
              <p className="text-2xs text-corporate-muted mb-3">{r.desc}</p>
              <button
                onClick={() => handleGenerate(r.id)}
                disabled={generating === r.id}
                className="w-full erp-btn-primary py-1.5 text-xs flex items-center justify-center gap-1.5"
              >
                {generating === r.id ? (
                  <><span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" /> Génération...</>
                ) : generated.includes(r.id) ? (
                  <><CheckCircle size={11} /> Généré ✓</>
                ) : (
                  <><Plus size={11} /> Générer</>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Generator Panel */}
        <div className="erp-card">
          <div className="erp-section-header">
            <span className="erp-section-title">Générateur de rapport personnalisé</span>
          </div>
          <div className="p-5 grid md:grid-cols-4 gap-4">
            <div>
              <label className="erp-label">Type de rapport</label>
              <select className="erp-input" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                <option>Hebdomadaire</option>
                <option>Mensuel</option>
                <option>Trimestriel</option>
                <option>Investisseur</option>
                <option>Commercial</option>
                <option>Chantier</option>
                <option>Financier</option>
              </select>
            </div>
            <div>
              <label className="erp-label">Projet concerné</label>
              <select className="erp-input" value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
                <option>Multi-projets</option>
                <option>Urban Grove by Sky Park</option>
                <option>Sky Garden</option>
                <option>Résidence Panorama</option>
              </select>
            </div>
            <div>
              <label className="erp-label">Période</label>
              <input type="month" defaultValue="2024-07" className="erp-input" />
            </div>
            <div>
              <label className="erp-label">Format d'export</label>
              <select className="erp-input">
                <option>PDF</option>
                <option>Excel (.xlsx)</option>
                <option>Word (.docx)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="erp-label">Sections à inclure</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {['KPIs', 'Avancement chantier', 'Ventes', 'Finance', 'Alertes', 'Photos', 'Annexes'].map(s => (
                  <label key={s} className="flex items-center gap-1.5 text-xs cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-3 h-3" />
                    {s}
                  </label>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="erp-label">Destinataires (email)</label>
              <input type="text" className="erp-input" placeholder="email1@valoris.ma, email2@valoris.ma" />
            </div>
            <div className="md:col-span-4 flex gap-3">
              <button className="erp-btn-primary flex items-center gap-2">
                <FileText size={14} /> Générer le rapport
              </button>
              <button className="erp-btn-secondary flex items-center gap-2">
                <Download size={14} /> Télécharger modèle
              </button>
              <button className="erp-btn-secondary flex items-center gap-2">
                <Mail size={14} /> Envoyer par email
              </button>
            </div>
          </div>
        </div>

        {/* Report History */}
        <div className="erp-card overflow-hidden">
          <div className="erp-section-header">
            <span className="erp-section-title">Historique des rapports</span>
            <span className="badge badge-blue">{generatedReports.length} rapports</span>
          </div>
          <table className="erp-table">
            <thead>
              <tr>
                <th>Nom du rapport</th>
                <th>Type</th>
                <th>Projet</th>
                <th>Date de génération</th>
                <th>Généré par</th>
                <th>Format</th>
                <th>Pages</th>
                <th>Taille</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {generatedReports.map(r => (
                <tr key={r.id}>
                  <td className="font-medium text-sm">{r.name}</td>
                  <td><span className="badge badge-blue">{r.type}</span></td>
                  <td className="text-xs text-corporate-muted">{r.project}</td>
                  <td className="text-xs">{r.date}</td>
                  <td className="text-xs text-corporate-muted">{r.generatedBy}</td>
                  <td><span className={`badge ${r.format === 'PDF' ? 'badge-red' : 'badge-green'}`}>{r.format}</span></td>
                  <td className="text-center text-xs">{r.pages}</td>
                  <td className="text-xs text-corporate-muted">{r.size}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-navy hover:underline flex items-center gap-1" style={{ color: '#4B5563' }}>
                        <Download size={10} /> DL
                      </button>
                      <button className="text-xs text-corporate-muted hover:text-navy flex items-center gap-1">
                        <Mail size={10} /> Email
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
