import React, { useState } from 'react';
import { projectProgress, apartments } from '../data/mockData';
import { Users, TrendingUp, FileText, Shield, Download, Lock, Eye, BarChart2 } from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const NAVY = '#4B5563';
const GREEN = '#27AE60';
const ORANGE = '#E67E22';
const fmt = (n: number) => new Intl.NumberFormat('fr-MA').format(n);

const investors = [
  { id: 'INV-001', name: 'M. Fassi Fihri Ahmed', project: 'Sky Garden', investment: 9_800_000, roi: 18.5, status: 'Actif', nextCall: '2024-09-01', shares: '4.2%' },
  { id: 'INV-002', name: 'Fonds CIMR Immobilier', project: 'Urban Grove by Sky Park', investment: 22_000_000, roi: 16.2, status: 'Actif', nextCall: '2024-10-15', shares: '12.8%' },
  { id: 'INV-003', name: 'M. Benjelloun Said', project: 'Résidence Panorama', investment: 4_650_000, roi: 14.8, status: 'Actif', nextCall: '2024-08-20', shares: '3.1%' },
  { id: 'INV-004', name: 'REIM Atlas Capital', project: 'Sky Garden', investment: 35_000_000, roi: 19.2, status: 'Actif', nextCall: '2024-09-30', shares: '22.5%' },
];

const roiProjection = [
  { quarter: 'Q1-24', skyGarden: 4.2, urbanGrove: 3.1, panorama: 2.8 },
  { quarter: 'Q2-24', skyGarden: 4.8, urbanGrove: 3.5, panorama: 3.2 },
  { quarter: 'Q3-24', skyGarden: 5.1, urbanGrove: 4.0, panorama: 3.8 },
  { quarter: 'Q4-24', skyGarden: 5.8, urbanGrove: 4.5, panorama: 4.2 },
  { quarter: 'Q1-25', skyGarden: 6.2, urbanGrove: 5.2, panorama: 4.8 },
  { quarter: 'Q2-25', skyGarden: 7.0, urbanGrove: 6.0, panorama: 5.5 },
];

const capitalCalls = [
  { ref: 'CALL-2024-03', investor: 'REIM Atlas Capital', project: 'Sky Garden', amount: 8_500_000, dueDate: '2024-08-01', status: 'Payé' },
  { ref: 'CALL-2024-04', investor: 'Fonds CIMR Immobilier', project: 'Urban Grove', amount: 5_200_000, dueDate: '2024-09-01', status: 'En attente' },
  { ref: 'CALL-2024-05', investor: 'M. Fassi Fihri Ahmed', project: 'Sky Garden', amount: 2_100_000, dueDate: '2024-09-15', status: 'En attente' },
  { ref: 'CALL-2024-06', investor: 'M. Benjelloun Said', project: 'Panorama', amount: 980_000, dueDate: '2024-10-01', status: 'Planifié' },
];

const investorDocuments = [
  { name: 'Rapport Q2-2024 — Sky Garden', date: '2024-07-15', type: 'Rapport trimestriel', access: 'REIM + Fassi Fihri' },
  { name: 'Relevé de compte investisseur', date: '2024-07-10', type: 'Financier', access: 'Tous' },
  { name: 'PV AG Investisseurs 2024', date: '2024-06-20', type: 'Gouvernance', access: 'Tous' },
  { name: 'Rapport d\'avancement Urban Grove', date: '2024-06-30', type: 'Technique', access: 'CIMR' },
];

