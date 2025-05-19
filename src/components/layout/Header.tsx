// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { NAV_ITEMS, APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Wrench, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from "@/components/ui/badge";

export function Header() {
  const { getItemCount, isCartLoaded } = useCart();
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Wrench className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">
              {APP_NAME}
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {NAV_ITEMS.filter(item => item.href !== '/login' && item.href !== '/cart').map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Mobile Nav Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center space-x-2 mb-6 px-4">
                <Wrench className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">{APP_NAME}</span>
            </Link>
            <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-2 text-lg rounded-md hover:bg-accent hover:text-accent-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                     {item.href === '/cart' && isCartLoaded && itemCount > 0 && (
                        <Badge variant="destructive" className="ml-auto">{itemCount}</Badge>
                     )}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Mobile App Name (visible when nav is closed) */}
        <div className="flex md:hidden flex-1 items-center">
             <Link href="/" className="flex items-center space-x-2">
                <Wrench className="h-6 w-6 text-primary" />
                <span className="font-bold sm:inline-block">{APP_NAME}</span>
            </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
           <Link href="/cart" passHref>
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {isCartLoaded && itemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button variant="outline" className="hidden sm:inline-flex">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
