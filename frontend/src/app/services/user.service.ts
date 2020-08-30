import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverURL = environment.serverURL; 

  constructor(private http:HttpClient) { }

  register(userData){
    return this.http.post(`${this.serverURL}users/register`, userData);
  }

  login(userData){
    return this.http.post(`${this.serverURL}users/login`, userData);
  }

}

