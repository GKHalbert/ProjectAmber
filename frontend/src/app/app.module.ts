import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SidebarModule } from 'ng-sidebar';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { CommonModule} from "@angular/common";
import { ToplevelComponent } from './components/toplevel/toplevel.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { OrdercompeleteComponent } from './components/ordercompelete/ordercompelete.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './auth.guard';
import { ProductsComponent } from './components/products/products.component';
import { SearchResultComponent } from './components/search-result/search-result.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    ToplevelComponent,
    SidemenuComponent,
    OrdercompeleteComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ProductsComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    SidebarModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule
  ],
  entryComponents:[LoginComponent],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  AuthGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
