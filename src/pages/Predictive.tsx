import React, { useState } from 'react';
import { Brain, AlertTriangle, TrendingUp, Calendar, CloudRain, Clock, Cpu, FileText, Zap } from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';

const NAVY = '#4B5563';
const GREEN = '#27AE60';
const ORANGE = '#E67E22';
const RED = '#E74C3C';
const BLUE = '#2980B9';

const deliveryPredictions = [
  { project: 'Urban Grove by Sky Park', predicted: 'Décembre 2025', confidence: 72, risk: 'Modéré', delay: '+2 mois', factors: ['Gros oeuvre R+3 en retard', 'Canicule été 2024'] },
  { project: 'Sky Garden', predicted: 'Mars 2025', confidence: 85, risk: 'Faible', delay: 'Dans les délais', factors: ['Bonne cadence façades', 'Finitions avancées'] },
  { project: 'Résidence Panorama', predicted: 'Novembre 2024', confidence: 91, risk: 'Très faible', delay: 'Dans les délais', factors: ['GO terminé', 'Finitions 62%'] },
];

const delaySimulation = [
  { month: 'Août', optimiste: 55, base: 52, pessimiste: 48 },
  { month: 'Sep', optimiste: 62, base: 58, pessimiste: 52 },
  { month: 'Oct', optimiste: 70, base: 64, pessimiste: 57 },
  { month: 'Nov', optimiste: 78, base: 72, pessimiste: 63 },
  { month: 'Déc', optimiste: 86, base: 79, pessimiste: 69 },
  { month: 'Jan', optimiste: 93, base: 85, pessimiste: 75 },
  { month: 'Fév', optimiste: 98, base: 90, pessimiste: 81 },
];

const weatherImpact = [
  { week: 'S29', temperature: 38, precipitation: 0, lostDays: 2.5 },
  { week: 'S30', temperature: 42, precipitation: 0, lostDays: 4.0 },
  { week: 'S31', temperature: 36, precipitation: 5, lostDays: 1.0 },
  { week: 'S32', temperature: 40, precipitation: 0, lostDays: 3.0 },
  { week: 'S33', temperature: 35, precipitation: 12, lostDays: 2.5 },
];

const aiMeetingSummaries = [
  {
    id: 1,
    date: '2024-07-22',
    meeting: 'Réunion de chantier hebdomadaire — Urban Grove',
    participants: ['M. Tahiri (CT)', 'Ing. Benali (BET)', 'Mme. Alaoui (MOE)', 'M. Ennaji (SOCOMAL)'],
    summary: 'La réunion a permis de constater un retard de 12 jours sur la phase gros oeuvre R+3. Les causes identifiées sont la chaleur excessive en juillet et une livraison tardive de ferraillage. Un plan de rattrapage a été validé avec une augmentation des équipes de 4 ouvriers supplémentaires. Objectif : récupérer 8 jours sur 4 semaines.',
    actions: ['Commander ferraillage supplémentaire (M. Ennaji) — Échéance: 25/07', 'Ajuster planning R+3 (Ing. Benali) — Échéance: 26/07', 'Informer investisseurs du décalage (Mme. Alaoui) — Échéance: 30/07'],
    risks: ['Poursuite de la canicule', 'Tension sur l\'approvisionnement béton'],
  },
  {
    id: 2,
    date: '2024-07-15',
    meeting: 'Comité de pilotage commercial — Multi-projets',
    participants: ['M. Aouragh (PDG)', 'Dir. Commerciale', 'Dir. Financière'],
    summary: 'Le taux d\'absorption global atteint 72%, soit 2 points au-dessus de l\'objectif du S1. Sky Garden se distingue avec 82% d\'absorption. Urban Grove affiche un ralentissement des nouvelles réservations. Un plan d\'action commercial renforcé est décidé pour Urban Grove, incluant une campagne digitale et une journée portes ouvertes en septembre.',
    actions: ['Lancer campagne digitale Urban Grove (Dir. Com.) — Échéance: 01/08', 'Organiser portes ouvertes (Dir. Com.) — Échéance: 15/09', 'Réviser tarifs T2 Urban Grove (Dir. Fin.) — Échéance: 31/07'],
    risks: ['Concurrence nouveaux projets Ain Sebaa', 'Hausse des taux de crédit immobilier'],
  },
];

const subcontractorRisks = [
  { name: 'SOCOMAL Construction', risk: 'Moyen', score: 62, issues: ['Dépassement budget GO Urban Grove +2.5%', 'Retard livraison 12 jours'], mitigation: 'Pénalités contractuelles activées' },
  { name: 'ALUTEC Façades', risk: 'Élevé', score: 45, issues: ['3 non-conformités façades Tour 2', 'Délai correction 72h dépassé'], mitigation: 'Mise en demeure envoyée' },
  { name: 'Déco Design Plus', risk: 'Faible', score: 82, issues: [], mitigation: 'Suivi standard' },
  { name: 'AquaSpace Maroc', risk: 'Faible', score: 78, issues: [], mitigation: 'Suivi standard' },
];

