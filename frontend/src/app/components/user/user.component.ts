import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service'
import { userModelRes } from '../../models/user.model'
import { onErrorResumeNext } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userInfo;
  orders = [];

  constructor(private userService: UserService,
              private orderService: OrderService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserInfo()
    .subscribe(
      (res: userModelRes) => {
        this.userInfo = res;

        this.orderService.getOrderByUser(this.userInfo.userId).then(orderRecords => {
          
          let sameOrder = [];
          let count = 0;
          orderRecords.forEach(orderRecord => {
            
            if ( sameOrder.length === 0 || sameOrder[0].orderId === orderRecord.orderId){
              sameOrder.push(orderRecord);
            }
            else{
              this.orders.push(sameOrder);
              sameOrder = [];
              
              sameOrder.push(orderRecord);
            }

            if (count === orderRecords.length - 1){
              this.orders.push(sameOrder);
            }
            count ++;
          });

          
        })     
    
        
      },
      err => {
        if (err instanceof HttpErrorResponse){
          if (err.status === 401){

          }
        }

      }
    )
  }

  

  orderTotal(order){
    let total = 0;
    order.forEach(element => {
      total += element.price * element.quantity;
    });

    return total;
  }

}
