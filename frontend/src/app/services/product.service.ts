import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Observable } from 'rxjs';
import { serverResponse, ProductModelServer } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.serverURL;

  constructor(private http: HttpClient) { }

  getAllProducts(limitInput?): Observable<serverResponse> {
    if(limitInput){
      return this.http.get<serverResponse>(this.url + 'products', {
      params: {
        limit: limitInput.toString()
      }
      });
    }
    else
    {
      return this.http.get<serverResponse>(this.url + 'products')
    }
  }

  getProductById(id: Number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.url + 'products/' + id);
  }

  getProductByCat(cat: String, limitInput?): Observable<serverResponse> {
    if(limitInput){
      return this.http.get<serverResponse>(this.url + 'products/category/' + cat,
    {
      params: {
        limit: limitInput.toString()
      }
    });
    }

    else{
      return this.http.get<serverResponse>(this.url + 'products/category/' + cat);
    }
  }

  getCategories(){
    return this.http.get(this.url + 'products/categories/list');
  }

  productFilter(products: ProductModelServer[], keyword: String){
    return products.filter(product =>{
      return product.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase());
    })

  }

}
