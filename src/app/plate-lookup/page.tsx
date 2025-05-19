// src/app/plate-lookup/page.tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { lookupPlateAction, type PlateLookupState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScanLine, Loader2, CheckCircle, AlertCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Consultando...
        </>
      ) : (
        <>
          <ScanLine className="mr-2 h-4 w-4" /> Consultar Placa
        </>
      )}
    </Button>
  );
}

export default function PlateLookupPage() {
  const initialState: PlateLookupState = { success: false };
  const [state, formAction] = useFormState(lookupPlateAction, initialState);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] py-12">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <ScanLine className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Superpesquisa de Placa</CardTitle>
          <CardDescription>
            Use nossa IA para identificar detalhes do veículo pela placa.
            Insira a placa (ex: BRA2E19 ou ABC1234).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="licensePlate">Número da Placa</Label>
              <Input
                id="licensePlate"
                name="licensePlate"
                placeholder="Ex: ABC1D23"
                required
                className="text-center text-lg tracking-wider"
                aria-describedby="plate-error"
              />
              {state?.errors?.licensePlate && (
                <p id="plate-error" className="text-sm font-medium text-destructive">
                  {state.errors.licensePlate.join(", ")}
                </p>
              )}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
        
        {state?.message && (
          <CardFooter className="flex flex-col items-start">
            <Alert variant={state.success ? "default" : "destructive"} className="w-full mt-4">
              {state.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{state.success ? "Sucesso!" : "Erro!"}</AlertTitle>
              <AlertDescription>
                {state.message}
              </AlertDescription>
            </Alert>
            
            {state.success && state.vehicleDetails && (
              <Card className="w-full mt-4">
                <CardHeader>
                  <CardTitle>Detalhes do Veículo</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm bg-secondary p-4 rounded-md">{state.vehicleDetails}</pre>
                </CardContent>
              </Card>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
