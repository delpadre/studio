// src/components/parts/PartCard.tsx
"use client";

import Image from 'next/image';
import type { Part } from '@/lib/constants';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Car, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from "@/hooks/use-toast";

interface PartCardProps {
  part: Part;
}

export function PartCard({ part }: PartCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(part);
    toast({
      title: "Item Adicionado!",
      description: `${part.name} foi adicionado ao seu carrinho.`,
    });
  };

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image 
            src={part.imageUrl} 
            alt={part.name} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={part.dataAiHint || 'part image'}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg mb-1">{part.name}</CardTitle>
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant={part.category === 'truck' ? "secondary" : "outline"}>
            {part.category === 'car' ? <Car className="h-4 w-4 mr-1" /> : part.category === 'truck' ? <Truck className="h-4 w-4 mr-1" /> : null}
            {part.category === 'car' ? 'Carro' : part.category === 'truck' ? 'Caminhão' : 'Genérico'}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden text-ellipsis">
          {part.description}
        </CardDescription>
        <p className="text-xl font-semibold text-primary">
          R$ {part.price.toFixed(2).replace('.', ',')}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground whitespace-normal h-auto" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
}
