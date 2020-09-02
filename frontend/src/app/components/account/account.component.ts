import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AddressComponent } from "../address/address.component"
import { AddressService } from 'src/app/services/address.service';
import { AddressModel } from '../../models/address.model'
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  modalRef: MDBModalRef;

  addrs = [];

  constructor( private modalService: MDBModalService,
               private addressService: AddressService,
               private userService: UserService,
               private router: Router
              ) { }

  ngOnInit(): void {
    this.addressService.getAddressesByUserId().subscribe(addrs => {
      this.addrs = addrs;
    })

  }

  showAddressForm(){
    this.modalRef = this.modalService.show(AddressComponent);
    this.modalRef.content.action.subscribe(newAddrs => this.addrs = newAddrs);
  }

  removeAddress(id){
    this.addressService.DeleteAddress(id).subscribe((newAddrs:any) => this.addrs = newAddrs)
  }

  logout(){
    this.userService.logout();
    this.router.navigate([''])
  }


}
