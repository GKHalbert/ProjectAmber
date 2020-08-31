import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProductResponseModel, OrderResponseModel} from "../models/product.model"

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderDetails : ProductResponseModel[] = [];
  serverURL = environment.serverURL; 

  constructor(private http: HttpClient) { }

  getOrderById(id){
    return this.http.get<ProductResponseModel[]>(`${this.serverURL}orders/${id}`).toPromise();
  }

  getOrderByUser(id){
    return this.http.get<OrderResponseModel[]>(`${this.serverURL}orders/user/${id}`).toPromise();
  }
}
