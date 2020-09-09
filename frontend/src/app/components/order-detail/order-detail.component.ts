import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AddressService } from 'src/app/services/address.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderInfo = [];

  shippingAddr;

  constructor(private orderService: OrderService,
              private addressService: AddressService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let orderId = params['id'];
      this.orderService.getOrderById(orderId).then(orderInfo => {
        this.addressService.getAddressByAddrId(orderInfo[0].addrId).subscribe(addr => {
          this.orderInfo = orderInfo;
          this.shippingAddr = addr;
          
          
        })
      } )
    })
  }

  orderTotal(order){
    return this.orderService.orderTotal(order);
  }

}
