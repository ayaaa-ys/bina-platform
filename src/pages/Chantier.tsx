import React, { useState } from 'react';
import { chantierPhases } from '../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { HardHat, AlertTriangle, CheckCircle, Clock, Plus, Upload, MapPin, Clipboard } from 'lucide-react';

const NAVY = '#4B5563';
const GREEN = '#27AE60';
const ORANGE = '#E67E22';
const RED = '#E74C3C';
const BLUE = '#2980B9';
const fmt = (n: number) => new Intl.NumberFormat('fr-MA').format(n);

const qualityItems = [
  { id: 1, item: 'Conformité ferraillage RDC', status: 'Conforme', date: '2024-07-15', by: 'Ing. Benali' },
  { id: 2, item: 'Test étanchéité toiture terrasse', status: 'Non-conforme', date: '2024-07-18', by: 'Bureau Contrôle' },
  { id: 3, item: 'Réception gros oeuvre R+2', status: 'Conforme', date: '2024-07-10', by: 'Conducteur Travaux' },
  { id: 4, item: 'Vérification fixations façades', status: 'En cours', date: '2024-07-22', by: 'ALUTEC' },
  { id: 5, item: 'Contrôle résistance béton R+3', status: 'Conforme', date: '2024-07-20', by: 'Labo BTP' },
];

const observations = [
  { id: 1, title: 'Retard coulage dalle R+3', type: 'Alerte', severity: 'Critique', project: 'Urban Grove by Sky Park', date: '2024-07-24', gps: '33.5978°N, -7.5768°W' },
  { id: 2, title: 'Non-conformité étanchéité', type: 'Qualité', severity: 'Majeur', project: 'Sky Garden', date: '2024-07-18', gps: '33.6012°N, -7.6543°W' },
  { id: 3, title: 'Livraison ferraillage retardée', type: 'Approvisionnement', severity: 'Mineur', project: 'Résidence Panorama', date: '2024-07-20', gps: '33.5512°N, -7.6201°W' },
  { id: 4, title: 'Incident grue — inspection requise', type: 'Sécurité', severity: 'Critique', project: 'Sky Garden', date: '2024-07-22', gps: '33.6012°N, -7.6543°W' },
];

