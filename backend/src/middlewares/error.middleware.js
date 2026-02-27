export const errorHandle = (err, req, res, next) => {
    console.error(err)

    const status = err.status || 500;
    const message = err.message || `Une erreur interne, ou serveur`

    res.status(status).json({
            success: false,
            message
    });
}