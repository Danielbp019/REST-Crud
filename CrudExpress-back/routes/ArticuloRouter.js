import { Router } from 'express'
import { ArticuloController } from '../controllers/ArticuloController.js'
import { validateArticulo } from '../middlewares/validateArticulo.js';

export const articuloRouter = Router()// Se exporta y se declara la clase al mismo tiempo con este codigo

// Siempre que se llaman rutas de este archivo comienzan con la constante articuloRouter.(tipo de ruta)
articuloRouter.get('/', (req, res) => res.send('Ruta del hola desde node y express js'))

// GET todos
articuloRouter.get('/articulos', ArticuloController.getArticulos)
// GET uno solo
articuloRouter.get('/articulos/:id?', ArticuloController.getbyidArticulos)
// POST articulos
articuloRouter.post('/articulos', validateArticulo, ArticuloController.postCreateArticulos)
// DELETE articulos
articuloRouter.delete('/articulos/:id?', ArticuloController.DeleteArticulos)
// PUT articulos
articuloRouter.put('/articulos/:id?', validateArticulo, ArticuloController.putArticulos);