export default function ChantierPage() {
  const [activeProject, setActiveProject] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'phases' | 'journal' | 'qualite' | 'observations'>('phases');

  const projects = Array.from(new Set(chantierPhases.map(p => p.project)));
  const filtered = activeProject === 'all' ? chantierPhases : chantierPhases.filter(p => p.project === activeProject);

  const inProgress = filtered.filter(p => p.status === 'En cours');
  const completed = filtered.filter(p => p.status === 'Terminé');
  const delayed = filtered.filter(p => p.status === 'En retard');
  const planned = filtered.filter(p => p.status === 'Planifié');

  const budgetData = filtered.map(p => ({
    name: p.name.substring(0, 18) + '…',
    Budget: p.budget,
    Dépensé: p.spent,
  }));

  const statusBadge = (s: string) => {
    if (s === 'Terminé') return 'badge-green';
    if (s === 'En cours') return 'badge-blue';
    if (s === 'En retard') return 'badge-red';
    return 'badge-gray';
  };

  const severityBadge = (s: string) => {
    if (s === 'Critique') return 'badge-red';
    if (s === 'Majeur') return 'badge-orange';
    return 'badge-gray';
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">SUIVI DE CHANTIER</h1>
            <p className="text-white/50 text-xs mt-0.5">Journal de chantier · Phases · Qualité · Observations</p>
          </div>
          <select
            value={activeProject}
            onChange={e => setActiveProject(e.target.value)}
            className="text-xs px-2 py-1.5 border border-white/20 text-white"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <option value="all">Tous les chantiers</option>
            {projects.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="page-content">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: <Clock size={15} />, label: 'En cours', value: inProgress.length, color: BLUE },
            { icon: <CheckCircle size={15} />, label: 'Terminées', value: completed.length, color: GREEN },
            { icon: <AlertTriangle size={15} />, label: 'En retard', value: delayed.length, color: RED },
            { icon: <HardHat size={15} />, label: 'Planifiées', value: planned.length, color: ORANGE },
          ].map(k => (
            <div key={k.label} className="erp-card p-4 flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: `${k.color}15`, color: k.color }}>
                {k.icon}
              </div>
              <div>
                <div className="text-xl font-bold" style={{ color: k.color }}>{k.value}</div>
                <div className="text-2xs text-corporate-muted uppercase tracking-wide">{k.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="erp-card overflow-hidden">
          <div className="flex border-b border-corporate-border bg-white px-4">
            {[
              { id: 'phases', label: 'Phases & Planning' },
              { id: 'journal', label: 'Journal' },
              { id: 'qualite', label: 'Qualité & Conformité' },
              { id: 'observations', label: 'Observations' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={activeTab === tab.id ? 'tab-btn-active' : 'tab-btn-inactive'}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Phases */}
          {activeTab === 'phases' && (
            <div>
              <div className="overflow-x-auto">
                <table className="erp-table">
                  <thead>
                    <tr>
                      <th>Phase</th>
                      <th>Projet</th>
                      <th>Responsable</th>
                      <th>Début</th>
                      <th>Fin prévue</th>
                      <th>Avancement</th>
                      <th>Budget</th>
                      <th>Dépensé</th>
                      <th>Écart</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(phase => {
                      const ecart = phase.spent - phase.budget;
                      return (
                        <tr key={phase.id}>
                          <td className="font-medium text-xs">{phase.name}</td>
                          <td className="text-xs text-corporate-muted max-w-24 truncate">{phase.project.split(' ').slice(0, 2).join(' ')}</td>
                          <td className="text-xs text-corporate-muted">{phase.responsible}</td>
                          <td className="text-xs">{phase.startDate}</td>
                          <td className="text-xs">{phase.endDate}</td>
                          <td>
                            <div className="flex items-center gap-1.5">
                              <div className="w-16 bg-gray-100 h-1.5">
                                <div className="h-1.5" style={{ width: `${phase.progress}%`, background: phase.progress === 100 ? GREEN : NAVY }} />
                              </div>
                              <span className="text-2xs font-semibold">{phase.progress}%</span>
                            </div>
                          </td>
                          <td className="text-right text-xs">{(phase.budget / 1_000_000).toFixed(1)}M</td>
                          <td className="text-right text-xs">{(phase.spent / 1_000_000).toFixed(1)}M</td>
                          <td className={`text-right text-xs font-semibold ${ecart > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {ecart > 0 ? '+' : ''}{(ecart / 1_000).toFixed(0)}K
                          </td>
                          <td><span className={statusBadge(phase.status)}>{phase.status}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-corporate-border">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={budgetData.slice(0, 7)} layout="vertical" barSize={8}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 9 }} tickFormatter={v => `${(v / 1_000_000).toFixed(0)}M`} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v: number) => `${fmt(v)} MAD`} />
                      <Bar dataKey="Budget" fill={`${NAVY}30`} />
                      <Bar dataKey="Dépensé" fill={NAVY} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Journal */}
          {activeTab === 'journal' && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-800">Entrées du journal de chantier</h3>
                <button className="erp-btn-primary flex items-center gap-1.5 text-xs py-1.5">
                  <Plus size={12} /> Nouvelle entrée
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { date: '2024-07-24', project: 'Urban Grove by Sky Park', author: 'M. Tahiri — Conducteur Travaux', content: 'Coulage dalle R+3 Bloc A partiellement réalisé (60%). Retard de 2 jours dû à la chaleur excessive. Reprise prévue demain matin 06h00. Stock béton confirmé. Présence 18 ouvriers sur site.', type: 'Rapport journalier' },
                  { date: '2024-07-23', project: 'Sky Garden', author: 'Ing. Benkirane — Chef de Chantier', content: 'Inspection façades Tour 2 réalisée avec ALUTEC. 3 fixations non-conformes identifiées au niveau R+8. Fiches de non-conformité émises. Correction planifiée sous 72h.', type: 'Observation qualité' },
                  { date: '2024-07-22', project: 'Résidence Panorama', author: 'M. Chakir — Conducteur Travaux', content: 'Avancement second oeuvre atteint 62%. Pose carrelage communs R+1 terminée. Équipe plomberie déployée au R+2. RAS sécurité. Livraison prévue dans les délais.', type: 'Rapport journalier' },
                  { date: '2024-07-20', project: 'Urban Grove by Sky Park', author: 'BET Contrôle', content: 'Résultats tests compression béton R+3 conformes (32 MPa). Rapport laboratoire transmis à la MOE. Validation accordée pour coulage dalle.', type: 'Résultat tests' },
                ].map((entry, i) => (
                  <div key={i} className="border border-corporate-border p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-800">{entry.date}</span>
                        <span className="badge badge-blue">{entry.type}</span>
                        <span className="text-xs text-corporate-muted">{entry.project.split(' ').slice(0, 2).join(' ')}</span>
                      </div>
                    </div>
                    <p className="text-xs text-corporate-muted mb-1">{entry.author}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{entry.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Qualité */}
          {activeTab === 'qualite' && (
            <div>
              <div className="p-4 border-b border-corporate-border flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">Checklist qualité & contrôle</h3>
                <button className="erp-btn-primary flex items-center gap-1.5 text-xs py-1.5">
                  <Clipboard size={12} /> Nouvelle vérification
                </button>
              </div>
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Élément de contrôle</th>
                    <th>Date</th>
                    <th>Contrôlé par</th>
                    <th>Résultat</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {qualityItems.map(item => (
                    <tr key={item.id}>
                      <td className="font-medium text-sm">{item.item}</td>
                      <td>{item.date}</td>
                      <td className="text-corporate-muted">{item.by}</td>
                      <td>
                        <span className={`badge ${item.status === 'Conforme' ? 'badge-green' : item.status === 'Non-conforme' ? 'badge-red' : 'badge-orange'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        {item.status === 'Non-conforme' && (
                          <button className="text-xs text-red-600 hover:underline">Ouvrir NC</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Observations */}
          {activeTab === 'observations' && (
            <div>
              <div className="p-4 border-b border-corporate-border flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">Observations géolocalisées</h3>
                <button className="erp-btn-primary flex items-center gap-1.5 text-xs py-1.5">
                  <Plus size={12} /> Ajouter observation
                </button>
              </div>
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Type</th>
                    <th>Sévérité</th>
                    <th>Projet</th>
                    <th>Date</th>
                    <th>Coordonnées GPS</th>
                    <th>Photo</th>
                  </tr>
                </thead>
                <tbody>
                  {observations.map(obs => (
                    <tr key={obs.id}>
                      <td className="font-medium">{obs.title}</td>
                      <td><span className="badge badge-blue">{obs.type}</span></td>
                      <td><span className={severityBadge(obs.severity)}>{obs.severity}</span></td>
                      <td className="text-xs text-corporate-muted">{obs.project.split(' ').slice(0, 2).join(' ')}</td>
                      <td>{obs.date}</td>
                      <td>
                        <div className="flex items-center gap-1 text-xs text-corporate-muted">
                          <MapPin size={10} />
                          {obs.gps}
                        </div>
                      </td>
                      <td>
                        <button className="flex items-center gap-1 text-xs text-navy hover:underline" style={{ color: NAVY }}>
                          <Upload size={10} /> Joindre
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
