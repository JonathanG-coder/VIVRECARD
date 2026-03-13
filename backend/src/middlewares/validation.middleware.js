export const validate = (schema) => (req, res, next) => {
  // Validation Zod
  const result = schema.safeParse(req.body);

  // Si validation échoue
  if (!result.success) {
    // Renvoi structuré des erreurs côté client
    return res.status(400).json({
      errors: result.error.flatten().fieldErrors, // erreurs par champ
    });
  }

  // Remplace req.body par les données validées et nettoyées
  req.body = result.data;

  next(); // Passe au middleware suivant
};