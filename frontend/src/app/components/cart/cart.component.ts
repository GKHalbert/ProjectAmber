import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {CartModelServer} from "../../models/cart.model";
import { CartService} from '../../services/cart.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { LoginComponent} from '../login/login.component';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        animate('1s ease-out', style({ opacity: '0' })),
      ]),
    ]),]
})
export class CartComponent implements OnInit {

  @Output ('cartClosed') closeCart = new EventEmitter<boolean>();

  cartData: CartModelServer;

  modalRef: MDBModalRef;

  constructor(public selfModalRef: MDBModalRef,
              private cartService: CartService,
              private userService: UserService,
              private modalService: MDBModalService,
              private router: Router) { 

  }

  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    
  }

  ChangeQuantity(index, increase) {
    this.cartService.UpdateCartData(index, increase);
  }

  RemoveFromCart(index){
    this.cartService.DeleteProductFromCart(index);
  }


  closeCartCallBack(){
    this.closeCart.emit(false)
  }

  toCheckout(){
    this.selfModalRef.hide();
    if (this.userService.loggedIn()){
      this.router.navigate(['/checkout'])
    }
    else{
      this.userService.afterLogin = '/checkout';
      this.modalRef = this.modalService.show(LoginComponent);

    }

  }

}
