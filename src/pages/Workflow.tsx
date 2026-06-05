import React, { useState } from 'react';
import { GitBranch, CheckCircle, Clock, ArrowRight, ChevronRight, Users, FileText, Building2, CreditCard } from 'lucide-react';

const NAVY = '#4B5563';
const GREEN = '#27AE60';
const ORANGE = '#E67E22';
const BLUE = '#2980B9';

interface WorkflowStep {
  id: string;
  label: string;
  role: string;
  status: 'done' | 'active' | 'pending';
  duration?: string;
}

interface Workflow {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  steps: WorkflowStep[];
}

const workflows: Workflow[] = [
  {
    id: 'commercial',
    name: 'Workflow Commercial',
    icon: <Building2 size={16} />,
    color: NAVY,
    description: 'De la prise de contact client à la signature finale',
    steps: [
      { id: 's1', label: 'Prise de contact', role: 'Commercial', status: 'done', duration: '1-3 j' },
      { id: 's2', label: 'Visite & Présentation', role: 'Commercial', status: 'done', duration: '1 j' },
      { id: 's3', label: 'Offre commerciale', role: 'Resp. Commercial', status: 'done', duration: '2-5 j' },
      { id: 's4', label: 'Réservation signée', role: 'Commercial + Juridique', status: 'active', duration: '3-7 j' },
      { id: 's5', label: 'Financement client', role: 'Client + Banque', status: 'pending', duration: '30-90 j' },
      { id: 's6', label: 'Compromis de vente', role: 'Notaire', status: 'pending', duration: '15 j' },
      { id: 's7', label: 'Acte définitif', role: 'Notaire + PDG', status: 'pending', duration: '7 j' },
    ],
  },
  {
    id: 'chantier',
    name: 'Workflow Chantier',
    icon: <Building2 size={16} />,
    color: '#27AE60',
    description: 'Cycle de validation et exécution des phases de construction',
    steps: [
      { id: 's1', label: 'Planning phase approuvé', role: 'Dir. Technique', status: 'done', duration: '5 j' },
      { id: 's2', label: 'Marché attribué', role: 'Dir. Achats', status: 'done', duration: '15-30 j' },
      { id: 's3', label: 'OS émis', role: 'MOE', status: 'done', duration: '2 j' },
      { id: 's4', label: 'Démarrage travaux', role: 'Entreprise + CT', status: 'active', duration: 'Variable' },
      { id: 's5', label: 'Contrôle qualité', role: 'BET + CT', status: 'active', duration: 'Continu' },
      { id: 's6', label: 'Réception partielle', role: 'MOE + BET', status: 'pending', duration: '3 j' },
      { id: 's7', label: 'Réception définitive', role: 'MOE + PDG', status: 'pending', duration: '30 j' },
    ],
  },
  {
    id: 'validation',
    name: 'Workflow Validation Documents',
    icon: <FileText size={16} />,
    color: BLUE,
    description: 'Circuit de validation documentaire GED',
    steps: [
      { id: 's1', label: 'Soumission document', role: 'Émetteur', status: 'done', duration: '— ' },
      { id: 's2', label: 'Contrôle technique', role: 'Bureau Études', status: 'done', duration: '2-3 j' },
      { id: 's3', label: 'Revue technique', role: 'Dir. Technique', status: 'active', duration: '3-5 j' },
      { id: 's4', label: 'Validation direction', role: 'Dir. Générale', status: 'pending', duration: '1-2 j' },
      { id: 's5', label: 'Archivage GED', role: 'Système', status: 'pending', duration: 'Auto' },
    ],
  },
  {
    id: 'procurement',
    name: 'Workflow Achats',
    icon: <CreditCard size={16} />,
    color: ORANGE,
    description: 'Processus de commande et réception fournisseurs',
    steps: [
      { id: 's1', label: 'Expression besoin', role: 'Conducteur Travaux', status: 'done', duration: '1 j' },
      { id: 's2', label: 'Demande offre (RFQ)', role: 'Dir. Achats', status: 'done', duration: '5-10 j' },
      { id: 's3', label: 'Analyse offres', role: 'Dir. Achats + Technique', status: 'done', duration: '3-5 j' },
      { id: 's4', label: 'Approbation BC', role: 'Dir. Financière', status: 'active', duration: '1-2 j' },
      { id: 's5', label: 'Émission BC', role: 'Dir. Achats', status: 'pending', duration: '1 j' },
      { id: 's6', label: 'Livraison', role: 'Fournisseur', status: 'pending', duration: 'Contractuel' },
      { id: 's7', label: 'Réception & contrôle', role: 'CT + Magasinier', status: 'pending', duration: '1 j' },
      { id: 's8', label: 'Facture validée', role: 'Dir. Financière', status: 'pending', duration: '3-5 j' },
    ],
  },
  {
    id: 'investor_report',
    name: 'Workflow Reporting Investisseur',
    icon: <Users size={16} />,
    color: '#8E44AD',
    description: 'Cycle trimestriel de reporting aux investisseurs',
    steps: [
      { id: 's1', label: 'Collecte données', role: 'Toutes directions', status: 'done', duration: '5 j' },
      { id: 's2', label: 'Consolidation rapport', role: 'Dir. Financière', status: 'done', duration: '5 j' },
      { id: 's3', label: 'Validation interne', role: 'Dir. Générale', status: 'active', duration: '3 j' },
      { id: 's4', label: 'Envoi investisseurs', role: 'Secrétariat', status: 'pending', duration: '1 j' },
      { id: 's5', label: 'Réunion investisseurs', role: 'PDG + Investisseurs', status: 'pending', duration: '1 j' },
      { id: 's6', label: 'Archivage & suivi', role: 'Dir. Financière', status: 'pending', duration: '1 j' },
    ],
  },
];

