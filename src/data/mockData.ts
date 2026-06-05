import type { Apartment, ChantierPhase, Document, FinancialEntry, Alert } from '../types';

// Simulates Synthese_Ventes_Dashboard.xlsx data
export const apartments: Apartment[] = [
  // Urban Grove by Sky Park — Casablanca Nord
  { id: 'UG-A101', project: 'Urban Grove by Sky Park', building: 'Bloc A', floor: 1, ref: 'A-101', typology: 'T2', surface: 68.5, terrasse: 0, prixMAD: 1_250_000, status: 'Vendu', client: 'M. Benali Karim', dateReservation: '2024-03-12' },
  { id: 'UG-A102', project: 'Urban Grove by Sky Park', building: 'Bloc A', floor: 1, ref: 'A-102', typology: 'T3', surface: 92.0, terrasse: 0, prixMAD: 1_680_000, status: 'Réservé', client: 'Mme. Alaoui Sara', dateReservation: '2024-05-08' },
  { id: 'UG-A103', project: 'Urban Grove by Sky Park', building: 'Bloc A', floor: 1, ref: 'A-103', typology: 'T2', surface: 65.0, terrasse: 0, prixMAD: 1_190_000, status: 'Disponible' },
  { id: 'UG-A201', project: 'Urban Grove by Sky Park', building: 'Bloc A', floor: 2, ref: 'A-201', typology: 'T3', surface: 94.5, terrasse: 12, prixMAD: 1_780_000, status: 'Vendu', client: 'M. Tahiri Hassan', dateReservation: '2024-02-20' },
  { id: 'UG-A202', project: 'Urban Grove by Sky Park', building: 'Bloc A', floor: 2, ref: 'A-202', typology: 'T4', surface: 128.0, terrasse: 18, prixMAD: 2_450_000, status: 'Réservé', client: 'M. Ennaji Rachid', dateReservation: '2024-06-01' },
  { id: 'UG-A203', project: 'Urban Grove by Sky Park', building: 'Bloc A', floor: 2, ref: 'A-203', typology: 'T2', surface: 67.0, terrasse: 0, prixMAD: 1_230_000, status: 'Disponible' },
  { id: 'UG-B101', project: 'Urban Grove by Sky Park', building: 'Bloc B', floor: 1, ref: 'B-101', typology: 'T3', surface: 89.0, terrasse: 0, prixMAD: 1_620_000, status: 'Vendu', client: 'Mme. Chaabi Nadia', dateReservation: '2024-01-15' },
  { id: 'UG-B102', project: 'Urban Grove by Sky Park', building: 'Bloc B', floor: 1, ref: 'B-102', typology: 'T2', surface: 63.5, terrasse: 0, prixMAD: 1_160_000, status: 'Disponible' },
  { id: 'UG-B201', project: 'Urban Grove by Sky Park', building: 'Bloc B', floor: 2, ref: 'B-201', typology: 'T4', surface: 132.0, terrasse: 22, prixMAD: 2_550_000, status: 'Réservé', client: 'M. Benkaddour Youssef', dateReservation: '2024-07-10' },
  { id: 'UG-B301', project: 'Urban Grove by Sky Park', building: 'Bloc B', floor: 3, ref: 'B-301', typology: 'T3', surface: 95.0, terrasse: 0, prixMAD: 1_750_000, status: 'Disponible' },
  { id: 'UG-B302', project: 'Urban Grove by Sky Park', building: 'Bloc B', floor: 3, ref: 'B-302', typology: 'T2', surface: 69.0, terrasse: 0, prixMAD: 1_270_000, status: 'Vendu', client: 'Mme. Fathi Laila', dateReservation: '2024-04-22' },
  { id: 'UG-C101', project: 'Urban Grove by Sky Park', building: 'Bloc C', floor: 1, ref: 'C-101', typology: 'T5', surface: 165.0, terrasse: 35, prixMAD: 3_200_000, status: 'Réservé', client: 'M. Tazi Omar', dateReservation: '2024-07-15' },
  { id: 'UG-C201', project: 'Urban Grove by Sky Park', building: 'Bloc C', floor: 2, ref: 'C-201', typology: 'T3', surface: 91.0, terrasse: 0, prixMAD: 1_670_000, status: 'Disponible' },
  { id: 'UG-C202', project: 'Urban Grove by Sky Park', building: 'Bloc C', floor: 2, ref: 'C-202', typology: 'T4', surface: 125.0, terrasse: 15, prixMAD: 2_390_000, status: 'Vendu', client: 'M. Berrada Sami', dateReservation: '2024-03-30' },

  // Sky Garden — Ain Diab
  { id: 'SG-T101', project: 'Sky Garden', building: 'Tour 1', floor: 1, ref: 'T1-101', typology: 'T3', surface: 98.0, terrasse: 0, prixMAD: 2_100_000, status: 'Vendu', client: 'M. Soussi Mehdi', dateReservation: '2023-11-05' },
  { id: 'SG-T102', project: 'Sky Garden', building: 'Tour 1', floor: 1, ref: 'T1-102', typology: 'T4', surface: 135.0, terrasse: 25, prixMAD: 2_950_000, status: 'Vendu', client: 'Mme. Benkirane Hayat', dateReservation: '2023-12-18' },
  { id: 'SG-T201', project: 'Sky Garden', building: 'Tour 1', floor: 2, ref: 'T1-201', typology: 'T3', surface: 101.0, terrasse: 0, prixMAD: 2_200_000, status: 'Réservé', client: 'M. Kabbaj Farid', dateReservation: '2024-02-14' },
  { id: 'SG-T202', project: 'Sky Garden', building: 'Tour 1', floor: 2, ref: 'T1-202', typology: 'T5', surface: 172.0, terrasse: 40, prixMAD: 3_850_000, status: 'Vendu', client: 'M. Alami Driss', dateReservation: '2023-10-22' },
  { id: 'SG-T301', project: 'Sky Garden', building: 'Tour 2', floor: 3, ref: 'T2-301', typology: 'T4', surface: 138.0, terrasse: 28, prixMAD: 3_100_000, status: 'Disponible' },
  { id: 'SG-T302', project: 'Sky Garden', building: 'Tour 2', floor: 3, ref: 'T2-302', typology: 'T3', surface: 99.5, terrasse: 0, prixMAD: 2_180_000, status: 'Réservé', client: 'Mme. Chaoui Imane', dateReservation: '2024-05-20' },
  { id: 'SG-T401', project: 'Sky Garden', building: 'Tour 2', floor: 4, ref: 'T2-401', typology: 'T4', surface: 140.0, terrasse: 30, prixMAD: 3_250_000, status: 'Disponible' },
  { id: 'SG-T501', project: 'Sky Garden', building: 'Tour 3', floor: 5, ref: 'T3-501', typology: 'T5', surface: 180.0, terrasse: 55, prixMAD: 4_200_000, status: 'Vendu', client: 'M. Sefrioui Tarik', dateReservation: '2024-01-08' },
  { id: 'SG-T502', project: 'Sky Garden', building: 'Tour 3', floor: 5, ref: 'T3-502', typology: 'T3', surface: 105.0, terrasse: 0, prixMAD: 2_350_000, status: 'Disponible' },
  { id: 'SG-P101', project: 'Sky Garden', building: 'Penthouse', floor: 12, ref: 'PH-01', typology: 'Penthouse', surface: 320.0, terrasse: 120, prixMAD: 9_800_000, status: 'Réservé', client: 'M. Fassi Fihri Ahmed', dateReservation: '2024-06-30' },

  // Résidence Panorama — Bouskoura
  { id: 'RP-R101', project: 'Résidence Panorama', building: 'Rés. A', floor: 1, ref: 'RA-101', typology: 'T2', surface: 72.0, terrasse: 0, prixMAD: 980_000, status: 'Vendu', client: 'M. Chakir Amine', dateReservation: '2024-04-10' },
  { id: 'RP-R102', project: 'Résidence Panorama', building: 'Rés. A', floor: 1, ref: 'RA-102', typology: 'T3', surface: 96.0, terrasse: 8, prixMAD: 1_320_000, status: 'Vendu', client: 'Mme. Rhani Fatima', dateReservation: '2024-03-05' },
  { id: 'RP-R103', project: 'Résidence Panorama', building: 'Rés. A', floor: 1, ref: 'RA-103', typology: 'T2', surface: 70.5, terrasse: 0, prixMAD: 960_000, status: 'Disponible' },
  { id: 'RP-R201', project: 'Résidence Panorama', building: 'Rés. A', floor: 2, ref: 'RA-201', typology: 'T3', surface: 98.0, terrasse: 10, prixMAD: 1_380_000, status: 'Réservé', client: 'M. Bougrine Hicham', dateReservation: '2024-06-15' },
  { id: 'RP-R202', project: 'Résidence Panorama', building: 'Rés. A', floor: 2, ref: 'RA-202', typology: 'T4', surface: 122.0, terrasse: 15, prixMAD: 1_680_000, status: 'Disponible' },
  { id: 'RP-B101', project: 'Résidence Panorama', building: 'Rés. B', floor: 1, ref: 'RB-101', typology: 'T2', surface: 68.0, terrasse: 0, prixMAD: 930_000, status: 'Vendu', client: 'Mme. Sabiri Kenza', dateReservation: '2024-02-28' },
  { id: 'RP-B201', project: 'Résidence Panorama', building: 'Rés. B', floor: 2, ref: 'RB-201', typology: 'T3', surface: 94.0, terrasse: 0, prixMAD: 1_290_000, status: 'Disponible' },
  { id: 'RP-V01', project: 'Résidence Panorama', building: 'Villas', floor: 0, ref: 'V-01', typology: 'Villa T5', surface: 285.0, terrasse: 180, prixMAD: 4_500_000, status: 'Vendu', client: 'M. Guerouabi Nabil', dateReservation: '2024-05-01' },
  { id: 'RP-V02', project: 'Résidence Panorama', building: 'Villas', floor: 0, ref: 'V-02', typology: 'Villa T5', surface: 290.0, terrasse: 185, prixMAD: 4_650_000, status: 'Réservé', client: 'M. Benjelloun Said', dateReservation: '2024-07-20' },
  { id: 'RP-V03', project: 'Résidence Panorama', building: 'Villas', floor: 0, ref: 'V-03', typology: 'Villa T4', surface: 245.0, terrasse: 150, prixMAD: 3_950_000, status: 'Disponible' },
];

