import React, { useState } from 'react';
import { apartments, salesByMonth, budgetByProject, projectProgress, financialData } from '../data/mockData';
import {
  BarChart, Bar, LineChart, Line, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const NAVY = '#4B5563';
const GREEN = '#27AE60';
const ORANGE = '#E67E22';
const RED = '#E74C3C';
const BLUE = '#2980B9';
const fmt = (n: number) => new Intl.NumberFormat('fr-MA').format(n);

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'financier' | 'commercial' | 'operational' | 'croise'>('financier');

  const priceVsSurface = apartments.map(a => ({
    x: a.surface,
    y: a.prixMAD / 1000,
    name: a.ref,
    status: a.status,
  }));

  const typoPrices = ['T2', 'T3', 'T4', 'T5'].map(t => {
    const apts = apartments.filter(a => a.typology === t);
    return {
      typology: t,
      'Prix min': Math.min(...apts.map(a => a.prixMAD)) / 1000,
      'Prix moyen': Math.round(apts.reduce((s, a) => s + a.prixMAD, 0) / apts.length) / 1000,
      'Prix max': Math.max(...apts.map(a => a.prixMAD)) / 1000,
    };
  });

  const projectRadar = projectProgress.map(p => ({
    project: p.project.split(' ').slice(0, 2).join(' '),
    'Gros Oeuvre': p.grosOeuvre,
    'Second Oeuvre': p.secondOeuvre,
    'VRD': p.vrd,
    'Commercial': p.commercial,
    'Global': p.global,
  }));

  const caByProject = [
    { project: 'Urban Grove', vendu: apartments.filter(a => a.project === 'Urban Grove by Sky Park' && a.status === 'Vendu').reduce((s, a) => s + a.prixMAD, 0) / 1_000_000, reserve: apartments.filter(a => a.project === 'Urban Grove by Sky Park' && a.status === 'Réservé').reduce((s, a) => s + a.prixMAD, 0) / 1_000_000 },
    { project: 'Sky Garden', vendu: apartments.filter(a => a.project === 'Sky Garden' && a.status === 'Vendu').reduce((s, a) => s + a.prixMAD, 0) / 1_000_000, reserve: apartments.filter(a => a.project === 'Sky Garden' && a.status === 'Réservé').reduce((s, a) => s + a.prixMAD, 0) / 1_000_000 },
    { project: 'Panorama', vendu: apartments.filter(a => a.project === 'Résidence Panorama' && a.status === 'Vendu').reduce((s, a) => s + a.prixMAD, 0) / 1_000_000, reserve: apartments.filter(a => a.project === 'Résidence Panorama' && a.status === 'Réservé').reduce((s, a) => s + a.prixMAD, 0) / 1_000_000 },
  ];

  const financialByCategory = ['Foncier', 'Construction', 'Études & Bureau', 'Commercial'].map(cat => {
    const entries = financialData.filter(f => f.category === cat);
    return {
      category: cat,
      Budget: entries.reduce((s, f) => s + f.budgeted, 0) / 1_000_000,
      Réalisé: entries.reduce((s, f) => s + f.actual, 0) / 1_000_000,
      Engagé: entries.reduce((s, f) => s + f.committed, 0) / 1_000_000,
    };
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="text-base font-bold text-white tracking-wide">ANALYSE & REPORTING AVANCÉ</h1>
        <p className="text-white/50 text-xs mt-0.5">Analyses croisées · Indicateurs avancés · Matrices comparatives</p>
      </div>

      <div className="page-content">
        <div className="erp-card overflow-hidden">
          <div className="flex border-b border-corporate-border bg-white px-4">
            {[
              { id: 'financier', label: 'Analyse financière' },
              { id: 'commercial', label: 'Analyse commerciale' },
              { id: 'operational', label: 'Analyse opérationnelle' },
              { id: 'croise', label: 'Analyse croisée' },
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

          {activeTab === 'financier' && (
            <div className="p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Budget vs Réalisé par catégorie</h3>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={financialByCategory} barSize={14}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                        <XAxis dataKey="category" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `${v}M`} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(v: number) => `${v.toFixed(1)} M MAD`} />
                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                        <Bar dataKey="Budget" fill={`${NAVY}40`} />
                        <Bar dataKey="Réalisé" fill={NAVY} />
                        <Bar dataKey="Engagé" fill={ORANGE} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">CA par projet (M MAD)</h3>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={caByProject} barSize={20}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                        <XAxis dataKey="project" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `${v.toFixed(0)}M`} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(v: number) => `${v.toFixed(1)} M MAD`} />
                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                        <Bar dataKey="vendu" name="Vendu" fill={GREEN} stackId="a" />
                        <Bar dataKey="reserve" name="Réservé" fill={ORANGE} stackId="a" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Financial table */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Détail par ligne budgétaire</h3>
                <table className="erp-table">
                  <thead>
                    <tr>
                      <th>Catégorie</th>
                      <th>Description</th>
                      <th>Projet</th>
                      <th>Budgété</th>
                      <th>Réalisé</th>
                      <th>Engagé</th>
                      <th>Écart</th>
                      <th>%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialData.map(f => {
                      const ecart = f.actual - f.budgeted;
                      const pct = Math.round((f.actual / f.budgeted) * 100);
                      return (
                        <tr key={f.id}>
                          <td><span className="badge badge-blue">{f.category}</span></td>
                          <td className="text-sm">{f.description}</td>
                          <td className="text-xs text-corporate-muted">{f.project.split(' ').slice(0, 2).join(' ')}</td>
                          <td className="text-right text-xs">{(f.budgeted / 1_000_000).toFixed(1)}M</td>
                          <td className="text-right text-xs">{(f.actual / 1_000_000).toFixed(1)}M</td>
                          <td className="text-right text-xs">{(f.committed / 1_000_000).toFixed(1)}M</td>
                          <td className={`text-right text-xs font-semibold ${ecart > 0 ? 'text-red-600' : ecart < 0 ? 'text-green-600' : ''}`}>
                            {ecart > 0 ? '+' : ''}{(ecart / 1_000_000).toFixed(1)}M
                          </td>
                          <td className="text-xs">{pct}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'commercial' && (
            <div className="p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Prix par m² selon typologie (K MAD)</h3>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={typoPrices} barSize={14}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                        <XAxis dataKey="typology" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `${v}K`} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(v: number) => `${v.toFixed(0)} K MAD`} />
                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                        <Bar dataKey="Prix min" fill={`${BLUE}60`} />
                        <Bar dataKey="Prix moyen" fill={NAVY} />
                        <Bar dataKey="Prix max" fill={ORANGE} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Activité commerciale mensuelle</h3>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={salesByMonth}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                        <Line type="monotone" dataKey="ventes" name="Ventes" stroke={GREEN} strokeWidth={2} dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="reservations" name="Réservations" stroke={ORANGE} strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Surface vs Prix — Nuage de points</h3>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                      <XAxis type="number" dataKey="x" name="Surface m²" tick={{ fontSize: 9 }} label={{ value: 'Surface (m²)', position: 'insideBottom', offset: -2, fontSize: 9 }} axisLine={false} tickLine={false} />
                      <YAxis type="number" dataKey="y" name="Prix K MAD" tick={{ fontSize: 9 }} tickFormatter={v => `${v}K`} axisLine={false} tickLine={false} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(v: number, name: string) => [name === 'Surface m²' ? `${v} m²` : `${v} K MAD`, name]} />
                      <Scatter data={priceVsSurface} fill={NAVY} opacity={0.7} />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'operational' && (
            <div className="p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Radar d'avancement — Urban Grove</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={[
                        { indicator: 'Gros Oeuvre', value: projectProgress[0].grosOeuvre },
                        { indicator: 'Second Oeuvre', value: projectProgress[0].secondOeuvre },
                        { indicator: 'VRD', value: projectProgress[0].vrd },
                        { indicator: 'Commercial', value: projectProgress[0].commercial },
                        { indicator: 'Global', value: projectProgress[0].global },
                      ]}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="indicator" tick={{ fontSize: 10 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8 }} />
                        <Radar name="Urban Grove" dataKey="value" stroke={NAVY} fill={NAVY} fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Comparaison avancement multi-projets</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={projectProgress.map(p => ({ ...p, projet: p.project.split(' ').slice(0, 2).join(' ') }))} layout="vertical" barSize={10}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" horizontal={false} />
                        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 9 }} tickFormatter={v => `${v}%`} axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="projet" width={80} tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(v: number) => `${v}%`} />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        <Bar dataKey="grosOeuvre" name="Gros Oeuvre" fill={NAVY} />
                        <Bar dataKey="secondOeuvre" name="Second Oeuvre" fill={BLUE} />
                        <Bar dataKey="commercial" name="Commercial" fill={GREEN} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'croise' && (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Matrice de performance — Projets × Indicateurs</h3>
              <div className="overflow-x-auto">
                <table className="erp-table">
                  <thead>
                    <tr>
                      <th>Projet</th>
                      <th>Avancement</th>
                      <th>Taux absorption</th>
                      <th>CA Réalisé</th>
                      <th>Budget Consommé</th>
                      <th>Retard (j)</th>
                      <th>Score qualité</th>
                      <th>Score Global</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Urban Grove by Sky Park', avancement: 52, absorption: 71, ca: '28.1M', budget: 65, retard: 12, qualite: 82, score: 'B+' },
                      { name: 'Sky Garden', avancement: 76, absorption: 82, ca: '62.3M', budget: 88, retard: 0, qualite: 75, score: 'A' },
                      { name: 'Résidence Panorama', avancement: 71, absorption: 77, ca: '21.7M', budget: 87, retard: 0, qualite: 90, score: 'A' },
                    ].map(p => (
                      <tr key={p.name}>
                        <td className="font-medium">{p.name}</td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <div className="w-12 bg-gray-100 h-1.5">
                              <div className="h-1.5" style={{ width: `${p.avancement}%`, background: NAVY }} />
                            </div>
                            <span className="text-xs">{p.avancement}%</span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${p.absorption >= 80 ? 'badge-green' : p.absorption >= 60 ? 'badge-orange' : 'badge-red'}`}>
                            {p.absorption}%
                          </span>
                        </td>
                        <td className="font-semibold text-navy" style={{ color: NAVY }}>{p.ca}</td>
                        <td>
                          <span className={`badge ${p.budget >= 90 ? 'badge-red' : p.budget >= 75 ? 'badge-orange' : 'badge-green'}`}>
                            {p.budget}%
                          </span>
                        </td>
                        <td className={p.retard > 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                          {p.retard > 0 ? `+${p.retard}j` : 'Dans les délais'}
                        </td>
                        <td>{p.qualite}/100</td>
                        <td>
                          <span className={`badge ${p.score === 'A' ? 'badge-green' : 'badge-orange'}`}>{p.score}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
