import { ArticuloSchema } from '../schema/articuloSchema.js';

export const validateArticulo = async (req, res, next) => {
    try {
        // Validamos los datos
        const articulo = await ArticuloSchema.parse(req.body);

        // Si la validación es exitosa, continuamos con el siguiente middleware
        next();
    } catch (error) {
        // Si la validación falla, enviamos una respuesta con estado 400 y los detalles del error
        const errors = error.errors.map(err => ({
            path: err.path[0],
            message: err.message
        }));

        res.status(400).json({ errors });
    }
};
