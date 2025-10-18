import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArticulo } from '../articulos/articulos';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  //URL del API donde vienen los datos.
  private _url = 'http://localhost:8000/api/articulos';

  constructor(private http: HttpClient) { }

  /* 
  Este código parece ser un método llamado "list" que devuelve un Observable de un arreglo de objetos del tipo "IArticulo" utilizando Angular y RxJS.

  El método utiliza el servicio HttpClient de Angular para realizar una solicitud HTTP GET al endpoint especificado en la variable "_url". La respuesta de la solicitud es de tipo "Observable<IArticulo[]>" y se devuelve directamente desde el método.

  En resumen, este método probablemente se utiliza para obtener una lista de objetos "IArticulo" desde un endpoint HTTP y devuelve un Observable para que el consumidor pueda suscribirse y recibir la respuesta de la solicitud.
  */
  list(): Observable<IArticulo[]> {
    return this.http.get<IArticulo[]>(this._url);
  }

  add(articulo: IArticulo): Observable<IArticulo> {
    return this.http.post<IArticulo>(this._url, articulo);
  }

  update(articulo: IArticulo): Observable<IArticulo> {
    return this.http.put<IArticulo>(`${this._url}/${articulo.id}`, articulo);
  }

  delete(articulo: IArticulo): Observable<boolean> {
    return this.http.delete<boolean>(`${this._url}/${articulo.id}`);
  }

}
