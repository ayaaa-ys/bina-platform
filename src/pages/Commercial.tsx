import React, { useState, useMemo } from 'react';
import { apartments, getKPIs, salesByMonth } from '../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { Search, Filter, Download, TrendingUp } from 'lucide-react';

const NAVY = '#4B5563';
const GREEN = '#27AE60';
const ORANGE = '#E67E22';
const RED = '#E74C3C';
const BLUE = '#2980B9';

const fmt = (n: number) => new Intl.NumberFormat('fr-MA').format(n);
const statusStyle = (s: string) => {
  if (s === 'Vendu') return 'badge-green';
  if (s === 'Réservé') return 'badge-orange';
  if (s === 'Disponible') return 'badge-blue';
  return 'badge-gray';
};

export default function CommercialPage() {
  const [projectFilter, setProjectFilter] = useState('all');
  const [buildingFilter, setBuildingFilter] = useState('all');
  const [typoFilter, setTypoFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const kpis = getKPIs();

  const projects = Array.from(new Set(apartments.map(a => a.project)));
  const buildings = useMemo(() => {
    const base = projectFilter === 'all' ? apartments : apartments.filter(a => a.project === projectFilter);
    return Array.from(new Set(base.map(a => a.building)));
  }, [projectFilter]);
  const typologies = Array.from(new Set(apartments.map(a => a.typology)));

  const filtered = useMemo(() => {
    return apartments.filter(a => {
      if (projectFilter !== 'all' && a.project !== projectFilter) return false;
      if (buildingFilter !== 'all' && a.building !== buildingFilter) return false;
      if (typoFilter !== 'all' && a.typology !== typoFilter) return false;
      if (statusFilter !== 'all' && a.status !== statusFilter) return false;
      if (search && !a.ref.toLowerCase().includes(search.toLowerCase()) &&
          !a.client?.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [projectFilter, buildingFilter, typoFilter, statusFilter, search]);

  const filteredKpis = {
    total: filtered.length,
    sold: filtered.filter(a => a.status === 'Vendu').length,
    reserved: filtered.filter(a => a.status === 'Réservé').length,
    available: filtered.filter(a => a.status === 'Disponible').length,
    ca: filtered.filter(a => a.status === 'Vendu').reduce((s, a) => s + a.prixMAD, 0),
    engaged: filtered.filter(a => a.status === 'Réservé').reduce((s, a) => s + a.prixMAD, 0),
  };

  const statusDist = [
    { name: 'Vendu', value: filteredKpis.sold, color: GREEN },
    { name: 'Réservé', value: filteredKpis.reserved, color: ORANGE },
    { name: 'Disponible', value: filteredKpis.available, color: BLUE },
  ].filter(s => s.value > 0);

  const typoDist = typologies.map(t => ({
    name: t,
    Vendus: filtered.filter(a => a.typology === t && a.status === 'Vendu').length,
    Réservés: filtered.filter(a => a.typology === t && a.status === 'Réservé').length,
    Disponibles: filtered.filter(a => a.typology === t && a.status === 'Disponible').length,
  })).filter(t => t.Vendus + t.Réservés + t.Disponibles > 0);

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">PILOTAGE COMMERCIAL</h1>
            <p className="text-white/50 text-xs mt-0.5">Inventaire & suivi des ventes — Synthese_Ventes_Dashboard.xlsx</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white border border-white/20 px-3 py-1.5">
            <Download size={12} /> Exporter Excel
          </button>
        </div>
      </div>

      <div className="page-content">
        {/* KPI Row */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[
            { label: 'Total', value: filteredKpis.total, color: NAVY },
            { label: 'Vendus', value: filteredKpis.sold, color: GREEN },
            { label: 'Réservés', value: filteredKpis.reserved, color: ORANGE },
            { label: 'Disponibles', value: filteredKpis.available, color: BLUE },
            { label: 'CA Réalisé', value: `${(filteredKpis.ca / 1_000_000).toFixed(1)}M`, color: GREEN },
            { label: 'CA Engagé', value: `${(filteredKpis.engaged / 1_000_000).toFixed(1)}M`, color: ORANGE },
          ].map(k => (
            <div key={k.label} className="erp-card p-3 text-center">
              <div className="text-lg font-bold" style={{ color: k.color }}>{k.value}</div>
              <div className="text-2xs text-corporate-muted uppercase tracking-wide mt-0.5">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="erp-card">
            <div className="erp-section-header">
              <span className="erp-section-title">Statut des unités</span>
            </div>
            <div className="p-4 h-44 flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height={100}>
                <PieChart>
                  <Pie data={statusDist} cx="50%" cy="50%" innerRadius={28} outerRadius={45} paddingAngle={2} dataKey="value">
                    {statusDist.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v} unités`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 mt-2">
                {statusDist.map(s => (
                  <div key={s.name} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-2xs">{s.name}: <strong>{s.value}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 erp-card">
            <div className="erp-section-header">
              <span className="erp-section-title">Par typologie</span>
            </div>
            <div className="p-4 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typoDist} barSize={14}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#7F8C8D' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: '#7F8C8D' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="Vendus" fill={GREEN} stackId="a" />
                  <Bar dataKey="Réservés" fill={ORANGE} stackId="a" />
                  <Bar dataKey="Disponibles" fill={BLUE} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <div className="relative flex-1 min-w-48">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-corporate-muted" />
            <input
              type="text"
              placeholder="Rechercher par réf. ou client..."
              className="erp-input pl-8 py-1.5"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="erp-input py-1.5 w-auto min-w-40" value={projectFilter} onChange={e => { setProjectFilter(e.target.value); setBuildingFilter('all'); }}>
            <option value="all">Tous les projets</option>
            {projects.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select className="erp-input py-1.5 w-auto min-w-32" value={buildingFilter} onChange={e => setBuildingFilter(e.target.value)}>
            <option value="all">Tous les bâtiments</option>
            {buildings.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <select className="erp-input py-1.5 w-auto min-w-28" value={typoFilter} onChange={e => setTypoFilter(e.target.value)}>
            <option value="all">Toutes typologies</option>
            {typologies.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select className="erp-input py-1.5 w-auto min-w-28" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">Tous statuts</option>
            <option value="Disponible">Disponible</option>
            <option value="Réservé">Réservé</option>
            <option value="Vendu">Vendu</option>
          </select>
          <span className="text-xs text-corporate-muted ml-auto">{filtered.length} résultat(s)</span>
        </div>

        {/* Inventory Table */}
        <div className="erp-card overflow-hidden">
          <div className="erp-section-header">
            <span className="erp-section-title">Inventaire des unités</span>
            <span className="badge badge-blue">{filtered.length} unités</span>
          </div>
          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Réf.</th>
                  <th>Projet</th>
                  <th>Bâtiment</th>
                  <th>Ét.</th>
                  <th>Typologie</th>
                  <th>Surface (m²)</th>
                  <th>Terrasse (m²)</th>
                  <th>Prix MAD</th>
                  <th>Statut</th>
                  <th>Client</th>
                  <th>Date rés.</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(apt => (
                  <tr key={apt.id}>
                    <td className="font-mono text-xs font-medium text-navy" style={{ color: NAVY }}>{apt.ref}</td>
                    <td className="max-w-32 truncate text-xs">{apt.project}</td>
                    <td className="text-xs">{apt.building}</td>
                    <td className="text-center text-xs">{apt.floor === 0 ? 'RDC' : `R+${apt.floor}`}</td>
                    <td><span className="badge badge-blue">{apt.typology}</span></td>
                    <td className="text-right font-medium">{apt.surface.toFixed(1)}</td>
                    <td className="text-right">{apt.terrasse > 0 ? apt.terrasse.toFixed(1) : '—'}</td>
                    <td className="text-right font-semibold">{fmt(apt.prixMAD)}</td>
                    <td><span className={statusStyle(apt.status)}>{apt.status}</span></td>
                    <td className="text-xs text-corporate-muted">{apt.client || '—'}</td>
                    <td className="text-xs text-corporate-muted">{apt.dateReservation || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-corporate-muted text-sm">
              Aucune unité ne correspond aux filtres sélectionnés.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
