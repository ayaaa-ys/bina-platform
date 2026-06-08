import React, { useMemo, useRef, useState } from 'react';
import { documents as mockDocuments } from '../data/mockData';
import type { Document as DocumentItem } from '../types';
import { FolderOpen, Upload, Search, Eye, Download, CheckCircle, Clock, XCircle, Plus } from 'lucide-react';

const NAVY = '#4B5563';
const categories = ['Tous', 'Plans', 'Contrat', 'Administratif', 'Technique', 'Commercial', 'Reporting', 'Qualité', 'Marché'];

type UploadedDocument = DocumentItem & {
  fileUrl?: string;
};

const statusBadge = (s: string) => {
  if (s === 'Approuvé') return 'badge-green';
  if (s === 'En attente') return 'badge-orange';
  if (s === 'Rejeté') return 'badge-red';
  return 'badge-gray';
};

const statusIcon = (s: string) => {
  if (s === 'Approuvé') return <CheckCircle size={13} className="text-green-600" />;
  if (s === 'En attente') return <Clock size={13} className="text-orange-500" />;
  if (s === 'Rejeté') return <XCircle size={13} className="text-red-500" />;
  return <Clock size={13} className="text-gray-400" />;
};

export default function DocumentsPage() {
  const [category, setCategory] = useState('Tous');
  const [search, setSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [documentsList, setDocumentsList] = useState<UploadedDocument[]>(() => mockDocuments.map(doc => ({ ...doc })));
  const [dragActive, setDragActive] = useState(false);
  const [feedback, setFeedback] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const projects = Array.from(new Set(documentsList.map(d => d.project)));
  const filtered = useMemo(() => documentsList.filter(d => {
    if (category !== 'Tous' && d.category !== category) return false;
    if (projectFilter !== 'all' && d.project !== projectFilter) return false;
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [category, documentsList, projectFilter, search]);

  const stats = useMemo(() => ({
    total: documentsList.length,
    approved: documentsList.filter(d => d.status === 'Approuvé').length,
    pending: documentsList.filter(d => d.status === 'En attente').length,
    rejected: documentsList.filter(d => d.status === 'Rejeté').length,
  }), [documentsList]);

  const formatSize = (sizeInBytes: number) => {
    if (sizeInBytes < 1024) return `${sizeInBytes} octets`;
    if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const addFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const pdfFiles = Array.from(files).filter(file => file.type === 'application/pdf' || /\.pdf$/i.test(file.name));

    if (pdfFiles.length === 0) {
      setFeedback('Veuillez sélectionner au moins un fichier PDF.');
      return;
    }

    const newDocuments: UploadedDocument[] = pdfFiles.map(file => ({
      id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: file.name,
      category: 'Technique',
      project: 'Projet courant',
      version: 'v1.0',
      status: 'En attente',
      uploadedBy: 'Vous',
      uploadDate: new Date().toLocaleDateString('fr-FR'),
      size: formatSize(file.size),
      fileUrl: URL.createObjectURL(file),
    }));

    setDocumentsList(prev => [...newDocuments, ...prev]);
    setFeedback('Fichier ajouté avec succès');
  };

  const handlePreview = (doc: UploadedDocument) => {
    if (doc.fileUrl) {
      window.open(doc.fileUrl, '_blank', 'noopener');
      return;
    }

    setFeedback('Aperçu disponible pour les fichiers téléchargés depuis cette page.');
  };

  const handleDownload = (doc: UploadedDocument) => {
    if (!doc.fileUrl) {
      setFeedback('Le téléchargement n’est disponible que pour les fichiers ajoutés ici.');
      return;
    }

    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.name.endsWith('.pdf') ? doc.name : `${doc.name}.pdf`;
    link.click();
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">GESTION DOCUMENTAIRE</h1>
            <p className="text-white/50 text-xs mt-0.5">GED · Versioning · Workflow de validation</p>
          </div>
          <button className="erp-btn-primary flex items-center gap-1.5 text-xs py-1.5">
            <Plus size={12} /> Ajouter document
          </button>
        </div>
      </div>

      <div className="page-content">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total documents', value: stats.total, color: NAVY, icon: <FolderOpen size={15} /> },
            { label: 'Approuvés', value: stats.approved, color: '#27AE60', icon: <CheckCircle size={15} /> },
            { label: 'En attente', value: stats.pending, color: '#E67E22', icon: <Clock size={15} /> },
            { label: 'Rejetés', value: stats.rejected, color: '#E74C3C', icon: <XCircle size={15} /> },
          ].map(k => (
            <div key={k.label} className="erp-card p-4 flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: `${k.color}15`, color: k.color }}>
                {k.icon}
              </div>
              <div>
                <div className="text-xl font-bold" style={{ color: k.color }}>{k.value}</div>
                <div className="text-2xs text-corporate-muted uppercase tracking-wide">{k.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="erp-card overflow-hidden">
          <div className="flex overflow-x-auto border-b border-corporate-border bg-white px-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                  category === cat ? 'border-navy text-navy' : 'border-transparent text-corporate-muted hover:text-navy'
                }`}
                style={{ borderColor: category === cat ? NAVY : 'transparent', color: category === cat ? NAVY : undefined }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filter bar */}
          <div className="px-4 py-3 border-b border-corporate-border flex flex-wrap gap-3 items-center bg-corporate-gray">
            <div className="relative flex-1 min-w-40">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-corporate-muted" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="erp-input pl-8 py-1.5 text-xs"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select className="erp-input py-1.5 w-auto text-xs" value={projectFilter} onChange={e => setProjectFilter(e.target.value)}>
              <option value="all">Tous les projets</option>
              {projects.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <label className="erp-label mb-0 text-xs">
              <span className="text-corporate-muted">{filtered.length} document(s)</span>
            </label>
          </div>

          {/* Upload Zone */}
          <div className="p-4 border-b border-corporate-border">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              multiple
              className="hidden"
              onChange={e => {
                addFiles(e.target.files);
                e.target.value = '';
              }}
            />
            <div
              className={`border-2 border-dashed p-4 flex flex-col md:flex-row items-center justify-between gap-3 cursor-pointer transition-colors ${dragActive ? 'border-navy bg-blue-50' : 'border-corporate-border bg-corporate-gray hover:border-navy'}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={e => {
                e.preventDefault();
                setDragActive(false);
                addFiles(e.dataTransfer.files);
              }}
            >
              <div className="flex items-center gap-3">
                <Upload size={16} className="text-corporate-muted" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Glissez-déposez vos documents ici</p>
                  <p className="text-2xs text-corporate-muted mt-0.5">Formats PDF uniquement — ajout multiple disponible</p>
                </div>
              </div>
              <button
                type="button"
                className="erp-btn-secondary text-xs py-1.5 px-3"
                onClick={e => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Parcourir
              </button>
            </div>
            {feedback && (
              <p className="mt-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">{feedback}</p>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Nom document</th>
                  <th>Catégorie</th>
                  <th>Projet</th>
                  <th>Date</th>
                  <th>Taille</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(doc => (
                  <tr key={doc.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <FolderOpen size={13} className="text-corporate-muted flex-shrink-0" />
                        <span className="font-medium text-sm">{doc.name}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-blue">{doc.category}</span></td>
                    <td className="text-xs text-corporate-muted max-w-28 truncate">{doc.project}</td>
                    <td className="text-xs">{doc.uploadDate}</td>
                    <td className="text-xs text-corporate-muted">{doc.size}</td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        {statusIcon(doc.status)}
                        <span className={statusBadge(doc.status) + ' badge'}>{doc.status}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handlePreview(doc)}
                          className="text-xs text-navy flex items-center gap-0.5 hover:underline" style={{ color: NAVY }}
                        >
                          <Eye size={10} /> Voir
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownload(doc)}
                          className="text-xs text-corporate-muted flex items-center gap-0.5 hover:text-navy"
                        >
                          <Download size={10} /> Télécharger
                        </button>
                        {doc.status === 'En attente' && (
                          <button className="text-xs text-green-600 flex items-center gap-0.5 hover:underline">
                            <CheckCircle size={10} /> Valider
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-corporate-muted text-sm">
              Aucun document ne correspond aux critères sélectionnés.
            </div>
          )}
        </div>

        {/* Workflow validation */}
        <div className="erp-card">
          <div className="erp-section-header">
            <span className="erp-section-title">Circuit de validation</span>
          </div>
          <div className="p-4 overflow-x-auto">
            <div className="flex items-center gap-0 min-w-max">
              {[
                { step: '1', label: 'Soumission', sub: 'Émetteur', color: '#2980B9', done: true },
                { step: '2', label: 'Contrôle Bureau', sub: 'Bureau Études', color: '#2980B9', done: true },
                { step: '3', label: 'Revue Technique', sub: 'Dir. Technique', color: '#E67E22', done: false, active: true },
                { step: '4', label: 'Validation', sub: 'Dir. Générale', color: '#7F8C8D', done: false },
                { step: '5', label: 'Archivage GED', sub: 'Système', color: '#7F8C8D', done: false },
              ].map((s, i, arr) => (
                <React.Fragment key={s.step}>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm border-2"
                      style={{
                        background: s.done ? s.color : s.active ? '#E67E22' : '#E5E7EB',
                        borderColor: s.done ? s.color : s.active ? '#E67E22' : '#D1D5DB',
                        color: s.done || s.active ? 'white' : '#9CA3AF'
                      }}
                    >
                      {s.done ? <CheckCircle size={16} /> : s.step}
                    </div>
                    <p className="text-xs font-semibold text-gray-800 mt-2 text-center">{s.label}</p>
                    <p className="text-2xs text-corporate-muted text-center">{s.sub}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex-1 h-0.5 mt-[-12px] mx-1" style={{ background: s.done ? '#2980B9' : '#E5E7EB', minWidth: '40px' }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
