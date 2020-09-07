import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import {ProductComponent} from './components/product/product.component'
import {CartComponent} from './components/cart/cart.component'
import {CheckoutComponent} from './components/checkout/checkout.component'
import {OrdercompeleteComponent} from './components/ordercompelete/ordercompelete.component'
import {RegisterComponent} from './components/register/register.component'
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './auth.guard'
import { ProductsComponent } from './components/products/products.component'
import { SearchResultComponent } from './components/search-result/search-result.component'
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'products/:cat', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'order-compelete', component: OrdercompeleteComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'search/:keyword', component: SearchResultComponent},
  { path: 'order/:id', component: OrderDetailComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
