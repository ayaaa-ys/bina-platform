import React, { useState } from 'react';
import { financialData, budgetByProject } from '../data/mockData';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { CreditCard, TrendingUp, AlertTriangle, Plus, Download, CheckCircle, Clock } from 'lucide-react';

const NAVY = '#4B5563';
const GREEN = '#27AE60';
const ORANGE = '#E67E22';
const RED = '#E74C3C';
const fmt = (n: number) => new Intl.NumberFormat('fr-MA').format(n);

const treasuryData = [
  { month: 'Jan', entrees: 12500000, sorties: 9800000, solde: 2700000 },
  { month: 'Fév', entrees: 8200000, sorties: 11200000, solde: -3000000 },
  { month: 'Mar', entrees: 15800000, sorties: 8400000, solde: 7400000 },
  { month: 'Avr', entrees: 9100000, sorties: 12500000, solde: -3400000 },
  { month: 'Mai', entrees: 18200000, sorties: 10200000, solde: 8000000 },
  { month: 'Jun', entrees: 7400000, sorties: 13800000, solde: -6400000 },
  { month: 'Jul', entrees: 11600000, sorties: 9400000, solde: 2200000 },
];

const suppliers = [
  { name: 'SOCOMAL Construction', category: 'Gros Oeuvre', engagement: 62_500_000, facture: 48_200_000, solde: 14_300_000, status: 'Actif' },
  { name: 'ALUTEC Façades', category: 'Façades & Menuiserie', engagement: 9_800_000, facture: 4_410_000, solde: 5_390_000, status: 'Actif' },
  { name: 'Déco Design Plus', category: 'Second Oeuvre', engagement: 19_500_000, facture: 3_600_000, solde: 15_900_000, status: 'Actif' },
  { name: 'GEOMARC SA', category: 'Terrassement', engagement: 9_700_000, facture: 9_430_000, solde: 270_000, status: 'Clôturé' },
  { name: 'AquaSpace Maroc', category: 'Piscine & Espaces', engagement: 2_800_000, facture: 224_000, solde: 2_576_000, status: 'Actif' },
  { name: 'Cabinet ARCHIMARO', category: 'Architecture & MOE', engagement: 5_500_000, facture: 4_200_000, solde: 1_300_000, status: 'Actif' },
];

const purchaseOrders = [
  { ref: 'BC-2024-0142', supplier: 'SOCOMAL Construction', description: 'Ferraillage R+3 — Urban Grove', amount: 1_850_000, date: '2024-07-18', status: 'Approuvé', delivery: '2024-07-25' },
  { ref: 'BC-2024-0141', supplier: 'ALUTEC Façades', description: 'Profils aluminium Tour 2', amount: 980_000, date: '2024-07-15', status: 'En attente', delivery: '2024-08-05' },
  { ref: 'BC-2024-0140', supplier: 'Déco Design Plus', description: 'Carrelage R+2 Panorama', amount: 620_000, date: '2024-07-12', status: 'Livré', delivery: '2024-07-19' },
  { ref: 'BC-2024-0139', supplier: 'AquaSpace Maroc', description: 'Équipements piscine + filtration', amount: 450_000, date: '2024-07-10', status: 'Approuvé', delivery: '2024-08-01' },
  { ref: 'BC-2024-0138', supplier: 'BATIMAROC Sarl', description: 'Bloc béton + enduits', amount: 320_000, date: '2024-07-08', status: 'Livré', delivery: '2024-07-14' },
];

