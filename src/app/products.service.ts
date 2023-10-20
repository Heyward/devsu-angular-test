import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProductsService {

    url = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products";

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorId': 499 })
    };


  constructor( private http: HttpClient) { }

  getAll() {
    return this.http.get<Product[]>(this.url, this.httpOptions);
  } 

  getProductById(id: string) {
    return this.getAll().pipe(
      map(products => products.find(product => product.id === id))
    );
  }

  saveProduct(product: Product) {
    return this.http.post<Product[]>(this.url, product, this.httpOptions);
  }

  editProduct(product: Product) {
    return this.http.put<Product[]>(this.url, product, this.httpOptions);
  }

  
  deleteProduct(product: Product) {
    return this.http.delete<Product[]>(this.url + "?id=" + product.id, this.httpOptions);
  }

  validProductId(productId: string){
    return this.http.get<string>(this.url + "/verification?id=" + productId, this.httpOptions);
  }

}
