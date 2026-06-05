export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  password: string;
  createdAt: string;
}

export interface AppState {
  logged: boolean;
  currentUser: User | null;
  currentPage: string;
  users: User[];
}

export interface Apartment {
  id: string;
  project: string;
  building: string;
  floor: number;
  ref: string;
  typology: string;
  surface: number;
  terrasse: number;
  prixMAD: number;
  status: 'Disponible' | 'Réservé' | 'Vendu' | 'Bloqué';
  client?: string;
  dateReservation?: string;
}

export interface ChantierPhase {
  id: string;
  name: string;
  project: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'En cours' | 'Terminé' | 'En retard' | 'Planifié';
  responsible: string;
  budget: number;
  spent: number;
}

export interface Document {
  id: string;
  name: string;
  category: string;
  project: string;
  version: string;
  status: 'Approuvé' | 'En attente' | 'Rejeté' | 'Brouillon';
  uploadedBy: string;
  uploadDate: string;
  size: string;
}

export interface FinancialEntry {
  id: string;
  category: string;
  description: string;
  budgeted: number;
  actual: number;
  committed: number;
  period: string;
  project: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info' | 'success';
  title: string;
  message: string;
  module: string;
  date: string;
  read: boolean;
}

export type PageId =
  | 'home'
  | 'dashboard'
  | 'commercial'
  | 'chantier'
  | 'drone'
  | 'reporting'
  | 'documents'
  | 'analytics'
  | 'finance'
  | 'investor'
  | 'predictive'
  | 'workflow'
  | 'settings';
