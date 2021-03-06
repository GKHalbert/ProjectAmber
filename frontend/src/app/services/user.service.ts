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

  private loggedId: Number;

  register(userData){
    return this.http.post(`${this.serverURL}users/register`, userData);
  }

  login(userData){
    return this.http.post(`${this.serverURL}users/login`, userData);
  }
  
  logout(){
    localStorage.removeItem('token');
    this.afterLogin = null;
    this.loggedId = null;
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

  setLoggedId(id){
    this.loggedId = id;
  }

  getLoggedId(id){
    return this.loggedId;
  }

  changePassword(newPassword){
    return this.http.patch(`${this.serverURL}users/password`, {password: newPassword});
  }


}

