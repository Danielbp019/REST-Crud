import { object, string } from 'zod';

// Definimos el esquema
export const ArticuloSchema = object({
    titulo: string().min(5, { message: 'El título minimo de caracteres es 5' }),
    cuerpo: string().min(5, { message: 'El cuerpo minimo de caracteres es 5' }),
    autor: string().min(5, { message: 'El autor minimo de caracteres es 5' })
});