export const chantierPhases: ChantierPhase[] = [
  { id: 'ph-1', name: 'Terrassement & Fondations', project: 'Urban Grove by Sky Park', startDate: '2023-09-01', endDate: '2023-12-31', progress: 100, status: 'Terminé', responsible: 'Bureau d\'études BET', budget: 4_200_000, spent: 4_080_000 },
  { id: 'ph-2', name: 'Gros oeuvre — RDC & R+1', project: 'Urban Grove by Sky Park', startDate: '2024-01-01', endDate: '2024-04-30', progress: 100, status: 'Terminé', responsible: 'SOCOMAL Construction', budget: 8_500_000, spent: 8_720_000 },
  { id: 'ph-3', name: 'Gros oeuvre — R+2 & R+3', project: 'Urban Grove by Sky Park', startDate: '2024-05-01', endDate: '2024-08-31', progress: 78, status: 'En cours', responsible: 'SOCOMAL Construction', budget: 7_200_000, spent: 5_616_000 },
  { id: 'ph-4', name: 'Second oeuvre & Menuiserie', project: 'Urban Grove by Sky Park', startDate: '2024-09-01', endDate: '2025-02-28', progress: 10, status: 'Planifié', responsible: 'BATIMETAL Sarl', budget: 6_800_000, spent: 680_000 },
  { id: 'ph-5', name: 'VRD & Espaces verts', project: 'Urban Grove by Sky Park', startDate: '2025-01-01', endDate: '2025-05-31', progress: 0, status: 'Planifié', responsible: 'Paysages & Terrassements SA', budget: 2_500_000, spent: 0 },

  { id: 'ph-6', name: 'Terrassement', project: 'Sky Garden', startDate: '2022-06-01', endDate: '2022-09-30', progress: 100, status: 'Terminé', responsible: 'GEOMARC SA', budget: 6_500_000, spent: 6_280_000 },
  { id: 'ph-7', name: 'Gros oeuvre — R1 à R5', project: 'Sky Garden', startDate: '2022-10-01', endDate: '2023-09-30', progress: 100, status: 'Terminé', responsible: 'SOCOMAL Construction', budget: 22_000_000, spent: 21_800_000 },
  { id: 'ph-8', name: 'Gros oeuvre — R6 à R12', project: 'Sky Garden', startDate: '2023-10-01', endDate: '2024-06-30', progress: 92, status: 'En cours', responsible: 'SOCOMAL Construction', budget: 18_500_000, spent: 17_020_000 },
  { id: 'ph-9', name: 'Façades & Vitrages', project: 'Sky Garden', startDate: '2024-04-01', endDate: '2024-10-31', progress: 45, status: 'En cours', responsible: 'ALUTEC Façades', budget: 9_800_000, spent: 4_410_000 },
  { id: 'ph-10', name: 'Finitions intérieures', project: 'Sky Garden', startDate: '2024-07-01', endDate: '2025-03-31', progress: 15, status: 'En cours', responsible: 'Déco Design Plus', budget: 12_000_000, spent: 1_800_000 },

  { id: 'ph-11', name: 'Terrassement & VRD', project: 'Résidence Panorama', startDate: '2023-04-01', endDate: '2023-07-31', progress: 100, status: 'Terminé', responsible: 'GEOMARC SA', budget: 3_200_000, spent: 3_150_000 },
  { id: 'ph-12', name: 'Gros oeuvre complet', project: 'Résidence Panorama', startDate: '2023-08-01', endDate: '2024-05-31', progress: 100, status: 'Terminé', responsible: 'BATIMAROC Sarl', budget: 14_500_000, spent: 14_200_000 },
  { id: 'ph-13', name: 'Second oeuvre & Finitions', project: 'Résidence Panorama', startDate: '2024-06-01', endDate: '2024-11-30', progress: 62, status: 'En cours', responsible: 'Déco Design Plus', budget: 7_500_000, spent: 4_650_000 },
  { id: 'ph-14', name: 'Piscine & Espaces communs', project: 'Résidence Panorama', startDate: '2024-09-01', endDate: '2025-01-31', progress: 8, status: 'En cours', responsible: 'AquaSpace Maroc', budget: 2_800_000, spent: 224_000 },
];

