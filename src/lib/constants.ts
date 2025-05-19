import type { LucideIcon } from 'lucide-react';
import { Home, Search, Wrench, ShoppingCart, User, ScanLine } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', href: '/', icon: Home },
  { label: 'Buscar Peças', href: '/parts-search', icon: Search },
  { label: 'Consultar Placa', href: '/plate-lookup', icon: ScanLine },
  { label: 'Carrinho', href: '/cart', icon: ShoppingCart },
  { label: 'Login', href: '/login', icon: User },
];

export interface Part {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'car' | 'truck' | 'generic';
  dataAiHint?: string;
}

export const PLACEHOLDER_PARTS: Part[] = [
  { id: '1', name: 'Filtro de Óleo Bosch', description: 'Filtro de óleo de alta performance para motores a gasolina.', price: 45.90, imageUrl: '/parts/OIP.jpg', category: 'car', dataAiHint: 'oil filter' },
  { id: '2', name: 'Pastilha de Freio TruckMax', description: 'Pastilhas de freio dianteiras para caminhões pesados.', price: 275.00, imageUrl: '/parts/pastilha2.webp', category: 'truck', dataAiHint: 'brake pad' },
  { id: '3', name: 'Vela de Ignição SparkPro', description: 'Jogo com 4 velas de ignição para carros populares.', price: 89.99, imageUrl: '/parts/vela.jpg', category: 'car', dataAiHint: 'spark plug' },
  { id: '4', name: 'Bateria Automotiva Moura', description: 'Bateria selada de 60Ah, 12V.', price: 320.50, imageUrl: '/parts/moura.webp', category: 'generic', dataAiHint: 'car battery' },
  { id: '5', name: 'Amortecedor Dianteiro ', description: 'Par de amortecedores dianteiros para SUVs.', price: 450.00, imageUrl: '/parts/amortecedor.jpg', category: 'car', dataAiHint: 'shock absorber' },
  { id: '6', name: 'Lona de Freio Traseira ', description: 'Jogo de lonas de freio para eixo traseiro de caminhões.', price: 180.75, imageUrl: '/parts/lona2.jpg', category: 'truck', dataAiHint: 'brake lining' },
  { id: '7', name: 'Óleo Lubrificante Sintético lubrax', description: 'Galão de 5 litros de óleo sintético.', price: 150.00, imageUrl: '/parts/oleo.webp', category: 'generic', dataAiHint: 'engine oil' },
  { id: '8', name: 'Pneu Aro 15 Continental', description: 'Pneu de alta durabilidade para carros de passeio.', price: 380.00, imageUrl: '/parts/pneu.jpg', category: 'car', dataAiHint: 'car tire' },
];

export const APP_NAME = "AutoConnect";
export const APP_DESCRIPTION = "Sua oficina conectada ao mundo das autopeças.";
