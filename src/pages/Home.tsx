import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, ArrowRight, Building2, Target, Eye, Star, Users, ChevronRight } from 'lucide-react';
import type { PageId } from '../types';

const projects = [
  {
    id: 'ug',
    name: 'Urban Grove by Sky Park',
    city: 'Casablanca Nord — Ain Sebaa',
    typology: 'Appartements T2 à T5',
    status: 'En commercialisation',
    statusColor: 'green',
    advancement: 52,
    units: 14,
    minPrice: '1 160 000 MAD',
    image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    description: 'Résidence de standing au cœur du développement urbain de Casablanca Nord. Architecture contemporaine, prestations haut de gamme.',
  },
  {
    id: 'sg',
    name: 'Sky Garden',
    city: 'Ain Diab — Corniche',
    typology: 'Appartements T3 à T5 & Penthouse',
    status: 'Livraison 2025',
    statusColor: 'blue',
    advancement: 76,
    units: 10,
    minPrice: '2 100 000 MAD',
    image: 'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    description: 'Tour résidentielle premium avec vue panoramique sur l\'océan Atlantique. Finitions d\'exception, services conciergerie.',
  },
  {
    id: 'rp',
    name: 'Résidence Panorama',
    city: 'Bouskoura — Green Park',
    typology: 'Appartements T2 à T4 & Villas T4-T5',
    status: 'Livraison imminente',
    statusColor: 'orange',
    advancement: 71,
    units: 10,
    minPrice: '930 000 MAD',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    description: 'Ensemble résidentiel calme et verdoyant à Bouskoura. Appartements et villas avec jardins privatifs et piscine commune.',
  },
];

const values = [
  { icon: <Star size={18} />, title: 'Excellence', text: 'Chaque projet est conçu pour dépasser les standards du secteur immobilier marocain.' },
  { icon: <Users size={18} />, title: 'Confiance', text: 'Transparence totale vis-à-vis de nos clients, investisseurs et partenaires.' },
  { icon: <Target size={18} />, title: 'Innovation', text: 'Technologies constructives avancées et design architectural contemporain.' },
  { icon: <Building2 size={18} />, title: 'Durabilité', text: 'Engagement pour une architecture responsable et des espaces de vie pérennes.' },
];

