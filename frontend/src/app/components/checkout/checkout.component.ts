import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartModelServer } from 'src/app/models/cart.model';
import { AddressService } from 'src/app/services/address.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AddressComponent } from '../address/address.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartData: CartModelServer;
  modalRef: MDBModalRef;
  addrs = [];
  selectedAddrId;

  constructor(private modalService: MDBModalService,
              private cartService: CartService,
              private addressService: AddressService,
              private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe(data => 
      this.cartData = data
      );

    this.addressService.getAddressesByUserId().subscribe(addrs => {
        this.addrs = addrs;
        if(addrs){
          this.selectedAddrId = addrs[0].id;
          this.addressService.setSelectedAddrId(this.selectedAddrId);
        }
    })
  }

  placeOrder(){
    this.spinner.show();
    this.cartService.CheckoutFromCart();
  }

  showAddressForm(){
    this.modalRef = this.modalService.show(AddressComponent);
    this.modalRef.content.action.subscribe(newAddrs => this.addrs = newAddrs);
  }

  selectAddress(id){
    this.selectedAddrId = id;
    this.addressService.setSelectedAddrId(id);

  }

}
