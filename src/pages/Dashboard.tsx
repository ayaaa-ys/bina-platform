import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  Building2, DollarSign, Users, HardHat, RefreshCw
} from 'lucide-react';
import {
  apartments, salesByMonth, budgetByProject, projectProgress,
  getKPIs, alerts, chantierPhases
} from '../data/mockData';

const NAVY = '#4B5563';
const ORANGE = '#E67E22';
const GREEN = '#27AE60';
const RED = '#E74C3C';
const BLUE = '#2980B9';
const LIGHT_BLUE = '#3498DB';

const fmt = (n: number) => new Intl.NumberFormat('fr-MA').format(n);
const fmtM = (n: number) => `${(n / 1_000_000).toFixed(1)} M`;

function KPICard({ title, value, sub, delta, deltaUp, icon, color }: {
  title: string; value: string; sub?: string; delta?: string; deltaUp?: boolean; icon: React.ReactNode; color: string;
}) {
  return (
    <div className="erp-card p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 flex items-center justify-center" style={{ background: `${color}15`, color }}>
          {icon}
        </div>
        {delta && (
          <div className={`flex items-center gap-0.5 text-xs font-semibold ${deltaUp ? 'text-green-600' : 'text-red-500'}`}>
            {deltaUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {delta}
          </div>
        )}
      </div>
      <div className="kpi-value" style={{ color: NAVY }}>{value}</div>
      <div className="kpi-label">{title}</div>
      {sub && <div className="text-2xs text-corporate-muted mt-1">{sub}</div>}
    </div>
  );
}

export default function DashboardPage() {
  const [activeProject, setActiveProject] = useState<string>('all');
  const kpis = getKPIs();

  const filteredApts = activeProject === 'all'
    ? apartments
    : apartments.filter(a => a.project === activeProject);

  const projectNames = Array.from(new Set(apartments.map(a => a.project)));

  const statusDist = [
    { name: 'Vendu', value: filteredApts.filter(a => a.status === 'Vendu').length, color: GREEN },
    { name: 'Réservé', value: filteredApts.filter(a => a.status === 'Réservé').length, color: ORANGE },
    { name: 'Disponible', value: filteredApts.filter(a => a.status === 'Disponible').length, color: BLUE },
  ];

  const typoDist = ['T2', 'T3', 'T4', 'T5', 'Penthouse', 'Villa T4', 'Villa T5'].map(t => ({
    name: t,
    count: filteredApts.filter(a => a.typology === t).length,
    revenue: filteredApts.filter(a => a.typology === t && a.status === 'Vendu').reduce((s, a) => s + a.prixMAD, 0),
  })).filter(t => t.count > 0);

  const activeAlerts = alerts.filter(a => !a.read);

  const revenueEvolution = salesByMonth.map(m => ({
    ...m,
    cumulatif: salesByMonth.slice(0, salesByMonth.indexOf(m) + 1).reduce((s, x) => s + x.ca, 0),
  }));

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">TABLEAU DE BORD DÉCISIONNEL</h1>
            <p className="text-white/50 text-xs mt-0.5">Synthèse opérationnelle — Valoris Real Estate · Mise à jour: Aujourd'hui 09:14</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={activeProject}
              onChange={e => setActiveProject(e.target.value)}
              className="bg-white/10 border border-white/20 text-white text-xs px-2 py-1.5"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <option value="all">Tous les projets</option>
              {projectNames.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <button className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white border border-white/20 px-2 py-1.5">
              <RefreshCw size={12} /> Actualiser
            </button>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Active Alerts Banner */}
        {activeAlerts.length > 0 && (
          <div className="grid gap-3 md:grid-cols-3">
            {activeAlerts.slice(0, 3).map(a => (
              <article key={a.id} className="bg-white p-5 flex items-start gap-4 rounded-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 flex items-center justify-center rounded-sm ${
                  a.type === 'danger' ? 'bg-red-50' : a.type === 'warning' ? 'bg-orange-50' : 'bg-blue-50'
                }`}>
                  <AlertTriangle className={`w-5 h-5 ${
                    a.type === 'danger' ? 'text-red-500' : a.type === 'warning' ? 'text-orange-500' : 'text-blue-500'
                  }`} />
                </div>
                <div className="min-w-0">
                  <h3 className={`font-semibold text-sm ${
                    a.type === 'danger' ? 'text-red-600' : a.type === 'warning' ? 'text-orange-600' : 'text-blue-700'
                  }`}>
                    {a.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{a.module} · {a.date}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KPICard
            title="Unités commercialisées"
            value={`${kpis.sold + kpis.reserved} / ${kpis.totalUnits}`}
            sub={`${kpis.sold} vendues · ${kpis.reserved} réservées`}
            delta="+5 vs M-1"
            deltaUp
            icon={<Building2 size={16} />}
            color={NAVY}
          />
          <KPICard
            title="CA Réalisé"
            value={`${fmtM(kpis.totalRevenueSold)} MAD`}
            sub={`+ ${fmtM(kpis.totalRevenueReserved)} MAD engagé`}
            delta="+12%"
            deltaUp
            icon={<DollarSign size={16} />}
            color={GREEN}
          />
          <KPICard
            title="Taux d'absorption"
            value={`${kpis.absorptionRate}%`}
            sub={`${kpis.available} unités disponibles`}
            delta="+3pts"
            deltaUp
            icon={<TrendingUp size={16} />}
            color={BLUE}
          />
          <KPICard
            title="Alertes actives"
            value={`${activeAlerts.length}`}
            sub={`${alerts.filter(a => a.type === 'danger').length} critiques`}
            delta={activeAlerts.length > 2 ? 'Action requise' : 'Sous contrôle'}
            deltaUp={activeAlerts.length <= 2}
            icon={<AlertTriangle size={16} />}
            color={activeAlerts.length > 2 ? RED : ORANGE}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Revenue Evolution */}
          <div className="md:col-span-2 erp-card">
            <div className="erp-section-header">
              <span className="erp-section-title">Évolution du chiffre d'affaires</span>
              <span className="text-xs text-corporate-muted">YTD 2024</span>
            </div>
            <div className="p-4 h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueEvolution}>
                  <defs>
                    <linearGradient id="caGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={NAVY} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={NAVY} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="cumGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={GREEN} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={GREEN} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#7F8C8D' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#7F8C8D' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000000).toFixed(0)}M`} />
                  <Tooltip formatter={(v: number) => `${fmt(v)} MAD`} />
                  <Area type="monotone" dataKey="ca" name="CA Mensuel" stroke={NAVY} strokeWidth={2} fill="url(#caGrad)" dot={{ r: 3, fill: NAVY }} />
                  <Area type="monotone" dataKey="cumulatif" name="CA Cumulé" stroke={GREEN} strokeWidth={1.5} fill="url(#cumGrad)" strokeDasharray="4 2" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="erp-card">
            <div className="erp-section-header">
              <span className="erp-section-title">Répartition des unités</span>
            </div>
            <div className="p-4 h-52 flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <Pie data={statusDist} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value">
                    {statusDist.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v} unités`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {statusDist.map(s => (
                  <div key={s.name} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-2xs text-gray-600">{s.name}: <strong>{s.value}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Budget vs Dépenses */}
          <div className="erp-card">
            <div className="erp-section-header">
              <span className="erp-section-title">Budget vs Réalisé</span>
              <span className="badge badge-blue">MAD</span>
            </div>
            <div className="p-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetByProject} layout="vertical" barSize={10}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 9, fill: '#7F8C8D' }} tickFormatter={v => `${(v/1000000).toFixed(0)}M`} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="project" tick={{ fontSize: 9, fill: '#7F8C8D' }} width={70} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v: number) => `${fmt(v)} MAD`} />
                  <Bar dataKey="budget" name="Budget" fill={`${NAVY}30`} />
                  <Bar dataKey="depense" name="Dépensé" fill={NAVY} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales Activity */}
          <div className="erp-card">
            <div className="erp-section-header">
              <span className="erp-section-title">Activité commerciale</span>
            </div>
            <div className="p-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByMonth} barSize={12}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#7F8C8D' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#7F8C8D' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="ventes" name="Ventes" fill={GREEN} />
                  <Bar dataKey="reservations" name="Réservations" fill={ORANGE} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Project Advancement */}
          <div className="erp-card">
            <div className="erp-section-header">
              <span className="erp-section-title">Avancement projets</span>
            </div>
            <div className="p-4 space-y-4">
              {projectProgress.map(p => (
                <div key={p.project}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700 truncate">{p.project.split(' ').slice(0, 2).join(' ')}</span>
                    <span className="text-xs font-bold" style={{ color: NAVY }}>{p.global}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${p.global}%`, background: NAVY }} />
                  </div>
                  <div className="flex gap-3 mt-1">
                    {[
                      { label: 'GO', val: p.grosOeuvre },
                      { label: 'SO', val: p.secondOeuvre },
                      { label: 'COM', val: p.commercial },
                    ].map(s => (
                      <div key={s.label} className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full" style={{ background: s.val >= 80 ? GREEN : s.val >= 40 ? ORANGE : '#ccc' }} />
                        <span className="text-2xs text-gray-400">{s.label}: {s.val}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Financial Synthesis */}
          <div className="erp-card">
            <div className="erp-section-header">
              <span className="erp-section-title">Synthèse financière</span>
              <span className="text-xs text-corporate-muted">Multi-projets</span>
            </div>
            <div className="p-0">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Projet</th>
                    <th>Budget total</th>
                    <th>Engagé</th>
                    <th>Reste</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetByProject.map(p => {
                    const pct = Math.round((p.depense / p.budget) * 100);
                    return (
                      <tr key={p.project}>
                        <td className="font-medium text-xs">{p.project.split(' ').slice(0, 2).join(' ')}</td>
                        <td>{fmtM(p.budget)} M</td>
                        <td>{fmtM(p.depense)} M</td>
                        <td className={p.reste < 15_000_000 ? 'text-red-600 font-semibold' : ''}>{fmtM(p.reste)} M</td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <div className="w-12 bg-gray-100 h-1">
                              <div className="h-1" style={{ width: `${pct}%`, background: pct > 90 ? RED : pct > 70 ? ORANGE : GREEN }} />
                            </div>
                            <span className="text-2xs">{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chantier Status */}
          <div className="erp-card">
            <div className="erp-section-header">
              <span className="erp-section-title">Phases chantier actives</span>
              <span className="badge badge-orange">{chantierPhases.filter(p => p.status === 'En cours').length} en cours</span>
            </div>
            <div className="p-0">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Phase</th>
                    <th>Projet</th>
                    <th>Avancement</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {chantierPhases.filter(p => p.status !== 'Terminé').slice(0, 5).map(phase => (
                    <tr key={phase.id}>
                      <td className="font-medium text-xs max-w-28 truncate">{phase.name}</td>
                      <td className="text-2xs text-corporate-muted max-w-24 truncate">{phase.project.split(' ').slice(0, 2).join(' ')}</td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <div className="w-14 bg-gray-100 h-1.5">
                            <div className="h-1.5" style={{ width: `${phase.progress}%`, background: phase.progress > 70 ? GREEN : phase.progress > 30 ? ORANGE : NAVY }} />
                          </div>
                          <span className="text-2xs font-semibold">{phase.progress}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${phase.status === 'En cours' ? 'badge-blue' : phase.status === 'En retard' ? 'badge-red' : 'badge-gray'}`}>
                          {phase.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
