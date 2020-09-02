import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AddressModel } from "../models/address.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  serverURL = environment.serverURL; 

  private selectedAddrId;

  constructor(private http: HttpClient) { }

  getAddressesByUserId(){
    return this.http.get<AddressModel[]>(`${this.serverURL}address/userAddr`);
  }

  AddAddress(address){
     return this.http.post(`${this.serverURL}address/new`, address);
  }

  DeleteAddress(id){
    return this.http.delete(`${this.serverURL}address/`+ id);
  }

  setSelectedAddrId(id){
    this.selectedAddrId = id;
  }

  getSelectedAddrId(){
    return this.selectedAddrId;
  }

}
