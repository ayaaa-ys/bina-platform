import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, EyeOff, Building2, MapPin, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login, register } = useApp();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [loginForm, setLoginForm] = useState({ username: '', password: '', remember: false });
  const [regForm, setRegForm] = useState({ fullName: '', email: '', role: '', password: '', confirmPassword: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = login(loginForm.username, loginForm.password);
    if (!ok) setError('Identifiant ou mot de passe incorrect.');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!regForm.fullName || !regForm.email || !regForm.role || !regForm.password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (regForm.password !== regForm.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (regForm.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    const ok = register(regForm.fullName, regForm.email, regForm.role, regForm.password);
    if (ok) {
      setSuccess('Compte créé avec succès. Vous pouvez vous connecter.');
      setTab('login');
      setLoginForm({ ...loginForm, username: regForm.email });
    } else {
      setError('Cet email est déjà utilisé.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE — Corporate Visual */}
      <div
        className="hidden lg:flex flex-col w-[54%] relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #111827 0%, #4B5563 60%, #111827 100%)' }}
      >
        {/* Background architectural lines */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>

        {/* Building silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-10">
          <svg viewBox="0 0 800 300" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="80" width="80" height="220" fill="white"/>
            <rect x="70" y="60" width="40" height="240" fill="white"/>
            <rect x="180" y="40" width="100" height="260" fill="white"/>
            <rect x="200" y="20" width="60" height="280" fill="white"/>
            <rect x="330" y="100" width="70" height="200" fill="white"/>
            <rect x="450" y="30" width="120" height="270" fill="white"/>
            <rect x="480" y="10" width="60" height="290" fill="white"/>
            <rect x="620" y="60" width="90" height="240" fill="white"/>
            <rect x="640" y="40" width="50" height="260" fill="white"/>
            <rect x="740" y="90" width="60" height="210" fill="white"/>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col h-full px-14 py-12">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-auto">
            <div className="w-10 h-10 bg-white flex items-center justify-center">
              <Building2 size={22} className="text-navy" style={{ color: '#4B5563' }} />
            </div>
            <div>
              <div className="text-white font-bold text-xl tracking-widest">BINA</div>
              <div className="text-white/50 text-2xs tracking-widest uppercase">Platform</div>
            </div>
          </div>

          {/* Main content */}
          <div className="mb-auto py-16">
            <div className="flex items-center gap-2 mb-6">
              <MapPin size={14} className="text-white/60" />
              <span className="text-white/60 text-xs tracking-widest uppercase">Casablanca, Maroc</span>
            </div>
            <h1 className="text-white text-4xl font-light leading-tight mb-3 tracking-tight">
              BIENVENUE SUR<br />
              <span className="font-bold">BINA PLATFORM</span>
            </h1>
            <div className="w-16 h-0.5 bg-white/30 my-4" />
            <p className="text-white/70 text-lg font-light mb-2 tracking-wide">
              VOTRE PORTAIL IMMOBILIER COMPACT
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-md mt-4">
              Explorez vos projets, suivez vos chantiers et accédez à vos ressources depuis un espace de pilotage unifié conçu pour les professionnels de l'immobilier.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            {[
              { label: '3 Projets', sub: 'En cours' },
              { label: '40 Unités', sub: 'En commercialisation' },
              { label: '11 Modules', sub: 'Opérationnels' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-white text-lg font-bold">{item.label}</div>
                <div className="text-white/40 text-xs mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-white/10">
            <p className="text-white/30 text-2xs tracking-widest uppercase">
              © 2024 Valoris Real Estate — Tous droits réservés
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — Auth Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Building2 size={20} style={{ color: '#4B5563' }} />
            <span className="font-bold text-navy" style={{ color: '#4B5563' }}>BINA PLATFORM</span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {tab === 'login' ? 'Connexion' : 'Créer un compte'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {tab === 'login' ? 'Accédez à votre espace de gestion.' : 'Rejoignez la plateforme Valoris.'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            {[
              { id: 'login', label: 'CONNEXION' },
              { id: 'register', label: 'INSCRIPTION' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id as 'login' | 'register'); setError(''); setSuccess(''); }}
                className={`flex-1 pb-2 text-xs font-bold tracking-wider transition-colors ${
                  tab === t.id
                    ? 'border-b-2 text-navy border-navy'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                style={{ borderColor: tab === t.id ? '#4B5563' : 'transparent', color: tab === t.id ? '#4B5563' : undefined }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Error / Success */}
          {error && (
            <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 text-red-700 text-xs">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 px-3 py-2 bg-green-50 border border-green-200 text-green-700 text-xs">
              {success}
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="erp-label">Identifiant ou Email</label>
                <input
                  type="text"
                  className="erp-input"
                  placeholder="admin ou email@valoris.ma"
                  value={loginForm.username}
                  onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="erp-label">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    className="erp-input pr-10"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPwd(!showPwd)}
                  >
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={loginForm.remember}
                    onChange={e => setLoginForm({ ...loginForm, remember: e.target.checked })}
                    className="w-3 h-3"
                  />
                  <span className="text-xs text-gray-500">Se souvenir de moi</span>
                </label>
                <button type="button" className="text-xs text-navy hover:underline" style={{ color: '#4B5563' }}>
                  Mot de passe oublié ?
                </button>
              </div>
              <button
                type="submit"
                className="w-full erp-btn-primary flex items-center justify-center gap-2 py-2.5 mt-2"
              >
                SE CONNECTER
                <ArrowRight size={14} />
              </button>
              <p className="text-2xs text-center text-gray-400 mt-4">
                Compte démo — identifiant: <strong>admin</strong> / mot de passe: <strong>admin</strong>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="erp-label">Nom complet</label>
                <input
                  type="text"
                  className="erp-input"
                  placeholder="Prénom Nom"
                  value={regForm.fullName}
                  onChange={e => setRegForm({ ...regForm, fullName: e.target.value })}
                />
              </div>
              <div>
                <label className="erp-label">Email professionnel</label>
                <input
                  type="email"
                  className="erp-input"
                  placeholder="email@valoris.ma"
                  value={regForm.email}
                  onChange={e => setRegForm({ ...regForm, email: e.target.value })}
                />
              </div>
              <div>
                <label className="erp-label">Fonction</label>
                <select
                  className="erp-input"
                  value={regForm.role}
                  onChange={e => setRegForm({ ...regForm, role: e.target.value })}
                >
                  <option value="">Sélectionner...</option>
                  <option>Directeur de Projet</option>
                  <option>Responsable Commercial</option>
                  <option>Conducteur de Travaux</option>
                  <option>Responsable Financier</option>
                  <option>Chargé d'Affaires</option>
                  <option>Investisseur</option>
                  <option>Consultant</option>
                </select>
              </div>
              <div>
                <label className="erp-label">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showRegPwd ? 'text' : 'password'}
                    className="erp-input pr-10"
                    placeholder="Min. 6 caractères"
                    value={regForm.password}
                    onChange={e => setRegForm({ ...regForm, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowRegPwd(!showRegPwd)}
                  >
                    {showRegPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="erp-label">Confirmation mot de passe</label>
                <input
                  type="password"
                  className="erp-input"
                  placeholder="Répéter le mot de passe"
                  value={regForm.confirmPassword}
                  onChange={e => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                />
              </div>
              <button type="submit" className="w-full erp-btn-primary py-2.5 mt-2">
                CRÉER UN COMPTE
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-2xs text-center text-gray-400">
              Valoris Real Estate — Plateforme Interne Confidentielle
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
