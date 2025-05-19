import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_NAME, APP_DESCRIPTION, NAV_ITEMS } from "@/lib/constants";
import { ArrowRight, Search, ScanLine, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      title: "Busca Inteligente de Peças",
      description: "Encontre autopeças para carros e caminhões com nosso sistema de busca avançado.",
      icon: <Search className="h-10 w-10 text-primary mb-4" />,
      href: "/parts-search",
      cta: "Buscar Peças",
    },
    {
      title: "Consulta Rápida por Placa",
      description: "Identifique veículos e suas especificações rapidamente usando a placa.",
      icon: <ScanLine className="h-10 w-10 text-primary mb-4" />,
      href: "/plate-lookup",
      cta: "Consultar Placa",
    },
    {
      title: "Compra Simplificada",
      description: "Adicione peças ao carrinho e finalize sua compra de forma fácil e segura.",
      icon: <ShoppingCart className="h-10 w-10 text-primary mb-4" />,
      href: "/cart",
      cta: "Ver Carrinho",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  {APP_NAME}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {APP_DESCRIPTION} Potencialize sua oficina com ferramentas inteligentes.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/parts-search">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-normal h-auto">
                    Buscar  Peças
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/plate-lookup">
                  <Button variant="outline" size="lg">
                    Consultar por Placa
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="/ancora2.png"
              alt="Hero AutoConnect"
              width={400}
              height={400}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              data-ai-hint="automobile service"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Funcionalidades Principais</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore as ferramentas que vão transformar a gestão da sua oficina.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
            {features.map((feature) => (
              <Card key={feature.title} className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center">
                  {feature.icon}
                  <CardTitle className="text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-center">{feature.description}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0">
                  <Link href={feature.href} className="w-full">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground whitespace-normal h-auto">
                      {feature.cta} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Pronto para otimizar sua oficina?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Crie sua conta ou faça login para acessar todas as funcionalidades.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <Link href="/login">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground whitespace-normal h-auto">
                Acessar Minha Conta
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
