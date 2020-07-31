import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando=true;
  productos:Producto[] = [];
  productosFiltrado: Producto[] = [];
  constructor(public http:HttpClient) {
    this.cargarProductos();
  }


  private cargarProductos(){

    return new Promise((resolve,reject)=>{
      this.http.get("https://angular-html-1bb9a.firebaseio.com/productos_idx.json")
        .subscribe((resp:Producto[])=>{
          this.cargando=false;
          this.productos=resp;
          resolve();
        });
    })
  }

  public getProducto(id:string){
    return this.http.get(`https://angular-html-1bb9a.firebaseio.com/productos/${id}.json`);
  }
  public buscarProducto(termino:string){
    if(this.productos.length === 0){
      this.cargarProductos().then(()=>{
        this.filtrarProductos(termino);
      });
    }
    else{

        this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino:string){
    termino = termino.toLocaleLowerCase();
    this.productosFiltrado = this.productos.filter(producto=>{
      return  producto.categoria.indexOf(termino) >= 0 ||
              producto.titulo.toLocaleLowerCase().indexOf(termino) >= 0 ;
    });
  }
}
