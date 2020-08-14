import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private subject = new Subject<any>();

  sendClickEvent(){
    this.subject.next();
  }
  
  getClickEvent(){
    return this.subject.asObservable();
  }
}

