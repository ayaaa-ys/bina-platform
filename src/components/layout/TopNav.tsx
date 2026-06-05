import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import type { PageId } from '../../types';
import {
  Building2, Bell, ChevronDown, User, Menu, X,
  Home, BarChart3, TrendingUp, HardHat, Camera,
  FileText, FolderOpen, PieChart, CreditCard, Users,
  Brain, GitBranch, Settings, LogOut, AlertTriangle
} from 'lucide-react';
import { alerts } from '../../data/mockData';

const navItems: { id: PageId; label: string; icon: React.ReactNode; group: string }[] = [
  { id: 'home', label: 'Accueil', icon: <Home size={15} />, group: 'principal' },
  { id: 'dashboard', label: 'Tableau de bord décisionnel', icon: <BarChart3 size={15} />, group: 'pilotage' },
  { id: 'commercial', label: 'Pilotage commercial', icon: <TrendingUp size={15} />, group: 'pilotage' },
  { id: 'chantier', label: 'Suivi de chantier', icon: <HardHat size={15} />, group: 'operations' },
  { id: 'drone', label: 'Suivi drone & photogrammétrie', icon: <Camera size={15} />, group: 'operations' },
  { id: 'reporting', label: 'Reporting automatique', icon: <FileText size={15} />, group: 'reporting' },
  { id: 'documents', label: 'Gestion documentaire', icon: <FolderOpen size={15} />, group: 'reporting' },
  { id: 'analytics', label: 'Analyse & reporting avancé', icon: <PieChart size={15} />, group: 'reporting' },
  { id: 'finance', label: 'Gestion financière & achats', icon: <CreditCard size={15} />, group: 'finance' },
  { id: 'investor', label: 'Portail investisseur', icon: <Users size={15} />, group: 'finance' },
  { id: 'predictive', label: 'Tableau prédictif + IA', icon: <Brain size={15} />, group: 'avance' },
  { id: 'workflow', label: 'Workflow & processus', icon: <GitBranch size={15} />, group: 'avance' },
  { id: 'settings', label: 'Paramètres', icon: <Settings size={15} />, group: 'systeme' },
];

const groupLabels: Record<string, string> = {
  principal: 'PRINCIPAL',
  pilotage: 'PILOTAGE & ANALYSE',
  operations: 'OPÉRATIONS',
  reporting: 'REPORTING',
  finance: 'FINANCE & INVESTISSEMENT',
  avance: 'AVANCÉ & IA',
  systeme: 'SYSTÈME',
};

