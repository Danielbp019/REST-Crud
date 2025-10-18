import { Component, OnInit, TemplateRef } from '@angular/core';
import { ArticulosService } from '../services/articulos.service';
import { IArticulo } from './articulos';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})

export class ArticulosComponent implements OnInit {

  /* 
  public articulos = [] as any;
  En el código que proporcionas, se define una variable articulos que se inicializa con un arreglo vacío [] y se tipa como any.

  Esta variable se utiliza comúnmente en Angular para almacenar una lista de objetos de tipo IArticulo. La idea es que, cuando la aplicación cargue los datos de los artículos, estos se almacenen en el arreglo articulos.
  */
  public articulos = [] as any;
  public selectedArticulo = <IArticulo>{};
  public modalTitle = '';
  public btnTitle = '';
  //Aqui se agregan mas validaciones para los campos del formulario separadas por comas.
  public titulo = new FormControl('', Validators.required);
  public cuerpo = new FormControl('', Validators.required);
  public autor = new FormControl('', Validators.required);

  /*  
    Si recibes el error "Expected 0-3 arguments, but got 4" al agregar la validación de número mínimo, es posible que se deba a que la versión de Angular que estás utilizando no admite la función Validators.min() con cuatro argumentos.

    Para solucionar esto, puedes usar la función Validators.min(0) que solo tiene un argumento, que es el valor mínimo permitido. De esta manera, se asegura que el valor mínimo permitido sea 0 y no se permitan valores negativos.

      import { Validators } from '@angular/forms';
      public SOLOnumeros = new FormControl(
      '', [
      Validators.required,
      Validators.pattern('^[0-9]*$'), // Solo números permitidos
      Validators.min(0) // Valor mínimo permitido es 0
      ]);
      public SOLOletras = public SOLOletras = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')] );
  */

  public showError = false;
  modalRef?: BsModalRef;

  constructor(private service: ArticulosService, private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>, articulo?: IArticulo) {
    if (articulo) {
      this.modalTitle = 'Editar el articulo';
      this.btnTitle = 'Actualizar';
      this.selectedArticulo = articulo;
      this.titulo.setValue(articulo.titulo);
      this.cuerpo.setValue(articulo.cuerpo);
      this.autor.setValue(articulo.autor);
    } else {
      this.modalTitle = 'Nuevo articulo';
      this.btnTitle = 'Guardar';
      this.reset();
    }
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.service.list()
      .subscribe(response => this.articulos = response);
  }

  /* 
    Este código parece ser una función llamada "delete" que borra un artículo utilizando Angular y RxJS.

    La función toma un parámetro "articulo" del tipo "IArticulo" y llama al método "delete" del servicio "this.service" con el artículo como argumento. Luego, se suscribe a la respuesta del servicio utilizando el método "subscribe" y llama a la función "getList()" cuando recibe una respuesta exitosa.

    Por lo tanto, la función "delete" probablemente borra un artículo utilizando el servicio y luego actualiza la lista de artículos mostrados en la vista. 
  */

  delete(articulo: IArticulo) {
    this.service.delete(articulo)
      .subscribe(response => this.getList());
  }

  save() {
    if (!this.titulo.value || !this.cuerpo.value || !this.autor.value) {
      this.showError = true;
      return;
    }

    this.selectedArticulo.titulo = this.titulo.value;
    this.selectedArticulo.cuerpo = this.cuerpo.value;
    this.selectedArticulo.autor = this.autor.value;

    if (this.btnTitle == 'Actualizar') {
      this.service.update(this.selectedArticulo)
        .subscribe(response => {
          this.getList();
          this.reset();
          this.showError = false;
          this.modalRef?.hide();
        });
    } else {
      this.service.add(this.selectedArticulo)
        .subscribe(response => {
          this.getList();
          this.reset();
          this.showError = false;
          this.modalRef?.hide();
        });
    }
  }

  reset() {
    this.titulo.reset();
    this.cuerpo.reset();
    this.autor.reset();
  }

}