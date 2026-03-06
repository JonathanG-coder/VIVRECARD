// Middleware qui valide les données envoyées avec un schema (ex: Zod)
export const validate = (schema) => (req, res, next ) => {

    // Vérifie si les données du body respectent le schema
    const result = schema.safeParse(req.body)

    // Si la validation échoue on renvoie les erreurs au client
    if(!result.success){
        return res.status(400).json({
            errors : result.error.flatten().fieldErrors,
        });
    }

    // Remplace le body par les données validées et nettoyées
    req.body = result.data;

    // Passe au middleware ou controller suivant
    next()
};