export default function InvestorPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'reporting' | 'documents' | 'appels'>('overview');

  return (
    <div>
      <div className="page-header" style={{ background: 'linear-gradient(90deg, #111827, #4B5563)' }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={14} className="text-white/60" />
              <span className="text-white/60 text-xs tracking-widest uppercase">Accès sécurisé</span>
            </div>
            <h1 className="text-base font-bold text-white tracking-wide">PORTAIL INVESTISSEUR</h1>
            <p className="text-white/50 text-xs mt-0.5">Tableau de bord investisseurs · Capital calls · Reporting · Documents</p>
          </div>
          <div className="flex items-center gap-2">
            <Lock size={14} className="text-white/40" />
            <span className="text-white/40 text-xs">Accès confidentiel</span>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Investor KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Investisseurs actifs', value: `${investors.length}`, color: NAVY, icon: <Users size={15} /> },
            { label: 'Capital engagé', value: '71.5 M MAD', color: GREEN, icon: <TrendingUp size={15} /> },
            { label: 'ROI moyen portefeuille', value: '17.2%', color: ORANGE, icon: <BarChart2 size={15} /> },
            { label: 'Prochains appels', value: `${capitalCalls.filter(c => c.status === 'En attente').length} en attente`, color: '#E74C3C', icon: <FileText size={15} /> },
          ].map(k => (
            <div key={k.label} className="erp-card p-4 flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: `${k.color}15`, color: k.color }}>
                {k.icon}
              </div>
              <div>
                <div className="text-lg font-bold" style={{ color: k.color }}>{k.value}</div>
                <div className="text-2xs text-corporate-muted uppercase tracking-wide">{k.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="erp-card overflow-hidden">
          <div className="flex border-b border-corporate-border bg-white px-4">
            {[
              { id: 'overview', label: 'Investisseurs' },
              { id: 'reporting', label: 'ROI & Projections' },
              { id: 'appels', label: 'Capital Calls' },
              { id: 'documents', label: 'Documents' },
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

          {activeTab === 'overview' && (
            <div>
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Réf.</th>
                    <th>Investisseur</th>
                    <th>Projet</th>
                    <th className="text-right">Investissement</th>
                    <th>Parts</th>
                    <th>ROI cible</th>
                    <th>Prochain appel</th>
                    <th>Statut</th>
                    <th>Accès portail</th>
                  </tr>
                </thead>
                <tbody>
                  {investors.map(inv => (
                    <tr key={inv.id}>
                      <td className="font-mono text-xs" style={{ color: NAVY }}>{inv.id}</td>
                      <td className="font-medium">{inv.name}</td>
                      <td className="text-xs text-corporate-muted">{inv.project}</td>
                      <td className="text-right font-semibold text-xs">{fmt(inv.investment)}</td>
                      <td className="text-center font-semibold" style={{ color: NAVY }}>{inv.shares}</td>
                      <td className="text-center text-green-600 font-semibold">{inv.roi}%</td>
                      <td className="text-xs">{inv.nextCall}</td>
                      <td><span className="badge badge-green">{inv.status}</span></td>
                      <td>
                        <button className="text-xs flex items-center gap-1 text-navy hover:underline" style={{ color: NAVY }}>
                          <Eye size={10} /> Ouvrir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Project progress for investors */}
              <div className="p-4 grid md:grid-cols-3 gap-4 border-t border-corporate-border">
                {projectProgress.map(p => (
                  <div key={p.project} className="border border-corporate-border p-4">
                    <h4 className="text-xs font-bold text-gray-800 mb-3">{p.project}</h4>
                    <div className="space-y-2">
                      {[
                        { label: 'Avancement global', val: p.global },
                        { label: 'Gros Oeuvre', val: p.grosOeuvre },
                        { label: 'Commercial', val: p.commercial },
                      ].map(s => (
                        <div key={s.label}>
                          <div className="flex justify-between text-2xs mb-0.5">
                            <span className="text-corporate-muted">{s.label}</span>
                            <span className="font-semibold">{s.val}%</span>
                          </div>
                          <div className="progress-bar-track">
                            <div className="progress-bar-fill" style={{ width: `${s.val}%`, background: s.val >= 80 ? GREEN : NAVY }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reporting' && (
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Projections ROI trimestrielles (%)</h3>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={roiProjection}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                      <XAxis dataKey="quarter" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `${v}%`} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v: number) => `${v}%`} />
                      <Line type="monotone" dataKey="skyGarden" name="Sky Garden" stroke={NAVY} strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="urbanGrove" name="Urban Grove" stroke={GREEN} strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="panorama" name="Panorama" stroke={ORANGE} strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { project: 'Sky Garden', roi: '19.2%', va: '+2.8 M MAD', period: 'Sur 24 mois' },
                  { project: 'Urban Grove', roi: '16.2%', va: '+3.5 M MAD', period: 'Sur 18 mois' },
                  { project: 'Panorama', roi: '14.8%', va: '+0.7 M MAD', period: 'Sur 12 mois' },
                ].map(r => (
                  <div key={r.project} className="erp-card p-4 border-t-2" style={{ borderTopColor: NAVY }}>
                    <h4 className="text-xs font-bold text-gray-800 mb-2">{r.project}</h4>
                    <div className="text-xl font-bold" style={{ color: GREEN }}>{r.roi}</div>
                    <div className="text-xs text-corporate-muted">ROI estimé</div>
                    <div className="text-sm font-semibold mt-2" style={{ color: NAVY }}>{r.va}</div>
                    <div className="text-2xs text-corporate-muted">Valeur ajoutée · {r.period}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appels' && (
            <div>
              <div className="p-4 border-b border-corporate-border">
                <span className="text-sm font-semibold text-gray-800">Appels de fonds — Capital Calls</span>
              </div>
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Référence</th>
                    <th>Investisseur</th>
                    <th>Projet</th>
                    <th className="text-right">Montant (MAD)</th>
                    <th>Échéance</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {capitalCalls.map(c => (
                    <tr key={c.ref}>
                      <td className="font-mono text-xs" style={{ color: NAVY }}>{c.ref}</td>
                      <td className="font-medium text-sm">{c.investor}</td>
                      <td className="text-xs text-corporate-muted">{c.project}</td>
                      <td className="text-right font-semibold">{fmt(c.amount)}</td>
                      <td>{c.dueDate}</td>
                      <td>
                        <span className={`badge ${c.status === 'Payé' ? 'badge-green' : c.status === 'En attente' ? 'badge-orange' : 'badge-gray'}`}>
                          {c.status}
                        </span>
                      </td>
                      <td>
                        <button className="text-xs text-navy hover:underline" style={{ color: NAVY }}>Envoyer rappel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <div className="p-4 border-b border-corporate-border flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800">Documents investisseurs</span>
                <span className="text-xs text-corporate-muted flex items-center gap-1"><Lock size={11} /> Accès restreint</span>
              </div>
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Accès</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {investorDocuments.map((d, i) => (
                    <tr key={i}>
                      <td className="font-medium">{d.name}</td>
                      <td><span className="badge badge-blue">{d.type}</span></td>
                      <td>{d.date}</td>
                      <td className="text-xs text-corporate-muted">{d.access}</td>
                      <td>
                        <div className="flex gap-2">
                          <button className="text-xs flex items-center gap-1 text-navy hover:underline" style={{ color: NAVY }}>
                            <Eye size={10} /> Voir
                          </button>
                          <button className="text-xs flex items-center gap-1 text-corporate-muted hover:text-navy">
                            <Download size={10} /> DL
                          </button>
                        </div>
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