export const documents: Document[] = [
  { id: 'doc-01', name: 'Permis de Construire — Urban Grove', category: 'Administratif', project: 'Urban Grove by Sky Park', version: 'v1.0', status: 'Approuvé', uploadedBy: 'Direction Technique', uploadDate: '2023-08-15', size: '4.2 MB' },
  { id: 'doc-02', name: 'Plans Architecturaux — Bloc A', category: 'Plans', project: 'Urban Grove by Sky Park', version: 'v3.2', status: 'Approuvé', uploadedBy: 'Cabinet ARCHIMARO', uploadDate: '2024-01-20', size: '28.5 MB' },
  { id: 'doc-03', name: 'Étude de Sol — Rapport Final', category: 'Technique', project: 'Urban Grove by Sky Park', version: 'v1.0', status: 'Approuvé', uploadedBy: 'GEOMARC SA', uploadDate: '2023-07-10', size: '12.1 MB' },
  { id: 'doc-04', name: 'DCE — Lot Gros Oeuvre', category: 'Marché', project: 'Urban Grove by Sky Park', version: 'v2.1', status: 'Approuvé', uploadedBy: 'Direction Achats', uploadDate: '2023-11-05', size: '8.8 MB' },
  { id: 'doc-05', name: 'Rapport Avancement Q3-2024', category: 'Reporting', project: 'Urban Grove by Sky Park', version: 'v1.0', status: 'En attente', uploadedBy: 'Conducteur Travaux', uploadDate: '2024-07-18', size: '3.5 MB' },
  { id: 'doc-06', name: 'Plans Façades — Sky Garden Tour 1', category: 'Plans', project: 'Sky Garden', version: 'v4.0', status: 'Approuvé', uploadedBy: 'Cabinet ARCHIMARO', uploadDate: '2023-05-12', size: '45.2 MB' },
  { id: 'doc-07', name: 'Contrat SOCOMAL Construction', category: 'Contrat', project: 'Sky Garden', version: 'v1.0', status: 'Approuvé', uploadedBy: 'Direction Juridique', uploadDate: '2022-09-01', size: '2.1 MB' },
  { id: 'doc-08', name: 'Plan Marketing — Résidence Panorama', category: 'Commercial', project: 'Résidence Panorama', version: 'v2.0', status: 'Approuvé', uploadedBy: 'Direction Commerciale', uploadDate: '2023-03-22', size: '6.7 MB' },
  { id: 'doc-09', name: 'Cahier des Charges Finitions', category: 'Technique', project: 'Résidence Panorama', version: 'v1.2', status: 'En attente', uploadedBy: 'Bureau d\'études BET', uploadDate: '2024-06-10', size: '5.3 MB' },
  { id: 'doc-10', name: 'Rapport Audit Qualité — Phase 2', category: 'Qualité', project: 'Sky Garden', version: 'v1.0', status: 'Rejeté', uploadedBy: 'BET Qualité', uploadDate: '2024-07-01', size: '2.8 MB' },
];

