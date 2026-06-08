import React, { useState } from 'react';
import { Camera, Upload, BarChart2, Map, Layers, ArrowUpDown, Calendar, Eye } from 'lucide-react';

const NAVY = '#4B5563';

const droneMissions = [
  { id: 1, date: '2024-07-22', project: 'Urban Grove by Sky Park', pilot: 'Drone Tech Maroc', type: 'Orthophoto + MNS', altitude: '120m', coverage: '1.2 ha', status: 'Traité', files: 847 },
  { id: 2, date: '2024-07-15', project: 'Sky Garden', pilot: 'AeroPhoV Maroc', type: 'Orthophoto + Nuage de points', altitude: '100m', coverage: '0.8 ha', status: 'Traité', files: 1243 },
  { id: 3, date: '2024-07-08', project: 'Urban Grove by Sky Park', pilot: 'Drone Tech Maroc', type: 'Inspection façades', altitude: '30m', coverage: '0.4 ha', status: 'En cours de traitement', files: 612 },
  { id: 4, date: '2024-07-01', project: 'Résidence Panorama', pilot: 'AeroPhoV Maroc', type: 'Orthophoto + VRD', altitude: '80m', coverage: '2.1 ha', status: 'Traité', files: 956 },
  { id: 5, date: '2024-06-24', project: 'Sky Garden', pilot: 'Drone Tech Maroc', type: 'Topographie initiale', altitude: '150m', coverage: '0.9 ha', status: 'Archivé', files: 782 },
];

const volumetricData = [
  { zone: 'Zone A — Terrassement', volumeExcave: 12450, volumeRemblai: 3200, diff: -9250 },
  { zone: 'Zone B — Fondations', volumeExcave: 8720, volumeRemblai: 7100, diff: -1620 },
  { zone: 'Zone C — Parking souterrain', volumeExcave: 15800, volumeRemblai: 0, diff: -15800 },
  { zone: 'Zone D — Espaces verts', volumeExcave: 2100, volumeRemblai: 1850, diff: -250 },
];