export default function TopNav() {
  const { currentUser, currentPage, navigate, logout, notifications } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadAlerts = alerts.filter(a => !a.read);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNavigate = (page: PageId) => {
    navigate(page);
    setMenuOpen(false);
  };

  const groups = Array.from(new Set(navItems.map(n => n.group)));

  const pageTitles: Record<PageId, string> = {
    home: 'Accueil',
    dashboard: 'Tableau de bord décisionnel',
    commercial: 'Pilotage commercial',
    chantier: 'Suivi de chantier',
    drone: 'Suivi drone & photogrammétrie',
    reporting: 'Reporting automatique',
    documents: 'Gestion documentaire',
    analytics: 'Analyse & reporting avancé',
    finance: 'Gestion financière & achats',
    investor: 'Portail investisseur',
    predictive: 'Tableau prédictif + IA',
    workflow: 'Workflow & processus',
    settings: 'Paramètres',
  };

  return (
    <header className="sticky top-0 z-50 bg-navy-dark border-b border-navy" style={{ background: '#111827', borderColor: '#4B5563' }}>
      <div className="flex items-center h-12 px-4 gap-4">
        {/* Logo */}
        <button
          onClick={() => handleNavigate('home')}
          className="flex items-center gap-2.5 flex-shrink-0 mr-2"
        >
          <div className="w-7 h-7 bg-white flex items-center justify-center flex-shrink-0">
            <Building2 size={15} className="text-navy" style={{ color: '#4B5563' }} />
          </div>
          <div className="hidden sm:block">
            <span className="text-white font-bold text-sm tracking-widest">BINA</span>
            <span className="text-white/40 text-2xs ml-1.5 tracking-wider uppercase">Platform</span>
          </div>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 flex-shrink-0" />

        {/* Menu Button */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-wider transition-colors ${
              menuOpen ? 'bg-navy text-white' : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
            style={{ border: menuOpen ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent' }}
          >
            {menuOpen ? <X size={14} /> : <Menu size={14} />}
            <span className="hidden sm:inline">MENU</span>
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div
              className="absolute top-full left-0 mt-1 w-72 bg-white shadow-dropdown border border-corporate-border fade-in overflow-y-auto"
              style={{ maxHeight: 'calc(100vh - 60px)' }}
            >
              {groups.map(group => {
                const items = navItems.filter(n => n.group === group);
                return (
                  <div key={group}>
                    <div className="px-3 py-1.5 bg-gray-50 border-b border-corporate-border">
                      <span className="text-2xs font-bold text-corporate-muted tracking-widest">{groupLabels[group]}</span>
                    </div>
                    {items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={`nav-item w-full text-left ${
                          currentPage === item.id ? 'bg-blue-50 text-navy font-semibold' : ''
                        }`}
                        style={{ color: currentPage === item.id ? '#4B5563' : undefined }}
                      >
                        <span className={currentPage === item.id ? 'text-navy' : 'text-corporate-muted'} style={{ color: currentPage === item.id ? '#4B5563' : undefined }}>
                          {item.icon}
                        </span>
                        {item.label}
                        {currentPage === item.id && (
                          <span className="ml-auto w-1 h-1 rounded-full bg-navy" style={{ background: '#4B5563' }} />
                        )}
                      </button>
                    ))}
                  </div>
                );
              })}
              <div className="border-t border-corporate-border">
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="nav-item w-full text-left text-red-600 hover:bg-red-50"
                >
                  <LogOut size={15} className="text-red-500" />
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 flex-1 min-w-0">
          <span className="text-white/30 text-xs">/</span>
          <span className="text-white/60 text-xs truncate">{pageTitles[currentPage]}</span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Bell size={15} />
              {unreadAlerts.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-white" style={{ fontSize: '8px', fontWeight: 700 }}>
                  {unreadAlerts.length}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute top-full right-0 mt-1 w-80 bg-white border border-corporate-border shadow-dropdown fade-in">
                <div className="px-4 py-2.5 border-b border-corporate-border bg-gray-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Alertes</span>
                  <span className="badge badge-red">{unreadAlerts.length} nouvelles</span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {alerts.slice(0, 6).map(alert => (
                    <div key={alert.id} className={`px-3 py-2.5 border-b border-corporate-border last:border-0 ${!alert.read ? 'bg-blue-50/50' : ''}`}>
                      <div className="flex items-start gap-2">
                        <AlertTriangle size={12} className={`mt-0.5 flex-shrink-0 ${
                          alert.type === 'danger' ? 'text-red-500' :
                          alert.type === 'warning' ? 'text-orange-500' :
                          alert.type === 'success' ? 'text-green-500' : 'text-blue-500'
                        }`} />
                        <div>
                          <p className="text-xs font-semibold text-gray-800">{alert.title}</p>
                          <p className="text-2xs text-gray-500 mt-0.5">{alert.message}</p>
                          <p className="text-2xs text-gray-400 mt-1">{alert.date} · {alert.module}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-2 h-8 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <div className="w-6 h-6 bg-navy flex items-center justify-center text-white text-2xs font-bold" style={{ background: '#4B5563' }}>
                {currentUser?.fullName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-xs font-medium truncate max-w-28">
                {currentUser?.fullName.split(' ')[0]}
              </span>
              <ChevronDown size={11} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {userMenuOpen && (
              <div className="absolute top-full right-0 mt-1 w-52 bg-white border border-corporate-border shadow-dropdown fade-in">
                <div className="px-3 py-3 border-b border-corporate-border">
                  <p className="text-sm font-semibold text-gray-800">{currentUser?.fullName}</p>
                  <p className="text-xs text-gray-500">{currentUser?.role}</p>
                  <p className="text-2xs text-gray-400 mt-0.5">{currentUser?.email}</p>
                </div>
                <button
                  onClick={() => { handleNavigate('settings'); setUserMenuOpen(false); }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 border-b border-corporate-border"
                >
                  <User size={13} />
                  Mon profil
                </button>
                <button
                  onClick={() => { handleNavigate('settings'); setUserMenuOpen(false); }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 border-b border-corporate-border"
                >
                  <Settings size={13} />
                  Paramètres
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={13} />
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