export const financialData: FinancialEntry[] = [
  { id: 'fin-01', category: 'Foncier', description: 'Acquisition terrain Urban Grove', budgeted: 45_000_000, actual: 44_500_000, committed: 0, period: '2023', project: 'Urban Grove by Sky Park' },
  { id: 'fin-02', category: 'Construction', description: 'Lot Gros Oeuvre', budgeted: 62_000_000, actual: 38_200_000, committed: 23_800_000, period: '2024', project: 'Urban Grove by Sky Park' },
  { id: 'fin-03', category: 'Études & Bureau', description: 'Maîtrise d\'oeuvre et BET', budgeted: 5_500_000, actual: 4_200_000, committed: 1_300_000, period: '2024', project: 'Urban Grove by Sky Park' },
  { id: 'fin-04', category: 'Commercial', description: 'Frais commercialisation', budgeted: 3_200_000, actual: 2_100_000, committed: 0, period: '2024', project: 'Urban Grove by Sky Park' },
  { id: 'fin-05', category: 'Construction', description: 'Lot Second Oeuvre', budgeted: 38_000_000, actual: 8_500_000, committed: 18_000_000, period: '2024', project: 'Sky Garden' },
  { id: 'fin-06', category: 'Foncier', description: 'Terrain Ain Diab Sky Garden', budgeted: 85_000_000, actual: 85_000_000, committed: 0, period: '2022', project: 'Sky Garden' },
  { id: 'fin-07', category: 'Construction', description: 'Lot Gros Oeuvre Sky Garden', budgeted: 95_000_000, actual: 87_200_000, committed: 7_800_000, period: '2024', project: 'Sky Garden' },
  { id: 'fin-08', category: 'Foncier', description: 'Terrain Bouskoura Panorama', budgeted: 28_000_000, actual: 28_000_000, committed: 0, period: '2023', project: 'Résidence Panorama' },
  { id: 'fin-09', category: 'Construction', description: 'Gros & Second Oeuvre Panorama', budgeted: 42_000_000, actual: 35_600_000, committed: 6_400_000, period: '2024', project: 'Résidence Panorama' },
  { id: 'fin-10', category: 'Commercial', description: 'Commercialisation Panorama', budgeted: 1_800_000, actual: 1_500_000, committed: 0, period: '2024', project: 'Résidence Panorama' },
];

