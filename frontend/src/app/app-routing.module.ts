import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import {ProductComponent} from './components/product/product.component'
import {CartComponent} from './components/cart/cart.component'
import {CheckoutComponent} from './components/checkout/checkout.component'
import {OrdercompeleteComponent} from './components/ordercompelete/ordercompelete.component'
import {RegisterComponent} from './components/register/register.component'
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order/compelete', component: OrdercompeleteComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'user', component: UserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
