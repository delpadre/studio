// src/ai/flows/plate-lookup.ts
'use server';
/**
 * @fileOverview License plate lookup AI agent.
 *
 * - licensePlateLookup - A function that handles the license plate lookup process.
 * - LicensePlateLookupInput - The input type for the licensePlateLookup function.
 * - LicensePlateLookupOutput - The return type for the licensePlateLookup function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LicensePlateLookupInputSchema = z.object({
  licensePlate: z.string().describe('The license plate number to lookup.'),
});
export type LicensePlateLookupInput = z.infer<typeof LicensePlateLookupInputSchema>;

const LicensePlateLookupOutputSchema = z.object({
  vehicleDetails: z.string().describe('The details of the vehicle associated with the license plate.'),
});
export type LicensePlateLookupOutput = z.infer<typeof LicensePlateLookupOutputSchema>;

export async function licensePlateLookup(input: LicensePlateLookupInput): Promise<LicensePlateLookupOutput> {
  return licensePlateLookupFlow(input);
}

const prompt = ai.definePrompt({
  name: 'licensePlateLookupPrompt',
  input: {schema: LicensePlateLookupInputSchema},
  output: {schema: LicensePlateLookupOutputSchema},
  prompt: `You are an expert mechanic with deep knowledge of vehicle identification.

You will use the provided license plate to identify the vehicle's details, including make, model, and year.

License Plate: {{{licensePlate}}}`,
});

const licensePlateLookupFlow = ai.defineFlow(
  {
    name: 'licensePlateLookupFlow',
    inputSchema: LicensePlateLookupInputSchema,
    outputSchema: LicensePlateLookupOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