export const alerts: Alert[] = [
  { id: 'a1', type: 'danger', title: 'Retard Gros Oeuvre R+3', message: 'La phase gros oeuvre R+3 accuse un retard de 12 jours sur le planning initial. Impact sur la livraison estimé.', module: 'Chantier', date: '2024-07-24', read: false },
  { id: 'a2', type: 'warning', title: 'Budget Dépassé — Gros Oeuvre UG', message: 'Le lot Gros Oeuvre Bloc A dépasse le budget de 2.5%. Arbitrage budgétaire requis.', module: 'Finance', date: '2024-07-22', read: false },
  { id: 'a3', type: 'info', title: 'Nouveau document soumis', message: 'Le rapport d\'avancement Q3-2024 est en attente de validation par la direction.', module: 'Documents', date: '2024-07-18', read: false },
  { id: 'a4', type: 'success', title: 'Vente confirmée — UG C-202', message: 'La vente de l\'appartement C-202 Urban Grove a été officialisée. Montant: 2 390 000 MAD.', module: 'Commercial', date: '2024-07-20', read: true },
  { id: 'a5', type: 'warning', title: 'Stock critique — T2 Urban Grove', message: 'Seulement 3 appartements T2 disponibles sur Urban Grove. Alerte commerciale activée.', module: 'Commercial', date: '2024-07-19', read: false },
  { id: 'a6', type: 'danger', title: 'Document rejeté — Audit Qualité', message: 'Le rapport d\'audit qualité phase 2 Sky Garden a été rejeté. Corrections nécessaires.', module: 'Documents', date: '2024-07-01', read: true },
];

