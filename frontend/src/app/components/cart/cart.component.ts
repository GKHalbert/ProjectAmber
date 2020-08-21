import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {CartModelServer} from "../../models/cart.model";
import { CartService} from '../../services/cart.service';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Output ('cartClosed') closeCart = new EventEmitter<boolean>();

  cartData: CartModelServer;

  constructor(private cartService: CartService) { 

  }

  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    console.log(this.cartData);
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

}
