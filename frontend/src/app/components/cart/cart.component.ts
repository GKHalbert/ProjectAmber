import { Component, OnInit } from '@angular/core';
import { CartService} from '../../services/cart.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  clickEventsubscription:Subscription;

  constructor(private cartService: CartService) { 
    this.clickEventsubscription= this.cartService.getClickEvent().subscribe(()=>{
      this.openCart();
    })
  }

  ngOnInit(): void {
  }

  cartOpened: boolean = false;

  closeOnClickOutside: boolean = true;

 
  toggleCart() {
    this.cartOpened = !this.cartOpened;
  }

  openCart() {
    this.cartOpened = true;
  }

}