// KPI computed data
export const getKPIs = () => {
  const totalUnits = apartments.length;
  const sold = apartments.filter(a => a.status === 'Vendu').length;
  const reserved = apartments.filter(a => a.status === 'Réservé').length;
  const available = apartments.filter(a => a.status === 'Disponible').length;
  const totalRevenueSold = apartments.filter(a => a.status === 'Vendu').reduce((sum, a) => sum + a.prixMAD, 0);
  const totalRevenueReserved = apartments.filter(a => a.status === 'Réservé').reduce((sum, a) => sum + a.prixMAD, 0);
  const absorptionRate = Math.round(((sold + reserved) / totalUnits) * 100);

  return { totalUnits, sold, reserved, available, totalRevenueSold, totalRevenueReserved, absorptionRate };
};

export const salesByMonth = [
  { month: 'Jan', ventes: 3, reservations: 2, ca: 5_820_000 },
  { month: 'Fév', ventes: 2, reservations: 3, ca: 4_100_000 },
  { month: 'Mar', ventes: 4, reservations: 1, ca: 8_200_000 },
  { month: 'Avr', ventes: 2, reservations: 2, ca: 4_560_000 },
  { month: 'Mai', ventes: 3, reservations: 4, ca: 6_950_000 },
  { month: 'Jun', ventes: 1, reservations: 3, ca: 2_100_000 },
  { month: 'Jul', ventes: 2, reservations: 2, ca: 4_800_000 },
];

export const budgetByProject = [
  { project: 'Urban Grove', budget: 120_000_000, depense: 78_500_000, reste: 41_500_000 },
  { project: 'Sky Garden', budget: 210_000_000, depense: 185_000_000, reste: 25_000_000 },
  { project: 'Panorama', budget: 75_000_000, depense: 65_100_000, reste: 9_900_000 },
];

export const projectProgress = [
  { project: 'Urban Grove by Sky Park', global: 52, grosOeuvre: 78, secondOeuvre: 10, vrd: 0, commercial: 68 },
  { project: 'Sky Garden', global: 76, grosOeuvre: 92, secondOeuvre: 15, vrd: 85, commercial: 82 },
  { project: 'Résidence Panorama', global: 71, grosOeuvre: 100, secondOeuvre: 62, vrd: 100, commercial: 77 },
];