export default function PredictivePage() {
  const [activeTab, setActiveTab] = useState<'livraison' | 'simulation' | 'meteo' | 'ia' | 'sous_traitants'>('livraison');

  return (
    <div>
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #111827, #374151)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Brain size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">TABLEAU PRÉDICTIF + IA</h1>
            <p className="text-white/50 text-xs mt-0.5">Prédictions · Simulations · Risques · IA Générative · Alertes prédictives</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-green-400 border border-green-400/30 px-2 py-1">
              <Cpu size={11} />
              Moteur IA actif
            </div>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="erp-card overflow-hidden">
          <div className="flex border-b border-corporate-border bg-white px-4 overflow-x-auto">
            {[
              { id: 'livraison', label: 'Prédiction livraison', icon: <Calendar size={12} /> },
              { id: 'simulation', label: 'Simulation retards', icon: <TrendingUp size={12} /> },
              { id: 'meteo', label: 'Impact météo', icon: <CloudRain size={12} /> },
              { id: 'sous_traitants', label: 'Risques sous-traitants', icon: <AlertTriangle size={12} /> },
              { id: 'ia', label: 'IA — Résumés réunions', icon: <Brain size={12} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 whitespace-nowrap ${activeTab === tab.id ? 'tab-btn-active' : 'tab-btn-inactive'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'livraison' && (
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50">
                <Cpu size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600">
                  Les prédictions de livraison sont calculées par analyse de la cadence d'avancement historique,
                  des phases restantes, des contraintes météorologiques et des alertes de sous-traitants.
                  Intervalle de confiance à 80%.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {deliveryPredictions.map(p => (
                  <div key={p.project} className="erp-card p-4">
                    <h3 className="text-xs font-bold text-gray-900 mb-3">{p.project}</h3>
                    <div className="text-base font-bold mb-1" style={{ color: NAVY }}>{p.predicted}</div>
                    <div className="text-2xs text-corporate-muted mb-3">Date de livraison estimée</div>
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Confiance</span>
                        <span className="font-semibold">{p.confidence}%</span>
                      </div>
                      <div className="progress-bar-track">
                        <div className="progress-bar-fill" style={{ width: `${p.confidence}%`, background: p.confidence > 80 ? GREEN : p.confidence > 60 ? ORANGE : RED }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Écart planning</span>
                      <span className={`text-xs font-semibold ${p.delay.includes('+') ? 'text-red-600' : 'text-green-600'}`}>{p.delay}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-2xs text-gray-500">Risque:</span>
                      <span className={`badge ${p.risk === 'Très faible' || p.risk === 'Faible' ? 'badge-green' : p.risk === 'Modéré' ? 'badge-orange' : 'badge-red'}`}>{p.risk}</span>
                    </div>
                    <div className="pt-2 border-t border-corporate-border space-y-1">
                      {p.factors.map((f, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <div className="w-1 h-1 bg-corporate-muted rounded-full mt-1.5 flex-shrink-0" />
                          <span className="text-2xs text-corporate-muted">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'simulation' && (
            <div className="p-4 space-y-4">
              <div className="flex flex-wrap gap-4 items-center mb-4">
                <div>
                  <label className="erp-label">Projet</label>
                  <select className="erp-input py-1.5 text-xs min-w-48">
                    <option>Urban Grove by Sky Park</option>
                    <option>Sky Garden</option>
                    <option>Résidence Panorama</option>
                  </select>
                </div>
                <div>
                  <label className="erp-label">Scénario météo</label>
                  <select className="erp-input py-1.5 text-xs">
                    <option>Normal</option>
                    <option>Canicule prolongée</option>
                    <option>Saison des pluies</option>
                  </select>
                </div>
                <div>
                  <label className="erp-label">Cadence équipe</label>
                  <select className="erp-input py-1.5 text-xs">
                    <option>Maintenue</option>
                    <option>+20% (plan de rattrapage)</option>
                    <option>-10% (manque main d'oeuvre)</option>
                  </select>
                </div>
                <button className="erp-btn-primary mt-4 flex items-center gap-1.5 text-xs py-1.5">
                  <Zap size={12} /> Simuler
                </button>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Simulation d'avancement — Urban Grove (scénarios)</h3>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={delaySimulation}>
                      <defs>
                        <linearGradient id="optGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={GREEN} stopOpacity={0.15} />
                          <stop offset="95%" stopColor={GREEN} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="pesGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={RED} stopOpacity={0.15} />
                          <stop offset="95%" stopColor={RED} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `${v}%`} domain={[40, 100]} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v: number) => `${v}%`} />
                      <ReferenceLine y={100} stroke={GREEN} strokeDasharray="4 2" label={{ value: 'Livraison', position: 'right', fontSize: 9 }} />
                      <Area type="monotone" dataKey="optimiste" name="Optimiste" stroke={GREEN} strokeWidth={1.5} fill="url(#optGrad)" strokeDasharray="4 2" />
                      <Area type="monotone" dataKey="base" name="Scénario base" stroke={NAVY} strokeWidth={2} fill="none" />
                      <Area type="monotone" dataKey="pessimiste" name="Pessimiste" stroke={RED} strokeWidth={1.5} fill="url(#pesGrad)" strokeDasharray="4 2" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { scenario: 'Optimiste', date: 'Octobre 2025', delta: '-2 mois', color: GREEN },
                  { scenario: 'Base', date: 'Décembre 2025', delta: 'Référence', color: NAVY },
                  { scenario: 'Pessimiste', date: 'Mars 2026', delta: '+3 mois', color: RED },
                ].map(s => (
                  <div key={s.scenario} className="erp-card p-3 border-t-2" style={{ borderTopColor: s.color }}>
                    <span className="text-2xs font-bold text-corporate-muted uppercase tracking-wide">{s.scenario}</span>
                    <div className="text-sm font-bold mt-1" style={{ color: s.color }}>{s.date}</div>
                    <div className="text-2xs text-corporate-muted">{s.delta}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'meteo' && (
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-3 p-3 bg-orange-50 border-l-4 border-orange-400">
                <CloudRain size={14} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600">
                  Alerte canicule active à Casablanca. Températures &gt;40°C prévues semaine 30.
                  Impact estimé sur la cadence chantier Urban Grove : <strong>4 jours perdus</strong>.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Impact météorologique sur la cadence chantier</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weatherImpact} barSize={18}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                      <XAxis dataKey="week" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis yAxisId="left" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} label={{ value: '°C', angle: -90, position: 'insideLeft', fontSize: 9 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} label={{ value: 'j perdus', angle: 90, position: 'insideRight', fontSize: 9 }} />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="temperature" name="Temp. max (°C)" fill={ORANGE} />
                      <Bar yAxisId="right" dataKey="lostDays" name="Jours perdus" fill={RED} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-3">
                {[
                  { label: 'Jours perdus cumulés', value: '13 jours', color: RED },
                  { label: 'Impact planning', value: '+2-3 semaines', color: ORANGE },
                  { label: 'Coût indirect estimé', value: '320 000 MAD', color: NAVY },
                  { label: 'Météo semaine suivante', value: '38°C — Ensoleillé', color: BLUE },
                ].map(s => (
                  <div key={s.label} className="erp-card p-3">
                    <div className="text-sm font-bold" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-2xs text-corporate-muted mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sous_traitants' && (
            <div className="p-4 space-y-3">
              <h3 className="text-sm font-semibold text-gray-800">Score de risque sous-traitants</h3>
              {subcontractorRisks.map(s => (
                <div key={s.name} className="border border-corporate-border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-800">{s.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-bold" style={{ color: s.score > 70 ? GREEN : s.score > 50 ? ORANGE : RED }}>
                        Score: {s.score}/100
                      </div>
                      <span className={`badge ${s.risk === 'Faible' ? 'badge-green' : s.risk === 'Moyen' ? 'badge-orange' : 'badge-red'}`}>
                        Risque {s.risk}
                      </span>
                    </div>
                  </div>
                  <div className="progress-bar-track mb-2">
                    <div className="progress-bar-fill" style={{ width: `${s.score}%`, background: s.score > 70 ? GREEN : s.score > 50 ? ORANGE : RED }} />
                  </div>
                  {s.issues.length > 0 && (
                    <div className="mb-2">
                      {s.issues.map((issue, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-red-600">
                          <AlertTriangle size={10} />
                          {issue}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-2xs text-corporate-muted">Mitigation: {s.mitigation}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ia' && (
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50">
                <Brain size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600">
                  Les résumés IA sont générés automatiquement à partir des comptes-rendus de réunion.
                  Points d'action extraits et assignés automatiquement. Fiabilité: 94%.
                </p>
              </div>
              {aiMeetingSummaries.map(m => (
                <div key={m.id} className="border border-corporate-border">
                  <div className="px-4 py-3 bg-gray-50 border-b border-corporate-border flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{m.meeting}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-2xs text-corporate-muted">{m.date}</span>
                        <span className="text-2xs text-corporate-muted">{m.participants.length} participants</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="badge badge-blue flex items-center gap-1"><Cpu size={9} /> Résumé IA</span>
                      <button className="text-xs text-navy hover:underline flex items-center gap-1" style={{ color: NAVY }}>
                        <FileText size={10} /> CR Complet
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {m.participants.map(p => (
                        <span key={p} className="badge badge-gray">{p}</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">{m.summary}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                          <Clock size={11} /> Points d'action
                        </h5>
                        <div className="space-y-1.5">
                          {m.actions.map((a, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="w-4 h-4 border border-gray-300 flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-gray-600">{a}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                          <AlertTriangle size={11} className="text-orange-500" /> Risques identifiés
                        </h5>
                        <div className="space-y-1.5">
                          {m.risks.map((r, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <AlertTriangle size={10} className="text-orange-500 flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-gray-600">{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="erp-card p-4 border-2 border-dashed border-corporate-border flex items-center gap-3">
                <Brain size={18} className="text-corporate-muted flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Générer un résumé IA</p>
                  <p className="text-2xs text-corporate-muted mt-0.5">Copiez le contenu de votre réunion pour générer un résumé automatique</p>
                </div>
                <button className="erp-btn-primary text-xs py-1.5 flex items-center gap-1.5">
                  <Brain size={12} /> Analyser
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
