import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../services/product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];

  title = 'ALL PRODUCTS'

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.cat.toLowerCase() === 'all'){
        this.productService.getAllProducts().subscribe(prods => {
          this.products = prods.products;
          console.log(this.products);
        })
      }

      else{
        this.productService.getProductByCat(params.cat, 10).subscribe(prods => {
          this.title = params.cat;
          this.products = prods.products;
        })
      }
    })
  }

}