export default function DronePage() {
  const [activeTab, setActiveTab] = useState<'missions' | 'ortho' | 'volumetrie' | 'comparaison'>('missions');

  return (
    <div>
      <div className="page-header" style={{ background: '#0a1628' }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">SUIVI DRONE & PHOTOGRAMMÉTRIE</h1>
            <p className="text-white/50 text-xs mt-0.5">Missions aériennes · Orthophotos · Analyse volumétrique</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              3 projets sous surveillance
            </span>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Missions réalisées', value: '18', sub: 'Depuis démarrage', icon: <Camera size={15} />, color: '#3498DB' },
            { label: 'Orthophotos disponibles', value: '12', sub: 'Haute résolution', icon: <Map size={15} />, color: NAVY },
            { label: 'Vol planifié', value: '2024-07-29', sub: 'Prochaine mission', icon: <Calendar size={15} />, color: '#E67E22' },
            { label: 'Surface totale couverte', value: '5.0 ha', sub: '3 projets confondus', icon: <Layers size={15} />, color: '#27AE60' },
          ].map(k => (
            <div key={k.label} className="erp-card p-4 flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: `${k.color}15`, color: k.color }}>
                {k.icon}
              </div>
              <div>
                <div className="text-lg font-bold" style={{ color: '#111827' }}>{k.value}</div>
                <div className="text-2xs text-corporate-muted uppercase tracking-wide">{k.label}</div>
                <div className="text-2xs text-corporate-muted">{k.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="erp-card overflow-hidden">
          <div className="flex border-b border-corporate-border bg-white px-4">
            {[
              { id: 'missions', label: 'Missions' },
              { id: 'ortho', label: 'Orthophotos' },
              { id: 'volumetrie', label: 'Volumétrie' },
              { id: 'comparaison', label: 'Comparaison avant/après' },
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

          {activeTab === 'missions' && (
            <div>
              <div className="p-4 border-b border-corporate-border flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800">Journal des missions drone</span>
                <button className="erp-btn-primary flex items-center gap-1.5 text-xs py-1.5">
                  <Camera size={12} /> Planifier une mission
                </button>
              </div>
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Projet</th>
                    <th>Pilote</th>
                    <th>Type de mission</th>
                    <th>Altitude</th>
                    <th>Superficie</th>
                    <th>Fichiers</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {droneMissions.map(m => (
                    <tr key={m.id}>
                      <td className="font-mono text-xs">{m.date}</td>
                      <td className="text-xs">{m.project.split(' ').slice(0, 2).join(' ')}</td>
                      <td className="text-xs text-corporate-muted">{m.pilot}</td>
                      <td className="text-xs">{m.type}</td>
                      <td className="text-xs text-center">{m.altitude}</td>
                      <td className="text-xs text-center">{m.coverage}</td>
                      <td className="text-xs text-center">{m.files}</td>
                      <td>
                        <span className={`badge ${m.status === 'Traité' ? 'badge-green' : m.status === 'En cours de traitement' ? 'badge-orange' : 'badge-gray'}`}>
                          {m.status}
                        </span>
                      </td>
                      <td>
                        <button className="text-xs text-navy hover:underline flex items-center gap-1" style={{ color: NAVY }}>
                          <Eye size={10} /> Voir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'ortho' && (
            <div className="p-4">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { project: 'Urban Grove by Sky Park', date: '2024-07-22', res: '3 cm/px', image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop' },
                  { project: 'Sky Garden', date: '2024-07-15', res: '2.5 cm/px', image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop' },
                  { project: 'Résidence Panorama', date: '2024-07-01', res: '4 cm/px', image: 'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop' },
                ].map(ortho => (
                  <div key={ortho.project} className="erp-card overflow-hidden">
                    <div className="relative">
                      <img src={ortho.image} alt={ortho.project} className="w-full h-40 object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="text-white text-xs bg-black/50 px-3 py-1">Photo chantier réelle</span>
                      </div>
                      <button className="absolute bottom-2 right-2 bg-white text-xs px-2 py-1 flex items-center gap-1" style={{ color: NAVY }}>
                        <Eye size={11} /> Plein écran
                      </button>
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold text-gray-800">{ortho.project}</p>
                      <p className="text-2xs text-corporate-muted mt-0.5">{ortho.date} · Résolution: {ortho.res}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="erp-card p-4 border-2 border-dashed border-corporate-border flex flex-col items-center justify-center h-28 cursor-pointer hover:border-navy transition-colors">
                  <Upload size={20} className="text-corporate-muted mb-2" />
                  <p className="text-sm text-corporate-muted">Importer une nouvelle orthophoto</p>
                  <p className="text-2xs text-corporate-muted mt-1">Formats: GeoTIFF, JPEG2000, PNG · Max 2 GB</p>
                </div>
                <div className="erp-card p-4 mt-3">
                  <p className="text-xs font-semibold text-gray-800">Exemples de rapports PDF réels</p>
                  <p className="text-2xs text-corporate-muted mt-1">Liens de démonstration pour les rapports de mission et de suivi chantier.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href="https://file-examples.com/storage/fe3d6c64be7742b12afdb789/2017/10/file-sample_150kB.pdf" target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Rapport de mission · 150 kB</a>
                    <a href="https://file-examples.com/storage/fe3d6c64be7742b12afdb789/2017/10/file-sample_500kB.pdf" target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Suivi chantier · 500 kB</a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'volumetrie' && (
            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Analyse volumétrique — Urban Grove by Sky Park</h3>
                <p className="text-xs text-corporate-muted">Calcul automatique des volumes excavés et remblayés par comparaison MNT</p>
              </div>
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Zone</th>
                    <th className="text-right">Volume excavé (m³)</th>
                    <th className="text-right">Volume remblai (m³)</th>
                    <th className="text-right">Différentiel</th>
                    <th>Indication</th>
                  </tr>
                </thead>
                <tbody>
                  {volumetricData.map((v, i) => (
                    <tr key={i}>
                      <td className="font-medium">{v.zone}</td>
                      <td className="text-right font-mono">{v.volumeExcave.toLocaleString()}</td>
                      <td className="text-right font-mono">{v.volumeRemblai.toLocaleString()}</td>
                      <td className="text-right font-mono font-bold text-red-600">{v.diff.toLocaleString()}</td>
                      <td>
                        <div className="w-full bg-gray-100 h-1.5 max-w-24">
                          <div className="h-1.5 bg-navy" style={{ width: `${Math.min(100, (v.volumeExcave / 20000) * 100)}%`, background: NAVY }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-gray-50">
                    <td>TOTAL</td>
                    <td className="text-right font-mono">{volumetricData.reduce((s, v) => s + v.volumeExcave, 0).toLocaleString()}</td>
                    <td className="text-right font-mono">{volumetricData.reduce((s, v) => s + v.volumeRemblai, 0).toLocaleString()}</td>
                    <td className="text-right font-mono text-red-600">{volumetricData.reduce((s, v) => s + v.diff, 0).toLocaleString()}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 grid md:grid-cols-3 gap-3">
                {[
                  { label: 'Volume total excavé', value: '39 070 m³', color: '#E74C3C' },
                  { label: 'Volume total remblayé', value: '12 150 m³', color: '#27AE60' },
                  { label: 'Excédent à évacuer', value: '26 920 m³', color: '#E67E22' },
                ].map(s => (
                  <div key={s.label} className="erp-card p-3">
                    <div className="text-base font-bold" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-2xs text-corporate-muted mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'comparaison' && (
            <div className="p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex-1">
                  <label className="erp-label">Date 1 (référence)</label>
                  <input type="date" defaultValue="2024-01-15" className="erp-input" />
                </div>
                <div className="flex items-center mt-4 text-corporate-muted">
                  <ArrowUpDown size={16} />
                </div>
                <div className="flex-1">
                  <label className="erp-label">Date 2 (comparaison)</label>
                  <input type="date" defaultValue="2024-07-22" className="erp-input" />
                </div>
                <div className="flex-1">
                  <label className="erp-label">Projet</label>
                  <select className="erp-input">
                    <option>Urban Grove by Sky Park</option>
                    <option>Sky Garden</option>
                    <option>Résidence Panorama</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="erp-card overflow-hidden">
                  <div className="bg-gray-100 px-3 py-1.5 border-b border-corporate-border">
                    <span className="text-xs font-bold text-gray-600">AVANT — Janvier 2024</span>
                  </div>
                  <div className="relative">
                    <img
                      src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop"
                      alt="Avant"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="text-white text-xs bg-black/50 px-2 py-1">Vue ortho simulée</span>
                    </div>
                  </div>
                </div>
                <div className="erp-card overflow-hidden">
                  <div className="px-3 py-1.5 border-b border-corporate-border" style={{ background: `${NAVY}15` }}>
                    <span className="text-xs font-bold" style={{ color: NAVY }}>APRÈS — Juillet 2024</span>
                  </div>
                  <div className="relative">
                    <img
                      src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop"
                      alt="Après"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="text-white text-xs bg-black/50 px-2 py-1">Vue ortho simulée</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 erp-card p-3 flex gap-6">
                {[
                  { label: 'Progression visible', value: '+34%', color: '#27AE60' },
                  { label: 'Volume terrassé', value: '12 450 m³', color: NAVY },
                  { label: 'Superficie construite', value: '1 800 m²', color: '#2980B9' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="text-base font-bold" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-2xs text-corporate-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
