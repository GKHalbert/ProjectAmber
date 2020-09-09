import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {ProductResponseModel} from "../../models/product.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordercompelete',
  templateUrl: './ordercompelete.component.html',
  styleUrls: ['./ordercompelete.component.scss']
})
export class OrdercompeleteComponent implements OnInit {
  
  orderId: Number;
  products;
  cartTotal;
  headElements = ['Name', 'Price', 'Quantity', 'Total'];

  constructor(private router: Router,
              private orderService: OrderService) {
                const navigation = this.router.getCurrentNavigation();
                const state = navigation.extras.state as {
                  message: String,
                  products: ProductResponseModel[],
                  orderId: Number,
                  total: Number
                }

                this.orderId = state.orderId;
                this.products = state.products;
                this.cartTotal = state.total;
                
               }

  ngOnInit(): void {
  }

}
