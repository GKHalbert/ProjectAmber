import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService} from '../../services/cart.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output ('cartOpened') openCart = new EventEmitter<boolean>();
  @Output ('menuOpened') openMenu = new EventEmitter<boolean>();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  openCartCallBack(){
    
    this.openCart.emit(true);
  }

  openMenuCallBack(){
    this.openMenu.emit(true);
  }

  

}
