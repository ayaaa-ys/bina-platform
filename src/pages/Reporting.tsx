import React, { useMemo, useState } from 'react';
import jsPDF from 'jspdf';
import { FileText, Download, Plus, Mail, Clock, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

const reportTypes = [
  { id: 'weekly', label: 'Rapport hebdomadaire', icon: <Clock size={15} />, color: '#4B5563', desc: 'Synthèse opérationnelle de la semaine' },
  { id: 'investor', label: 'Rapport investisseur', icon: <FileText size={15} />, color: '#4B5563', desc: 'Reporting financier trimestriel' },
  { id: 'project', label: 'Rapport de projet', icon: <CheckCircle size={15} />, color: '#4B5563', desc: 'État d\'avancement par projet' },
  { id: 'commercial', label: 'Rapport commercial', icon: <FileText size={15} />, color: '#4B5563', desc: 'Synthèse ventes et réservations' },
];

const sectionOptions = ['KPIs', 'Avancement chantier', 'Ventes', 'Finance', 'Alertes', 'Photos', 'Annexes'];

const reportTemplates = {
  weekly: {
    title: 'Rapport hebdomadaire',
    summary: 'Synthèse des performances opérationnelles, suivi des actions principales et recommandations de la semaine.',
    indicators: ['Taux de livraison: 92%', 'Retards: 2 incidents', 'Satisfaction clients: 4.7/5'],
    recommendations: ['Prioriser la validation des plans techniques.', 'Renforcer le suivi des réservations en attente.'],
  },
  investor: {
    title: 'Rapport investisseur',
    summary: 'Vue d’ensemble des indicateurs financiers, des engagements et des perspectives de rentabilité.',
    indicators: ['CA cumulé: 18,4 M MAD', 'Taux de marge: 21%', 'Cash-flow prévisionnel: 3,2 M MAD'],
    recommendations: ['Maintenir la cadence des livraisons.', 'Suivre la trésorerie sur le prochain trimestre.'],
  },
  project: {
    title: 'Rapport de projet',
    summary: 'État de progression du chantier, risques observés et mesures correctives à mettre en œuvre.',
    indicators: ['Avancement global: 76%', 'Écart budget: +1,8%', 'Prochain jalon: validation technique'],
    recommendations: ['Valider les pièces de conception.', 'Lancer la planification de la phase suivante.'],
  },
};

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
  const [period, setPeriod] = useState('2024-07');
  const [recipients, setRecipients] = useState('direction@valoris.ma');
  const [selectedSections, setSelectedSections] = useState<string[]>(['KPIs', 'Finance', 'Alertes']);
  const [customGenerating, setCustomGenerating] = useState(false);
  const [feedback, setFeedback] = useState('');

  const currentDate = useMemo(() => new Date().toLocaleDateString('fr-FR'), []);

  const toggleSection = (section: string) => {
    setSelectedSections(prev =>
      prev.includes(section) ? prev.filter(item => item !== section) : [...prev, section]
    );
  };

  // Génération PDF simple et démonstrative pour les boutons « Générer ».
  const downloadDemoPdf = (reportKey: keyof typeof reportTemplates) => {
    const template = reportTemplates[reportKey];
    const doc = new jsPDF();

    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(17, 24, 39);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('BINA PLATFORM', 18, 22);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Rapport généré le ${currentDate}`, 18, 30);
    doc.setDrawColor(209, 213, 219);
    doc.line(18, 36, 192, 36);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(template.title, 18, 46);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(template.summary, 18, 56, { maxWidth: 170 });

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(18, 68, 174, 28, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Indicateurs clés', 26, 80);
    doc.setFont('helvetica', 'normal');
    template.indicators.forEach((item, index) => {
      doc.text(`• ${item}`, 26, 89 + index * 6);
    });

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(18, 112, 174, 28, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Recommandations', 26, 124);
    doc.setFont('helvetica', 'normal');
    template.recommendations.forEach((item, index) => {
      doc.text(`• ${item}`, 26, 133 + index * 6);
    });

    doc.setFont('helvetica', 'italic');
    doc.setTextColor(75, 85, 99);
    doc.text('Version démonstration — export PDF automatisé BINA PLATFORM', 18, 285);

    doc.save(`${template.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'rapport'}.pdf`);
  };

  const handleGenerate = (id: string) => {
    const key = id as keyof typeof reportTemplates;
    setGenerating(id);
    setFeedback('Rapport généré avec succès');

    setTimeout(() => {
      downloadDemoPdf(key);
      setGenerating(null);
      setGenerated(prev => [...prev, id]);
    }, 600);
  };

  // Génération PDF personnalisé selon les options saisies dans le générateur.
  const handleGenerateCustomReport = () => {
    setCustomGenerating(true);
    setFeedback('Rapport généré avec succès');

    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFillColor(248, 250, 252);
      doc.rect(0, 0, 210, 297, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('BINA PLATFORM', 18, 22);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Rapport personnalisé • ${selectedType}`, 18, 32);
      doc.text(`Projet: ${selectedProject}`, 18, 40);
      doc.text(`Période: ${period}`, 18, 48);
      doc.text(`Destinataires: ${recipients || 'Aucun destinataire'}`, 18, 56);
      doc.text(`Sections incluses: ${selectedSections.join(', ')}`, 18, 64);
      doc.text('Résumé: Ce PDF de démonstration montre le format attendu pour les exports automatisés de BINA PLATFORM.', 18, 78, { maxWidth: 170 });
      doc.text('Recommandations: consolider les KPIs, suivre les écarts budgétaires et valider les jalons techniques.', 18, 102, { maxWidth: 170 });
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(75, 85, 99);
      doc.text(`Généré le ${currentDate}`, 18, 285);
      doc.save(`rapport-personnalise-${selectedProject.toLowerCase().replace(/\s+/g, '-')}.pdf`);

      setCustomGenerating(false);
    }, 700);
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
        {/* Cartes d’alertes / rapports sobres et blanches */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {reportTypes.map(r => (
            <article key={r.id} className="erp-card p-4 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-corporate-muted">Rapport</p>
                  <h3 className="text-sm font-semibold text-gray-800 mt-1">{r.label}</h3>
                </div>
                <span className="w-9 h-9 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center" style={{ color: r.color }}>
                  {r.icon}
                </span>
              </div>
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
            </article>
          ))}
        </div>

        {feedback && (
          <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700 shadow-sm">{feedback}</div>
        )}

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
              <input type="month" value={period} onChange={e => setPeriod(e.target.value)} className="erp-input" />
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
                {sectionOptions.map(s => (
                  <label key={s} className="flex items-center gap-1.5 text-xs cursor-pointer rounded-full border border-gray-200 bg-gray-50 px-2 py-1">
                    <input type="checkbox" checked={selectedSections.includes(s)} onChange={() => toggleSection(s)} className="w-3 h-3 accent-navy" />
                    {s}
                  </label>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="erp-label">Destinataires (email)</label>
              <input type="text" className="erp-input" value={recipients} onChange={e => setRecipients(e.target.value)} placeholder="email1@valoris.ma, email2@valoris.ma" />
            </div>
            <div className="md:col-span-4 flex gap-3">
              <button
                type="button"
                onClick={handleGenerateCustomReport}
                disabled={customGenerating}
                className="erp-btn-primary flex items-center gap-2"
              >
                {customGenerating ? (
                  <><span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" /> Génération…</>
                ) : (
                  <><FileText size={14} /> Générer le rapport</>
                )}
              </button>
              <button className="erp-btn-secondary flex items-center gap-2">
                <Download size={14} /> Télécharger modèle
              </button>
              <button className="erp-btn-secondary flex items-center gap-2">
                <Mail size={14} /> Envoyer par email
              </button>
            </div>
            {feedback && <p className="md:col-span-4 text-xs text-green-700 mt-1">{feedback}</p>}
          </div>
        </div>

        {/* Report History */}
        <div className="erp-card overflow-hidden border border-gray-200 bg-white shadow-sm">
          <div className="erp-section-header border-b border-gray-100 bg-white">
            <span className="erp-section-title">Historique des rapports</span>
            <span className="badge badge-gray">{generatedReports.length} rapports</span>
          </div>
          <table className="erp-table bg-white">
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
                  <td><span className="badge badge-gray">{r.type}</span></td>
                  <td className="text-xs text-corporate-muted">{r.project}</td>
                  <td className="text-xs">{r.date}</td>
                  <td className="text-xs text-corporate-muted">{r.generatedBy}</td>
                  <td><span className="badge badge-gray">{r.format}</span></td>
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
