import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AddressService } from "../../services/address.service"
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  constructor(public modalRef: MDBModalRef,
              private modalService: MDBModalService,
              private addressService: AddressService,
              ) {

              }

  @Input() userId: Number;

  action = new Subject();

  address = {
    fname: "",
    lname: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    pincode: ""

  }

  ngOnInit(): void {
  }


  submitAddress(f: NgForm){
    f.form.markAllAsTouched();
    if(f.form.valid){
      this.addressService.AddAddress(this.address).subscribe(res =>{
        this.modalRef.hide();
        this.action.next(res);
      })
    }
    else{
      console.log("invalid")
    }
  }

}
