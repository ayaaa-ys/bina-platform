import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, PageId } from '../types';

interface AppContextType {
  logged: boolean;
  currentUser: User | null;
  currentPage: PageId;
  users: User[];
  notifications: number;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (fullName: string, email: string, role: string, password: string) => boolean;
  navigate: (page: PageId) => void;
}

const defaultUsers: User[] = [
  { id: '1', username: 'admin', email: 'admin@valoris.ma', fullName: 'Administrateur Système', role: 'Directeur', password: 'valorisbina', createdAt: '2024-01-01' },
  { id: '2', username: 'direction', email: 'direction@valoris.ma', fullName: 'Abdelatif Aouragh', role: 'PDG', password: 'valoris2024', createdAt: '2024-01-01' },
  { id: '3', username: 'commercial', email: 'commercial@valoris.ma', fullName: 'Équipe Commerciale', role: 'Responsable Commercial', password: 'com2024', createdAt: '2024-01-01' },
];

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [logged, setLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [users, setUsers] = useState<User[]>(defaultUsers);

  const login = useCallback((username: string, password: string): boolean => {
    const user = users.find(u => (u.username === username || u.email === username) && u.password === password);
    if (user) {
      setLogged(true);
      setCurrentUser(user);
      setCurrentPage('home');
      return true;
    }
    return false;
  }, [users]);

  const logout = useCallback(() => {
    setLogged(false);
    setCurrentUser(null);
    setCurrentPage('home');
  }, []);

  const register = useCallback((fullName: string, email: string, role: string, password: string): boolean => {
    const exists = users.find(u => u.email === email);
    if (exists) return false;
    const newUser: User = {
      id: String(Date.now()),
      username: email.split('@')[0],
      email,
      fullName,
      role,
      password,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers(prev => [...prev, newUser]);
    return true;
  }, [users]);

  const navigate = useCallback((page: PageId) => {
    setCurrentPage(page);
  }, []);

  return (
    <AppContext.Provider value={{ logged, currentUser, currentPage, users, notifications: 3, login, logout, register, navigate }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
