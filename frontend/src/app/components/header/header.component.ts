import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService} from '../../services/cart.service'
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { LoginComponent} from '../login/login.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output ('cartOpened') openCart = new EventEmitter<boolean>();
  @Output ('menuOpened') openMenu = new EventEmitter<boolean>();

  modalRef: MDBModalRef;

  constructor(private cartService: CartService,
              private modalService: MDBModalService) { }

  ngOnInit(): void {
  }

  openModal(){
    this.modalRef = this.modalService.show(LoginComponent);
  }

  openCartCallBack(){
    
    this.openCart.emit(true);
  }

  openMenuCallBack(){
    this.openMenu.emit(true);
  }

  

}
