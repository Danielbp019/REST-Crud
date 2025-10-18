import { ArticuloModel } from '../models/mysql/ArticuloModel.js'

export class ArticuloController {

    //Todos los articulos
    static async getArticulos(req, res) {
        try {
            const [datos] = await ArticuloModel.query(
                "SELECT id ,titulo ,cuerpo ,autor ,created_at ,updated_at FROM articulos;")

            res.json(datos);
        } catch (error) {
            res.status(500).json({ error: 'Ha ocurrido un error al obtener todos los artículos' })
        }
    }

    //Articulo por id
    static async getbyidArticulos(req, res) {
        try {
            const id = req.params.id || req.query.id
            const [datos] = await ArticuloModel.query(
                "SELECT id ,titulo ,cuerpo ,autor ,created_at ,updated_at FROM articulos WHERE id = ?", [id])

            if (datos.length === 0) {
                return res.status(404).json({ message: "No se encontro el articulo" })
            }

            res.json(datos)
        } catch (error) {
            res.status(500).json({ error: 'Ha ocurrido un error al obtener el artículo' })
        }
    }

    //Crear articulos
    static async postCreateArticulos(req, res) {
        /* Desde postman los datos no se envian como parametros si no como body, con application/x-www-form-urlencoded activado y Content-Type: "application/json" en el header */
        try {
            const { titulo, cuerpo, autor } = req.body //o req.query para enviar por url pero es mejor el body.

            // Aplica trim a los valores antes de insertarlos en la base de datos
            const tituloLimpio = titulo.trim();
            const cuerpoLimpio = cuerpo.trim();
            const autorLimpio = autor.trim();

            const [datos] = await ArticuloModel.query(
                "INSERT INTO articulos (titulo ,cuerpo ,autor) VALUES (?, ?, ?)", [tituloLimpio, cuerpoLimpio, autorLimpio])

            // Ajuste la respuesta para que se vea exactamente igual a la de laravel
            res.status(201).json({
                success: true, message: "Articulo creado", articulo: {
                    id: datos.insertId,
                    titulo: tituloLimpio,
                    cuerpo: cuerpoLimpio,
                    autor: autorLimpio
                }
            })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Ha ocurrido un error al crear el artículo', error })
        }
    }

    //Editar articulos
    static async putArticulos(req, res) {
        try {
            const id = req.params.id || req.query.id
            const { titulo, cuerpo, autor } = req.body;

            // Aplica trim a los valores antes de actualizarlos en la base de datos
            const tituloLimpio = titulo.trim();
            const cuerpoLimpio = cuerpo.trim();
            const autorLimpio = autor.trim();

            const [datos] = await ArticuloModel.query(
                "UPDATE articulos SET titulo = IFNULL(?, titulo), cuerpo = IFNULL(?, cuerpo), autor = IFNULL(?, autor) WHERE id = ?", [tituloLimpio, cuerpoLimpio, autorLimpio, id])

            if (datos.affectedRows === 0) {
                return res.status(404).json({ message: "No se encontro el articulo" })
            }
            // Ajuste la respuesta para que se vea exactamente igual a la de laravel
            res.status(200).json({
                success: true, message: "Articulo editado", articulo: {
                    id: parseInt(id),
                    titulo: tituloLimpio,
                    cuerpo: cuerpoLimpio,
                    autor: autorLimpio
                }
            })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Ha ocurrido un error al editar el artículo', error })
        }
    }

    //Borrar articulos
    static async DeleteArticulos(req, res) {
        try {
            // Acepta ambas rutas por Parámetros de ruta (http://localhost:8000/api/articulos/13) y Parámetros de consulta (http://localhost:8000/api/articulos/?id=13). La ruta esta definida como /articulos/:id?
            const id = req.params.id || req.query.id
            const [datos] = await ArticuloModel.query(
                "DELETE FROM articulos WHERE id = ?", [id])

            if (datos.affectedRows === 0) {
                return res.status(404).json({ message: "No se encontro el articulo" })
            }
            res.status(204).json({ message: "Articulo eliminado" })
        } catch (error) {
            res.status(500).json({ error: 'Ha ocurrido un error al obtener el artículo' })
        }
    }

}
