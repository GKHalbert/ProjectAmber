import { Component, OnInit } from '@angular/core';
import { CartService} from '../../services/cart.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  opened: boolean = false;

  closeOnClickOutside: boolean = true;
 
  toggleSidebar() {
    this.opened = !this.opened;
  }

  openCart(){
    this.cartService.sendClickEvent();
  }

  

}
