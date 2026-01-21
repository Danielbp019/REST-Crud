<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Articulo;
// Validaciones:
use App\Http\Requests\ArticuloStoreRequest;
use App\Http\Requests\ArticuloUpdateRequest;

class ArticuloController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $articulo = Articulo::select('id', 'titulo', 'cuerpo', 'autor', 'created_at', 'updated_at')
                ->get();
            return response()->json($articulo);
        } catch (\Exception $e) {
            \Log::error('Error al obtener la lista de artículos: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error al obtener la lista de artículos.'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArticuloStoreRequest $request)
    {
        try {
            $nuevoArticulo = Articulo::create([
                'titulo' => trim($request['titulo']),
                'cuerpo' => trim($request['cuerpo']),
                'autor' => trim($request['autor'])
            ]);
            // Devolver el artículo creado
            return response()->json(['success' => true, 'message' => 'Se creo correctamente el articulo.', 'articulo' => $nuevoArticulo], 201);
        } catch (\Exception $e) {
            \Log::error('Error al crear el artículo: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error al crear el artículo.'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $articulo = Articulo::findOrFail($id);

            return response()->json($articulo);
        } catch (ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => 'Artículo no encontrado.'], 404);
        } catch (\Exception $e) {
            \Log::error('Error al buscar el artículo: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error al buscar el artículo.'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArticuloUpdateRequest $request, $id)
    {
        try {
            $editarArticulo = Articulo::findOrFail($id);

            // El metodo has verifica si un campo esta presente en la solicitud
            if ($request->has('titulo')) {
                $editarArticulo->titulo = trim($request['titulo']);
            }
            if ($request->has('cuerpo')) {
                $editarArticulo->cuerpo = trim($request['cuerpo']);
            }
            if ($request->has('autor')) {
                $editarArticulo->autor = trim($request['autor']);
            }
            $editarArticulo->save();

            // Devolver el artículo actualizado
            return response()->json(['success' => true, 'message' => 'Se edito correctamente el articulo.', 'articulo' => $editarArticulo], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => 'Artículo no encontrado para actualizar.'], 404);
        } catch (\Exception $e) {
            \Log::error('Error al actualizar el artículo: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error al actualizar el artículo.'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $borrararticulo = Articulo::findOrFail($id);
            $borrararticulo->delete();

            // Si se ejecuta bien.
            return response()->json(['success' => true, 'message' => 'Articulo eliminado correctamente.'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => 'Artículo no encontrado para eliminar.'], 404);
        } catch (\Exception $e) {
            \Log::error('Error al eliminar el artículo: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error al eliminar el artículo.'], 500);
        }
    }

    //End controller
}
