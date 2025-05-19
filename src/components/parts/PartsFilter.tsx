// src/components/parts/PartsFilter.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Car, Truck, ListFilter } from "lucide-react";

interface PartsFilterProps {
  currentFilter: 'all' | 'car' | 'truck';
  onFilterChange: (filter: 'all' | 'car' | 'truck') => void;
}

export function PartsFilter({ currentFilter, onFilterChange }: PartsFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button 
        variant={currentFilter === 'all' ? 'default': 'outline'} 
        onClick={() => onFilterChange('all')}
        className="bg-primary hover:bg-primary/90 text-primary-foreground data-[variant=outline]:bg-background data-[variant=outline]:text-foreground"
      >
        <ListFilter className="mr-2 h-4 w-4" /> Todos
      </Button>
      <Button 
        variant={currentFilter === 'car' ? 'default': 'outline'} 
        onClick={() => onFilterChange('car')}
        className="bg-primary hover:bg-primary/90 text-primary-foreground data-[variant=outline]:bg-background data-[variant=outline]:text-foreground"
      >
        <Car className="mr-2 h-4 w-4" /> Carros
      </Button>
      <Button 
        variant={currentFilter === 'truck' ? 'default': 'outline'} 
        onClick={() => onFilterChange('truck')}
        className="bg-primary hover:bg-primary/90 text-primary-foreground data-[variant=outline]:bg-background data-[variant=outline]:text-foreground"
      >
        <Truck className="mr-2 h-4 w-4" /> Caminhões
      </Button>
    </div>
  );
}
