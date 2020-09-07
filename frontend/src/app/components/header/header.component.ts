import { Component, OnInit, Output, EventEmitter, Testability } from '@angular/core';
import { CartService} from '../../services/cart.service'
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { LoginComponent} from '../login/login.component';
import { CartComponent } from '../cart/cart.component'
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output ('cartOpened') openCart = new EventEmitter<boolean>();
  @Output ('menuOpened') openMenu = new EventEmitter<boolean>();

  modalRef: MDBModalRef;
  
  searchText = '';

  constructor(private cartService: CartService,
              private modalService: MDBModalService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  userNav(){
    if (this.userService.loggedIn()){
      this.router.navigate(['/user'])
    }
    else{
      this.userService.afterLogin = '/user'
      this.modalRef = this.modalService.show(LoginComponent);
    }
    
  }

  openCartModal(){
    this.modalRef = this.modalService.show(CartComponent, {
      class: 'modal-full-height modal-right',
      containerClass: "modal fade right"
    });
  }

  openMenuModal(){
    this.modalRef = this.modalService.show(SidemenuComponent, {
      class: 'modal-dialog modal-full-height modal-left',
      containerClass: "modal fade left"
    });
  }

  search(){
    if(this.searchText){
      this.router.navigate(['search/' + this.searchText]);
    }
  }

  

}