const orderStatusBadge = (s: string) => {
  if (s === 'Approuvé') return 'badge-blue';
  if (s === 'Livré') return 'badge-green';
  if (s === 'En attente') return 'badge-orange';
  return 'badge-gray';
};

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<'budget' | 'tresorerie' | 'fournisseurs' | 'achats'>('budget');

  const totalBudget = budgetByProject.reduce((s, p) => s + p.budget, 0);
  const totalDepense = budgetByProject.reduce((s, p) => s + p.depense, 0);
  const totalReste = budgetByProject.reduce((s, p) => s + p.reste, 0);

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">GESTION FINANCIÈRE & ACHATS</h1>
            <p className="text-white/50 text-xs mt-0.5">Budget · Trésorerie · Fournisseurs · Bons de commande</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white border border-white/20 px-3 py-1.5">
            <Download size={12} /> Export financier
          </button>
        </div>
      </div>

      <div className="page-content">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Budget total', value: `${(totalBudget / 1_000_000).toFixed(0)} M MAD`, color: NAVY, icon: <CreditCard size={15} /> },
            { label: 'Dépensé', value: `${(totalDepense / 1_000_000).toFixed(0)} M MAD`, color: ORANGE, icon: <TrendingUp size={15} /> },
            { label: 'Reste à dépenser', value: `${(totalReste / 1_000_000).toFixed(0)} M MAD`, color: totalReste < 30_000_000 ? RED : GREEN, icon: <AlertTriangle size={15} /> },
            { label: 'Taux consommation', value: `${Math.round((totalDepense / totalBudget) * 100)}%`, color: NAVY, icon: <CheckCircle size={15} /> },
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
              { id: 'budget', label: 'Budget vs Réalisé' },
              { id: 'tresorerie', label: 'Trésorerie' },
              { id: 'fournisseurs', label: 'Fournisseurs' },
              { id: 'achats', label: 'Bons de commande' },
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

          {activeTab === 'budget' && (
            <div className="p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Budget vs Réalisé par projet (M MAD)</h3>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={budgetByProject} barSize={20}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                        <XAxis dataKey="project" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `${(v / 1_000_000).toFixed(0)}M`} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(v: number) => `${(v / 1_000_000).toFixed(1)} M MAD`} />
                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                        <Bar dataKey="budget" name="Budget" fill={`${NAVY}40`} />
                        <Bar dataKey="depense" name="Dépensé" fill={NAVY} />
                        <Bar dataKey="reste" name="Reste" fill={GREEN} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">Résumé par projet</h3>
                  {budgetByProject.map(p => {
                    const pct = Math.round((p.depense / p.budget) * 100);
                    return (
                      <div key={p.project} className="mb-3 border border-corporate-border p-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-gray-800">{p.project}</span>
                          <span className={`badge ${pct > 90 ? 'badge-red' : pct > 75 ? 'badge-orange' : 'badge-green'}`}>{pct}% consommé</span>
                        </div>
                        <div className="progress-bar-track mb-1">
                          <div className="progress-bar-fill" style={{ width: `${pct}%`, background: pct > 90 ? RED : pct > 75 ? ORANGE : NAVY }} />
                        </div>
                        <div className="flex justify-between text-2xs text-corporate-muted">
                          <span>Dépensé: {(p.depense / 1_000_000).toFixed(1)} M</span>
                          <span>Budget: {(p.budget / 1_000_000).toFixed(1)} M</span>
                          <span style={{ color: p.reste < 15_000_000 ? RED : GREEN }}>Reste: {(p.reste / 1_000_000).toFixed(1)} M</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Catégorie</th>
                    <th>Description</th>
                    <th>Projet</th>
                    <th className="text-right">Budgété (MAD)</th>
                    <th className="text-right">Réalisé</th>
                    <th className="text-right">Engagé</th>
                    <th className="text-right">Écart</th>
                  </tr>
                </thead>
                <tbody>
                  {financialData.map(f => {
                    const ecart = f.actual - f.budgeted;
                    return (
                      <tr key={f.id}>
                        <td><span className="badge badge-blue">{f.category}</span></td>
                        <td className="text-sm">{f.description}</td>
                        <td className="text-xs text-corporate-muted">{f.project.split(' ').slice(0, 2).join(' ')}</td>
                        <td className="text-right text-xs font-mono">{fmt(f.budgeted)}</td>
                        <td className="text-right text-xs font-mono">{fmt(f.actual)}</td>
                        <td className="text-right text-xs font-mono">{fmt(f.committed)}</td>
                        <td className={`text-right text-xs font-semibold ${ecart > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {ecart > 0 ? '+' : ''}{fmt(ecart)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'tresorerie' && (
            <div className="p-4 space-y-4">
              <div className="grid md:grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Solde actuel', value: '14 700 000 MAD', color: GREEN },
                  { label: 'Entrées prévues 30j', value: '+22 000 000 MAD', color: NAVY },
                  { label: 'Sorties prévues 30j', value: '-18 500 000 MAD', color: RED },
                ].map(k => (
                  <div key={k.label} className="erp-card p-4">
                    <div className="text-base font-bold" style={{ color: k.color }}>{k.value}</div>
                    <div className="text-2xs text-corporate-muted mt-0.5">{k.label}</div>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Flux de trésorerie mensuel (MAD)</h3>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={treasuryData} barSize={16}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `${(v / 1_000_000).toFixed(0)}M`} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v: number) => `${fmt(v)} MAD`} />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="entrees" name="Entrées" fill={GREEN} />
                      <Bar dataKey="sorties" name="Sorties" fill={RED} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Évolution du solde (MAD)</h3>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={treasuryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `${(v / 1_000_000).toFixed(0)}M`} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v: number) => `${fmt(v)} MAD`} />
                      <Line type="monotone" dataKey="solde" name="Solde" stroke={NAVY} strokeWidth={2} dot={{ r: 3, fill: NAVY }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fournisseurs' && (
            <div>
              <div className="p-4 border-b border-corporate-border flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800">Registre des fournisseurs</span>
                <button className="erp-btn-primary flex items-center gap-1.5 text-xs py-1.5">
                  <Plus size={12} /> Nouveau fournisseur
                </button>
              </div>
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Fournisseur</th>
                    <th>Catégorie</th>
                    <th className="text-right">Engagement total</th>
                    <th className="text-right">Facturé</th>
                    <th className="text-right">Solde restant</th>
                    <th>Consommation</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map(s => {
                    const pct = Math.round((s.facture / s.engagement) * 100);
                    return (
                      <tr key={s.name}>
                        <td className="font-medium">{s.name}</td>
                        <td><span className="badge badge-blue">{s.category}</span></td>
                        <td className="text-right text-xs font-mono">{fmt(s.engagement)}</td>
                        <td className="text-right text-xs font-mono">{fmt(s.facture)}</td>
                        <td className="text-right text-xs font-mono">{fmt(s.solde)}</td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <div className="w-14 bg-gray-100 h-1.5">
                              <div className="h-1.5" style={{ width: `${pct}%`, background: pct > 80 ? ORANGE : NAVY }} />
                            </div>
                            <span className="text-2xs">{pct}%</span>
                          </div>
                        </td>
                        <td><span className={`badge ${s.status === 'Actif' ? 'badge-green' : 'badge-gray'}`}>{s.status}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'achats' && (
            <div>
              <div className="p-4 border-b border-corporate-border flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800">Bons de commande</span>
                <button className="erp-btn-primary flex items-center gap-1.5 text-xs py-1.5">
                  <Plus size={12} /> Nouveau bon de commande
                </button>
              </div>
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Référence</th>
                    <th>Fournisseur</th>
                    <th>Description</th>
                    <th className="text-right">Montant (MAD)</th>
                    <th>Date émission</th>
                    <th>Livraison prévue</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map(po => (
                    <tr key={po.ref}>
                      <td className="font-mono text-xs font-medium" style={{ color: NAVY }}>{po.ref}</td>
                      <td className="text-sm">{po.supplier}</td>
                      <td className="text-xs text-corporate-muted">{po.description}</td>
                      <td className="text-right font-semibold text-xs">{fmt(po.amount)}</td>
                      <td className="text-xs">{po.date}</td>
                      <td className="text-xs">{po.delivery}</td>
                      <td><span className={orderStatusBadge(po.status)}>{po.status}</span></td>
                      <td>
                        <div className="flex items-center gap-2">
                          {po.status === 'En attente' && (
                            <button className="text-xs text-green-600 hover:underline">Approuver</button>
                          )}
                          <button className="text-xs text-navy hover:underline" style={{ color: NAVY }}>Voir</button>
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