const statusIcon = (s: string) => {
  if (s === 'done') return <CheckCircle size={14} className="text-green-600" />;
  if (s === 'active') return <Clock size={14} style={{ color: ORANGE }} />;
  return <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />;
};

export default function WorkflowPage() {
  const [selected, setSelected] = useState<string>('commercial');

  const current = workflows.find(w => w.id === selected)!;

  const activeInstances = [
    { workflow: 'Workflow Commercial', instance: 'Réservation C-202 — M. Berrada', step: 'Financement client', progress: 57, since: '5 jours' },
    { workflow: 'Workflow Chantier', instance: 'Phase Gros Oeuvre R+3 — Urban Grove', step: 'Exécution travaux', progress: 78, since: '12 semaines' },
    { workflow: 'Workflow Documents', instance: 'Rapport Avancement Q3-2024', step: 'Revue technique', progress: 60, since: '3 jours' },
    { workflow: 'Workflow Achats', instance: 'BC-2024-0141 — Profils aluminium', step: 'Approbation BC', progress: 50, since: '1 jour' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="text-base font-bold text-white tracking-wide">WORKFLOW & PROCESSUS</h1>
        <p className="text-white/50 text-xs mt-0.5">Schémas de processus · Instances actives · États d'approbation</p>
      </div>

      <div className="page-content">
        {/* Active instances */}
        <div className="erp-card">
          <div className="erp-section-header">
            <span className="erp-section-title">Instances de workflow actives</span>
            <span className="badge badge-blue">{activeInstances.length} en cours</span>
          </div>
          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Workflow</th>
                  <th>Instance</th>
                  <th>Étape actuelle</th>
                  <th>Progression</th>
                  <th>Depuis</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeInstances.map((inst, i) => (
                  <tr key={i}>
                    <td><span className="badge badge-blue">{inst.workflow.replace('Workflow ', '')}</span></td>
                    <td className="font-medium text-sm">{inst.instance}</td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <Clock size={11} style={{ color: ORANGE }} />
                        <span className="text-xs">{inst.step}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <div className="w-20 bg-gray-100 h-1.5">
                          <div className="h-1.5" style={{ width: `${inst.progress}%`, background: NAVY }} />
                        </div>
                        <span className="text-2xs">{inst.progress}%</span>
                      </div>
                    </td>
                    <td className="text-xs text-corporate-muted">{inst.since}</td>
                    <td>
                      <button className="text-xs text-navy hover:underline flex items-center gap-1" style={{ color: NAVY }}>
                        Traiter <ChevronRight size={10} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {/* Workflow selector */}
          <div className="erp-card overflow-hidden">
            <div className="erp-section-header">
              <span className="erp-section-title">Processus</span>
            </div>
            <div>
              {workflows.map(w => (
                <button
                  key={w.id}
                  onClick={() => setSelected(w.id)}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 border-b border-corporate-border text-left transition-colors ${
                    selected === w.id ? 'bg-blue-50' : 'hover:bg-corporate-gray'
                  }`}
                >
                  <div className="w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ background: `${w.color}20`, color: w.color }}>
                    {w.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${selected === w.id ? 'text-navy' : 'text-gray-700'}`} style={{ color: selected === w.id ? NAVY : undefined }}>
                      {w.name}
                    </p>
                    <p className="text-2xs text-corporate-muted truncate">{w.steps.length} étapes</p>
                  </div>
                  {selected === w.id && <ChevronRight size={12} style={{ color: NAVY }} />}
                </button>
              ))}
            </div>
          </div>

          {/* Workflow diagram */}
          <div className="md:col-span-3 erp-card overflow-hidden">
            <div className="erp-section-header" style={{ borderTopColor: current.color, borderTopWidth: 2 }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 flex items-center justify-center text-white" style={{ background: current.color }}>
                  {current.icon}
                </div>
                <div>
                  <span className="erp-section-title">{current.name}</span>
                  <p className="text-2xs text-corporate-muted mt-0.5">{current.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="badge badge-green">{current.steps.filter(s => s.status === 'done').length} Terminé</span>
                <span className="badge badge-orange">{current.steps.filter(s => s.status === 'active').length} En cours</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-0">
                {current.steps.map((step, index) => (
                  <div key={step.id} className="flex gap-4">
                    {/* Timeline */}
                    <div className="flex flex-col items-center w-8 flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 bg-white ${
                        step.status === 'done' ? 'border-green-500' : step.status === 'active' ? 'border-orange-400' : 'border-gray-300'
                      }`}>
                        {statusIcon(step.status)}
                      </div>
                      {index < current.steps.length - 1 && (
                        <div className={`w-0.5 flex-1 min-h-6 ${step.status === 'done' ? 'bg-green-300' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    {/* Content */}
                    <div className={`flex-1 pb-4 ${index === current.steps.length - 1 ? '' : ''}`}>
                      <div className={`p-3 border transition-colors ${
                        step.status === 'active' ? 'border-orange-300 bg-orange-50' :
                        step.status === 'done' ? 'border-green-200 bg-green-50/30' :
                        'border-corporate-border bg-white'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-semibold ${
                              step.status === 'active' ? 'text-orange-800' :
                              step.status === 'done' ? 'text-green-800' : 'text-gray-500'
                            }`}>{step.label}</span>
                            {step.status === 'active' && (
                              <span className="badge badge-orange">En cours</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-2xs text-corporate-muted flex items-center gap-1">
                              <Users size={9} /> {step.role}
                            </span>
                            {step.duration && (
                              <span className="text-2xs text-corporate-muted flex items-center gap-1">
                                <Clock size={9} /> {step.duration}
                              </span>
                            )}
                          </div>
                        </div>
                        {step.status === 'active' && (
                          <div className="flex gap-2 mt-2">
                            <button className="erp-btn-primary text-2xs py-1 px-2 flex items-center gap-1">
                              <CheckCircle size={9} /> Valider
                            </button>
                            <button className="erp-btn-secondary text-2xs py-1 px-2">
                              Reporter
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