export default function HomePage() {
  const { navigate } = useApp();

  const statusStyle = (color: string) => {
    if (color === 'green') return 'badge-green';
    if (color === 'blue') return 'badge-blue';
    return 'badge-orange';
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative h-80 overflow-hidden" style={{ minHeight: '340px' }}>
        <img
          src="https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=1400&h=600&fit=crop"
          alt="Valoris Real Estate"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(11,31,58,0.90) 0%, rgba(0,59,102,0.70) 60%, rgba(0,0,0,0.30) 100%)' }} />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-px h-6 bg-white/40" />
            <span className="text-white/60 text-xs tracking-widest uppercase">Valoris Real Estate — Casablanca</span>
          </div>
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-3 max-w-xl">
            BINA PLATFORM
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-lg mb-6 font-light">
            Le portail corporate de pilotage immobilier.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('dashboard')}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-navy text-sm font-semibold hover:bg-gray-100 transition-colors"
              style={{ color: '#4B5563' }}
            >
              Accéder au tableau de bord
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => navigate('commercial')}
              className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-white/50 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Inventaire commercial
            </button>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="border-b border-corporate-border" style={{ background: '#4B5563' }}>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { label: 'Unités en portefeuille', value: '40' },
            { label: 'Projets actifs', value: '3' },
            { label: 'Taux de commercialisation', value: '72%' },
            { label: 'CA réalisé', value: '112 M MAD' },
          ].map((stat, i) => (
            <div key={stat.label} className={`px-6 py-4 text-center ${i < 3 ? 'border-r border-white/10' : ''}`}>
              <div className="text-white text-xl font-bold">{stat.value}</div>
              <div className="text-white/50 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="p-5 space-y-6">
        {/* COMPANY PRESENTATION */}
        <section className="grid md:grid-cols-2 gap-4">
          <div className="erp-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-0.5 h-6 bg-navy" style={{ background: '#4B5563' }} />
              <h2 className="text-lg font-bold text-navy" style={{ color: '#4B5563' }}>Valoris Real Estate</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Fondée à Casablanca, <strong>Valoris Real Estate</strong> est un promoteur immobilier de référence au Maroc,
              spécialisé dans le développement de résidences haut de gamme et de programmes mixtes sur l'axe Casablanca–Rabat.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Notre approche repose sur une maîtrise complète de la chaîne de valeur immobilière : acquisition foncière,
              conception architecturale, maîtrise d'ouvrage, commercialisation et gestion de patrimoine.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Avec plus de <strong>400 logements livrés</strong> et un portefeuille actif de 3 programmes totalisant
              40 unités en commercialisation, Valoris s'impose comme un acteur incontournable du marché immobilier
              haut standing de Casablanca.
            </p>
          </div>
          <div className="relative overflow-hidden" style={{ minHeight: '220px' }}>
            <img
              src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=700&h=400&fit=crop"
              alt="Casablanca"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ background: 'linear-gradient(to top, rgba(17,24,39,0.8) 0%, transparent 60%)' }}>
              <div className="flex items-center gap-1.5 text-white/70 text-xs">
                <MapPin size={11} />
                <span>Casablanca, Royaume du Maroc</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-5 bg-navy" style={{ background: '#4B5563' }} />
              <h2 className="text-base font-bold text-navy uppercase tracking-wide" style={{ color: '#4B5563' }}>Projets en cours</h2>
            </div>
            <button
              onClick={() => navigate('commercial')}
              className="flex items-center gap-1 text-xs text-navy hover:underline font-medium"
              style={{ color: '#4B5563' }}
            >
              Voir l'inventaire complet <ChevronRight size={12} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {projects.map(project => (
              <div key={project.id} className="erp-card overflow-hidden flex flex-col">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={statusStyle(project.statusColor)}>{project.status}</span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1">{project.name}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                    <MapPin size={10} />
                    <span>{project.city}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3 flex-1">{project.description}</p>
                  <div className="space-y-1.5 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Avancement global</span>
                      <span className="font-semibold text-gray-800">{project.advancement}%</span>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: `${project.advancement}%`, background: '#4B5563' }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div>
                      <span className="text-gray-400">Typologies</span>
                      <p className="font-medium text-gray-700 text-2xs">{project.typology}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">À partir de</span>
                      <p className="font-semibold text-gray-800 text-2xs">{project.minPrice}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('commercial')}
                    className="erp-btn-primary w-full py-1.5 text-xs flex items-center justify-center gap-1"
                  >
                    Voir le programme <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MISSION / VISION / VALUES */}
        <section className="grid md:grid-cols-3 gap-4">
          <div className="erp-card p-5 border-t-2" style={{ borderTopColor: '#4B5563' }}>
            <div className="flex items-center gap-2 mb-3">
              <Target size={16} style={{ color: '#4B5563' }} />
              <h3 className="font-bold text-navy text-sm uppercase tracking-wide" style={{ color: '#4B5563' }}>Mission</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Développer des résidences de qualité qui répondent aux aspirations des familles marocaines,
              en combinant esthétique architecturale, confort de vie et accessibilité financière.
            </p>
          </div>
          <div className="erp-card p-5 border-t-2" style={{ borderTopColor: '#E67E22' }}>
            <div className="flex items-center gap-2 mb-3">
              <Eye size={16} style={{ color: '#E67E22' }} />
              <h3 className="font-bold text-sm uppercase tracking-wide" style={{ color: '#E67E22' }}>Vision</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Devenir le promoteur immobilier de référence au Maroc pour le segment haut standing,
              reconnu pour l'excellence de ses réalisations et la solidité de sa relation client.
            </p>
          </div>
          <div className="erp-card p-5 border-t-2" style={{ borderTopColor: '#27AE60' }}>
            <div className="flex items-center gap-2 mb-3">
              <Star size={16} style={{ color: '#27AE60' }} />
              <h3 className="font-bold text-sm uppercase tracking-wide" style={{ color: '#27AE60' }}>Valeurs</h3>
            </div>
            <div className="space-y-1.5">
              {['Intégrité & transparence', 'Excellence opérationnelle', 'Innovation continue', 'Responsabilité sociétale'].map(v => (
                <div key={v} className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full flex-shrink-0" />
                  <span className="text-xs text-gray-600">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VALUES GRID */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {values.map(v => (
              <div key={v.title} className="erp-card p-4">
                <div className="w-8 h-8 bg-corporate-gray flex items-center justify-center mb-3 text-navy" style={{ color: '#4B5563' }}>
                  {v.icon}
                </div>
                <h4 className="font-bold text-sm text-gray-900 mb-1">{v.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DIRECTION */}
        <section className="erp-card overflow-hidden">
          <div className="erp-section-header">
            <span className="erp-section-title">Direction générale</span>
          </div>
          <div className="p-5 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <div
                className="w-20 h-20 flex items-center justify-center text-white text-2xl font-bold"
                style={{ background: '#4B5563' }}
              >
                AA
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-gray-900 mb-0.5">Abdelatif Aouragh</h3>
              <p className="text-xs text-corporate-muted uppercase tracking-wide mb-3">Président Directeur Général — Valoris Real Estate</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Fort d'une expérience de plus de 20 ans dans le secteur immobilier marocain, M. Aouragh a fondé Valoris Real Estate
                avec la vision de créer des espaces de vie d'exception alliant modernité, confort et ancrage culturel marocain.
                Diplômé de l'École Centrale de Paris et de l'INSEAD, il pilote la stratégie de développement du groupe avec une
                approche rigoureuse et innovante.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Développement foncier', 'Finance de projet', 'Architecture & urbanisme', 'Gestion d\'actifs'].map(tag => (
                  <span key={tag} className="badge badge-blue">{tag}</span>
                ))}
              </div>
            </div>
            <div className="erp-card p-4 min-w-48">
              <h4 className="text-xs font-bold uppercase tracking-wide text-corporate-muted mb-3">Organigramme de direction</h4>
              <div className="space-y-2 text-xs">
                {[
                  { name: 'Abdelatif Aouragh', role: 'PDG' },
                  { name: 'Direction Commerciale', role: 'Ventes & Marketing' },
                  { name: 'Direction Technique', role: 'Construction & MOE' },
                  { name: 'Direction Financière', role: 'Finance & Achats' },
                  { name: 'Direction Juridique', role: 'Contrats & Conformité' },
                ].map((p, i) => (
                  <div key={p.name} className={`flex items-center gap-2 py-1.5 ${i > 0 ? 'border-t border-corporate-border' : ''}`}>
                    <div className="w-5 h-5 bg-gray-100 flex items-center justify-center text-2xs font-bold text-gray-600">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{p.name}</p>
                      <p className="text-gray-400 text-2xs">{p.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PLATFORM PRESENTATION */}
        <section className="erp-card">
          <div className="erp-section-header">
            <span className="erp-section-title">À propos de BINA Platform</span>
          </div>
          <div className="p-5 grid md:grid-cols-2 gap-5">
            <div>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                BINA Platform est le portail de pilotage interne de Valoris Real Estate, développé pour centraliser
                toutes les activités opérationnelles, commerciales et financières de l'entreprise en un seul outil
                accessible et intuitif.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                La plateforme intègre 11 modules fonctionnels couvrant l'ensemble du cycle de vie d'un projet immobilier :
                de la commercialisation jusqu'à la livraison, en passant par le suivi de chantier, la gestion financière
                et le reporting investisseur.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Tableau de bord', desc: 'KPIs temps réel', action: 'dashboard' as PageId },
                { label: 'Pilotage commercial', desc: 'Inventaire & ventes', action: 'commercial' as PageId },
                { label: 'Suivi chantier', desc: 'Avancement & alertes', action: 'chantier' as PageId },
                { label: 'Finance & Achats', desc: 'Budget & trésorerie', action: 'finance' as PageId },
              ].map(m => (
                <button
                  key={m.label}
                  onClick={() => navigate(m.action)}
                  className="erp-card p-3 text-left hover:border-navy transition-colors group"
                  style={{ ':hover': { borderColor: '#4B5563' } } as React.CSSProperties}
                >
                  <p className="text-xs font-semibold text-gray-900 group-hover:text-navy">{m.label}</p>
                  <p className="text-2xs text-gray-500 mt-0.5">{m.desc}</p>
                  <ArrowRight size={10} className="text-gray-400 mt-1" />
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
