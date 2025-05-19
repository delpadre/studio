// src/app/plate-lookup/actions.ts
"use server";

import { licensePlateLookup, type LicensePlateLookupInput, type LicensePlateLookupOutput } from "@/ai/flows/plate-lookup";
import { z } from "zod";

const PlateLookupFormSchema = z.object({
  licensePlate: z.string().min(6, "A placa deve ter pelo menos 6 caracteres.").max(10, "A placa deve ter no máximo 10 caracteres."),
});

export interface PlateLookupState {
  message?: string | null;
  vehicleDetails?: string | null;
  errors?: {
    licensePlate?: string[];
  } | null;
  success: boolean;
}

export async function lookupPlateAction(
  prevState: PlateLookupState | undefined,
  formData: FormData
): Promise<PlateLookupState> {
  const validatedFields = PlateLookupFormSchema.safeParse({
    licensePlate: formData.get("licensePlate"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro de validação. Verifique os campos.",
      success: false,
    };
  }

  const inputData: LicensePlateLookupInput = {
    licensePlate: validatedFields.data.licensePlate,
  };

  try {
    const result: LicensePlateLookupOutput = await licensePlateLookup(inputData);
    return {
      message: "Consulta realizada com sucesso!",
      vehicleDetails: result.vehicleDetails,
      success: true,
    };
  } catch (error) {
    console.error("AI Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido ao consultar a placa.";
    return {
      message: `Erro na consulta: ${errorMessage}`,
      success: false,
    };
  }
}
