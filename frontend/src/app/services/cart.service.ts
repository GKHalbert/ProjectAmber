import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CartModelPublic, CartModelServer} from "../models/cart.model";
import {ProductModelServer} from "../models/product.model";
import { trigger } from '@angular/animations';

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
      // @ts-ignore
      total += numInCart * price;
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

  sendClickEvent(){
    this.subject.next();
  }
  
  getClickEvent(){
    return this.subject.asObservable();
  }
}

