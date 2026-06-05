import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, User, Bell, Shield, Database, Building2, Save, Eye, EyeOff } from 'lucide-react';

export default function SettingsPage() {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'platform' | 'users'>('profile');
  const [showPwd, setShowPwd] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="text-base font-bold text-white tracking-wide">PARAMÈTRES</h1>
        <p className="text-white/50 text-xs mt-0.5">Profil · Notifications · Sécurité · Configuration plateforme</p>
      </div>

      <div className="page-content">
        <div className="grid md:grid-cols-5 gap-4">
          {/* Sidebar */}
          <div className="erp-card overflow-hidden">
            {[
              { id: 'profile', label: 'Mon profil', icon: <User size={14} /> },
              { id: 'notifications', label: 'Notifications', icon: <Bell size={14} /> },
              { id: 'security', label: 'Sécurité', icon: <Shield size={14} /> },
              { id: 'platform', label: 'Plateforme', icon: <Building2 size={14} /> },
              { id: 'users', label: 'Utilisateurs', icon: <User size={14} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`w-full flex items-center gap-2.5 px-4 py-3 border-b border-corporate-border text-left text-sm transition-colors ${
                  activeTab === tab.id ? 'bg-blue-50 text-navy font-semibold' : 'text-gray-700 hover:bg-corporate-gray'
                }`}
                style={{ color: activeTab === tab.id ? '#4B5563' : undefined }}
              >
                <span style={{ color: activeTab === tab.id ? '#4B5563' : '#7F8C8D' }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="md:col-span-4 erp-card">
            {activeTab === 'profile' && (
              <div>
                <div className="erp-section-header">
                  <span className="erp-section-title">Mon profil</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-corporate-gray border border-corporate-border">
                    <div className="w-14 h-14 flex items-center justify-center text-white text-xl font-bold flex-shrink-0" style={{ background: '#4B5563' }}>
                      {currentUser?.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900">{currentUser?.fullName}</p>
                      <p className="text-sm text-corporate-muted">{currentUser?.role}</p>
                      <p className="text-xs text-corporate-muted">{currentUser?.email}</p>
                    </div>
                    <button className="ml-auto erp-btn-secondary text-xs py-1.5">
                      Changer photo
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="erp-label">Nom complet</label>
                      <input type="text" className="erp-input" defaultValue={currentUser?.fullName} />
                    </div>
                    <div>
                      <label className="erp-label">Email</label>
                      <input type="email" className="erp-input" defaultValue={currentUser?.email} />
                    </div>
                    <div>
                      <label className="erp-label">Fonction</label>
                      <input type="text" className="erp-input" defaultValue={currentUser?.role} />
                    </div>
                    <div>
                      <label className="erp-label">Téléphone</label>
                      <input type="tel" className="erp-input" placeholder="+212 6 00 00 00 00" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="erp-label">Biographie courte</label>
                      <textarea className="erp-input resize-none" rows={2} placeholder="Description de votre rôle..." />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleSave} className="erp-btn-primary flex items-center gap-1.5">
                      <Save size={13} /> {saved ? 'Sauvegardé ✓' : 'Sauvegarder'}
                    </button>
                    <button className="erp-btn-secondary">Annuler</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <div className="erp-section-header">
                  <span className="erp-section-title">Préférences de notifications</span>
                </div>
                <div className="p-5 space-y-4">
                  {[
                    { group: 'Chantier', items: ['Nouvelle observation', 'Retard de phase', 'Rapport hebdomadaire chantier'] },
                    { group: 'Commercial', items: ['Nouvelle réservation', 'Vente confirmée', 'Alerte stock faible'] },
                    { group: 'Finance', items: ['Dépassement budget', 'Bon de commande en attente', 'Appel de fonds'] },
                    { group: 'Documents', items: ['Document soumis pour validation', 'Document rejeté', 'Nouveau document partagé'] },
                  ].map(g => (
                    <div key={g.group} className="border border-corporate-border p-4">
                      <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">{g.group}</h4>
                      <div className="space-y-2">
                        {g.items.map(item => (
                          <div key={item} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{item}</span>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-1.5 text-xs text-corporate-muted cursor-pointer">
                                <input type="checkbox" defaultChecked className="w-3 h-3" />
                                Email
                              </label>
                              <label className="flex items-center gap-1.5 text-xs text-corporate-muted cursor-pointer">
                                <input type="checkbox" defaultChecked className="w-3 h-3" />
                                Plateforme
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={handleSave} className="erp-btn-primary flex items-center gap-1.5">
                    <Save size={13} /> {saved ? 'Sauvegardé ✓' : 'Sauvegarder'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <div className="erp-section-header">
                  <span className="erp-section-title">Sécurité du compte</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="border border-corporate-border p-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-4">Changer le mot de passe</h4>
                    <div className="space-y-3 max-w-md">
                      <div>
                        <label className="erp-label">Mot de passe actuel</label>
                        <div className="relative">
                          <input type={showPwd ? 'text' : 'password'} className="erp-input pr-10" placeholder="••••••••" />
                          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowPwd(!showPwd)}>
                            {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="erp-label">Nouveau mot de passe</label>
                        <input type="password" className="erp-input" placeholder="Min. 8 caractères" />
                      </div>
                      <div>
                        <label className="erp-label">Confirmer nouveau mot de passe</label>
                        <input type="password" className="erp-input" placeholder="Répéter le mot de passe" />
                      </div>
                      <button className="erp-btn-primary text-sm">Mettre à jour le mot de passe</button>
                    </div>
                  </div>
                  <div className="border border-corporate-border p-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Sessions actives</h4>
                    <div className="space-y-2">
                      {[
                        { device: 'Chrome · Windows 11', ip: '105.158.XX.XX', location: 'Casablanca, MA', current: true },
                        { device: 'Safari · iPhone 15', ip: '105.158.XX.YY', location: 'Casablanca, MA', current: false },
                      ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-corporate-border last:border-0">
                          <div>
                            <p className="text-sm text-gray-800">{s.device}</p>
                            <p className="text-2xs text-corporate-muted">{s.ip} · {s.location}</p>
                          </div>
                          {s.current ? (
                            <span className="badge badge-green">Session actuelle</span>
                          ) : (
                            <button className="text-xs text-red-600 hover:underline">Déconnecter</button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'platform' && (
              <div>
                <div className="erp-section-header">
                  <span className="erp-section-title">Configuration plateforme</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="erp-label">Nom de la société</label>
                      <input type="text" className="erp-input" defaultValue="Valoris Real Estate" />
                    </div>
                    <div>
                      <label className="erp-label">Siège social</label>
                      <input type="text" className="erp-input" defaultValue="Casablanca, Maroc" />
                    </div>
                    <div>
                      <label className="erp-label">Devise par défaut</label>
                      <select className="erp-input">
                        <option>MAD — Dirham Marocain</option>
                        <option>EUR — Euro</option>
                        <option>USD — Dollar US</option>
                      </select>
                    </div>
                    <div>
                      <label className="erp-label">Langue interface</label>
                      <select className="erp-input">
                        <option>Français</option>
                        <option>Arabe</option>
                        <option>English</option>
                      </select>
                    </div>
                    <div>
                      <label className="erp-label">Format de date</label>
                      <select className="erp-input">
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="erp-label">Exercice fiscal</label>
                      <select className="erp-input">
                        <option>Janvier — Décembre</option>
                        <option>Juillet — Juin</option>
                      </select>
                    </div>
                  </div>
                  <div className="border border-corporate-border p-4">
                    <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Intégrations</h4>
                    <div className="space-y-2">
                      {[
                        { name: 'Synthese_Ventes_Dashboard.xlsx', type: 'Excel', status: 'Connecté', desc: 'Source données commerciales' },
                        { name: 'Supabase Database', type: 'Base de données', status: 'Connecté', desc: 'Stockage persistant' },
                      ].map(s => (
                        <div key={s.name} className="flex items-center justify-between py-2 border-b border-corporate-border last:border-0">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{s.name}</p>
                            <p className="text-2xs text-corporate-muted">{s.desc} · {s.type}</p>
                          </div>
                          <span className="badge badge-green">{s.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={handleSave} className="erp-btn-primary flex items-center gap-1.5">
                    <Save size={13} /> {saved ? 'Sauvegardé ✓' : 'Sauvegarder la configuration'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="erp-section-header">
                  <span className="erp-section-title">Gestion des utilisateurs</span>
                </div>
                <div className="p-4">
                  <table className="erp-table">
                    <thead>
                      <tr>
                        <th>Utilisateur</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        <th>Créé le</th>
                        <th>Statut</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Administrateur Système', email: 'admin@valoris.ma', role: 'Directeur', date: '2024-01-01', active: true },
                        { name: 'Abdelatif Aouragh', email: 'direction@valoris.ma', role: 'PDG', date: '2024-01-01', active: true },
                        { name: 'Équipe Commerciale', email: 'commercial@valoris.ma', role: 'Responsable Commercial', date: '2024-01-01', active: true },
                      ].map((u, i) => (
                        <tr key={i}>
                          <td>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 flex items-center justify-center text-white text-2xs font-bold flex-shrink-0" style={{ background: '#4B5563' }}>
                                {u.name.charAt(0)}
                              </div>
                              <span className="font-medium text-sm">{u.name}</span>
                            </div>
                          </td>
                          <td className="text-xs text-corporate-muted">{u.email}</td>
                          <td><span className="badge badge-blue">{u.role}</span></td>
                          <td className="text-xs">{u.date}</td>
                          <td><span className="badge badge-green">Actif</span></td>
                          <td>
                            <div className="flex gap-2">
                              <button className="text-xs text-navy hover:underline" style={{ color: '#4B5563' }}>Modifier</button>
                              {i > 0 && <button className="text-xs text-red-600 hover:underline">Désactiver</button>}
                            </div>
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
    </div>
  );
}
