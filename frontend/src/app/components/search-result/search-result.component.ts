import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  products: any[] = [];
  searchText = '';

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { 

              }

  ngOnInit(): void {

    this.route.params.subscribe(params => {     
      this.productService.getAllProducts().subscribe(prods => {
        this.searchText = params.keyword;
        this.products = this.productService.productFilter(prods.products, this.searchText);
      })
    })

  }

}
