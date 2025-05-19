// src/app/parts-search/page.tsx
"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PartCard } from '@/components/parts/PartCard';
import { PartsFilter } from '@/components/parts/PartsFilter';
import { PLACEHOLDER_PARTS, Part } from '@/lib/constants';
import { Search, XCircle } from 'lucide-react';

export default function PartsSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'car' | 'truck'>('all');

  const filteredParts = useMemo(() => {
    return PLACEHOLDER_PARTS.filter((part) => {
      const matchesSearchTerm = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                part.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'all' || part.category === filter || (filter !== 'car' && filter !== 'truck' && part.category === 'generic');
      return matchesSearchTerm && matchesFilter;
    });
  }, [searchTerm, filter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already reactive via filteredParts memo
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Busque por Peças</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Encontre as peças que você precisa para carros e caminhões.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Digite o nome da peça, código ou descrição..."
            className="pl-10 pr-10" // Added pr-10 for clear button
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button 
              type="button"
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setSearchTerm('')}
            >
              <XCircle className="h-5 w-5 text-muted-foreground hover:text-destructive" />
              <span className="sr-only">Limpar busca</span>
            </Button>
          )}
        </div>
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Search className="mr-2 h-4 w-4 md:hidden" /> {/* Icon for mobile */}
          <span className="hidden md:inline">Buscar</span> {/* Text for desktop */}
        </Button>
      </form>

      <PartsFilter currentFilter={filter} onFilterChange={setFilter} />

      {filteredParts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredParts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold">Nenhuma peça encontrada</h3>
          <p className="text-muted-foreground">
            Tente ajustar seus filtros ou termos de busca.
          </p>
        </div>
      )}
    </div>
  );
}
