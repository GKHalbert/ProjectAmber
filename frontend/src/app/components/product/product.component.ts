import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../services/product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import {CartComponent} from "../cart/cart.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  selectedOption: number = 1;
  id: Number;
  product;
  thumbimages: any[] = [];
  modalRef: MDBModalRef;

  options = [
    { name: "1", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 }
  ]

  constructor(
    private modalService: MDBModalService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.productService.getProductById(this.id).subscribe(prod =>
        {
          this.product = prod;
          if (prod.images !== null) {
            this.thumbimages = prod.images.split(';');
          }
        })
    })
  }

  AddToCart(){
   this.cartService.AddProductToCart(this.id, this.selectedOption);  
   this.modalRef = this.modalService.show(CartComponent, {
    class: 'modal-full-height modal-right',
    containerClass: "modal fade right"
  }); 
  }

  procesDescription(des){
    if (!des){
      return ''
    }
    else{
      return des.replace(new RegExp('\n', 'g'), "<br />");
    }

  }

}
