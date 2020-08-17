import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService} from '../../services/cart.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Output ('cartClosed') closeCart = new EventEmitter<boolean>();

  constructor(private cartService: CartService) { 

  }

  ngOnInit(): void {
  }

  closeCartCallBack(){
    this.closeCart.emit(false)
  }

}
