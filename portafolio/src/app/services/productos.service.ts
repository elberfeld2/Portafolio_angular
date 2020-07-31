import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando=true;
  productos:Producto[] = [];
  constructor(public http:HttpClient) {
    this.cargarProductos();
  }


  private cargarProductos(){
    this.http.get("https://angular-html-1bb9a.firebaseio.com/productos_idx.json")
      .subscribe((resp:Producto[])=>{
        this.cargando=false;
        this.productos=resp;
      });
  }
}
