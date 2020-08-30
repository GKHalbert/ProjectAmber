import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service'
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { LoginComponent } from './components/login/login.component'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  modalRef: MDBModalRef;

  constructor(private userService: UserService,
              private modalService: MDBModalService){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    if (this.userService.loggedIn()){
      return true;
    }
    else{
      this.userService.afterLogin = state.url;
      this.modalRef = this.modalService.show(LoginComponent);
      return false;
    }

  }
  
}
