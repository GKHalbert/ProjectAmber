import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { userModelRes } from "../models/user.model"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverURL = environment.serverURL; 

  constructor(private http:HttpClient) { }

  afterLogin: String;

  register(userData){
    return this.http.post(`${this.serverURL}users/register`, userData);
  }

  login(userData){
    return this.http.post(`${this.serverURL}users/login`, userData);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getUserInfo(){
    return this.http.get<userModelRes>(`${this.serverURL}users/user`)
  }


}

