// src/app/cart/page.tsx
"use client";

import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { MinusCircle, PlusCircle, Trash2, ShoppingCart, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const total = getCartTotal();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrinho Vazio",
        description: "Adicione itens ao carrinho antes de finalizar a compra.",
        variant: "destructive"
      });
      return;
    }
    // Placeholder checkout logic
    toast({
      title: "Compra (Demonstração)",
      description: `Total: R$ ${total.toFixed(2).replace('.', ',')}. Funcionalidade de compra real não implementada.`,
    });
    clearCart(); // Clear cart after "checkout"
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Seu Carrinho de Compras</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Revise seus itens e finalize sua compra.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold">Seu carrinho está vazio</h3>
          <p className="text-muted-foreground mb-4">
            Parece que você ainda não adicionou nenhuma peça.
          </p>
          <Link href="/parts-search">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Buscar Peças
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 shadow-sm">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden flex-shrink-0">
                   <Image 
                    src={item.imageUrl} 
                    alt={item.name} 
                    layout="fill" 
                    objectFit="cover" 
                    data-ai-hint={item.dataAiHint || 'part image'}
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description.substring(0,100)}...</p>
                  <p className="text-md font-medium text-primary mt-1">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-end">
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8">
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <Input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="h-8 w-12 text-center border-0 focus-visible:ring-0" 
                      min="1"
                    />
                    <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive/80 h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>Grátis (Promocional)</span>
                </div>
                <hr />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg" onClick={handleCheckout}>
                  <CreditCard className="mr-2 h-5 w-5" /> Finalizar Compra
                </Button>
                <Button variant="outline" className="w-full" onClick={clearCart}>
                  <Trash2 className="mr-2 h-4 w-4" /> Limpar Carrinho
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
