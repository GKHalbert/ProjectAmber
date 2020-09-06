import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title  = "NEW ARRIVALS";
  products: any[] = [];
  limit = 12;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts(this.limit).subscribe(prods =>{
      this.products = prods.products;
      console.log(this.products)
    }
      )
  }

}
