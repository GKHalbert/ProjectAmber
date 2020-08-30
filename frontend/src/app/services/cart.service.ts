import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, from} from 'rxjs';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras} from '@angular/router';
import { environment } from 'src/environments/environment';
import { CartModelPublic, CartModelServer, OrderConfirmationResponse} from "../models/cart.model";
import {ProductModelServer} from "../models/product.model";
import { trigger } from '@angular/animations';
import { OrderService} from "./order.service"

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartLimit: number = 5;
  serverUrl = environment.serverURL;
  private cartDataClient: CartModelPublic = {prodData : [{incart: 0, id: 0}], total: 0};

  //Cart data variable to store the cart information on frontend
  private cartDataServer: CartModelServer = {
    data: [{
      product: undefined,
      numInCart: 0
    }],
    total: 0
  };

  cartTotal$ = new BehaviorSubject<Number>(0);
  
  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);


  constructor(private productService: ProductService,
              private orderService: OrderService,
              private httpClient: HttpClient,
              private router: Router) { 

                this.cartTotal$.next(this.cartDataServer.total);
                this.cartDataObs$.next(this.cartDataServer);
                
                //Sync local storage data with variables
                //fetch cart data from local storage
                let info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));

                if(info !== null && info !== undefined && info.prodData[0].incart !== 0){
                  //assign the local storage value to data variable
                  this.cartDataClient = info;
                  
                  //loop through each entry and put in the cartDataServer object
                  this.cartDataClient.prodData.forEach( p => {
                    this.productService.getProductById(p.id).subscribe((prodInfo: ProductModelServer) => {
                      if (this.cartDataServer.data[0].numInCart == 0){
                        //add first item to the cart
                        this.cartDataServer.data[0].product = prodInfo;
                        this.cartDataServer.data[0].numInCart = p.incart;
                        this.CaculateTotal();
                        this.cartDataClient.total = this.cartDataServer.total;
                        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
                      }
                      else {
                        //ADD new data to the cart variable
                        this.cartDataServer.data.push(
                          {product: prodInfo, numInCart: p.incart}
                        )
                        this.CaculateTotal();
                        this.cartDataClient.total = this.cartDataServer.total;
                        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
                      }

                      this.cartDataObs$.next({... this.cartDataServer});
                          
                    })
                  }

                  )
                }



              }

  private CaculateTotal(){
    let total= 0;
    this.cartDataServer.data.forEach(p=>{
      let numInCart = p.numInCart;
      let price = p.product.price;

      total = Number((total+ numInCart.valueOf() * price.valueOf()).toFixed(2));
      console.log(total)
    })
    this.cartDataServer.total = total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  AddProductToCart(id: Number, quantity?:number){
    
    this.productService.getProductById(id).subscribe(prod => {
      //If the cart is empty
      if(this.cartDataServer.data[0].product == undefined){
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numInCart = quantity;
        this.CaculateTotal();
        this.cartDataClient.prodData[0].id = prod.id;
        this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({...this.cartDataServer})
      }
      //Cart is not empty
      else{

        
        let index = this.cartDataServer.data.findIndex(p => prod.id === p.product.id);
        //If chosen product is already in cart
        if(index != -1){
          //@ts-ignore
          this.cartDataServer.data[index].numInCart += quantity ;
          if (this.cartDataServer.data[index].numInCart > this.cartLimit){
            this.cartDataServer.data[index].numInCart  = this.cartLimit
          }

          this.cartDataClient.prodData[index].incart =this.cartDataServer.data[index].numInCart;
        }
        //Chosen product is not in cart
        else{
          this.cartDataServer.data.push({
            product:prod,
            numInCart: quantity
          });
          this.cartDataClient.prodData.push({
            id: prod.id,
            incart: quantity
          });
        }

        this.CaculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({...this.cartDataServer});
      }
    })
    
  }

  UpdateCartData(index: number, increase: boolean){
    let data = this.cartDataServer.data[index];

    if (increase){
      //@ts-ignore
      data.numInCart < this.cartLimit ? data.numInCart++ : this.cartLimit;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.CaculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      this.cartDataObs$.next({...this.cartDataServer});
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    }
    else{
      //@ts-ignore
      data.numInCart --;
      if (data.numInCart < 1){
        data.numInCart = 1;
      }

      this.CaculateTotal();
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartDataObs$.next({...this.cartDataServer});
    }

  }

  DeleteProductFromCart(index){
    if(window.confirm('Are you sure you want to delete the item?')){
      this.cartDataServer.data.splice(index,1);
      this.cartDataClient.prodData.splice(index, 1);
      this.CaculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;

      if(this.cartDataClient.total === 0){
        this.cartDataClient = {prodData : [{incart: 0, id: 0}], total: 0};
        this.cartDataServer = {
          data: [{
            product: undefined,
            numInCart: 0
          }],
          total: 0
        };
      }

      this.cartDataObs$.next({...this.cartDataServer});
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      

    }
    else{
      return;
    }
  }
  private subject = new Subject<any>();

  CheckoutFromCart(){
    this.httpClient.post(`${this.serverUrl}orders/payment`, null).subscribe((res: {success: Boolean})=> {
      if (res.success){
        let newOrder = {
          products: this.cartDataClient.prodData
        }
        this.httpClient.post(`${this.serverUrl}orders/new`, newOrder).toPromise().then((orderRes: OrderConfirmationResponse) => {
         this.orderService.getOrderById(orderRes.order_id).then(prods => {
           console.log(prods)
           if (orderRes.success){
             let navExtra: NavigationExtras = {state:{
               message: orderRes.message,
               orderId: orderRes.order_id,
               products: prods,
               total: this.cartDataServer.total
             }};
             this.clearCart();
             //close spinner
             this.router.navigate(['/order/compelete'], navExtra);

           }
         })
        })
      }
    })
  }

  clearCart(){
    this.cartDataServer = {
      data: [{
        product: undefined,
        numInCart: 0
      }],
      total: 0
    };

    this.cartDataObs$.next({...this.cartDataServer});
    this.cartDataClient = {prodData : [{incart: 0, id: 0}], total: 0};
    localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

  }

  sendClickEvent(){
    this.subject.next();
  }
  
  getClickEvent(){
    return this.subject.asObservable();
  }
}

