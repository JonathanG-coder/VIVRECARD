import { z } from "zod";

// Schéma pour la mise à jour de la localisation
export const updateLocationSchema = z.object({
  latitude: z.number()
    .min(-90, "Latitude invalide")  // valeur minimale GPS
    .max(90, "Latitude invalide"),  // valeur maximale GPS
  longitude: z.number()
    .min(-180, "Longitude invalide")  // valeur minimale GPS
    .max(180, "Longitude invalide")   // valeur maximale GPS
});