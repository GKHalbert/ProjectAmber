import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../services/product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  id: Number;
  product;
  thumbimages: any[] = [];

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.productService.getProductById(this.id).subscribe(prod =>
        {
          this.product = prod;
          if (prod.images !== null) {
            this.thumbimages = prod.images.split(';');
          }
        })
    })
  }

}
