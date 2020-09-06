import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Output ('menuClosed') closeMenu = new EventEmitter<boolean>();

  constructor(public modalRef: MDBModalRef,
              private productService: ProductService) { }

  categories;

  ngOnInit(): void {
    this.productService.getCategories().subscribe(cats => {
      this.categories = cats;
      console.log(this.categories);

    })
  }

  closeMenuCallBack(){
    this.closeMenu.emit(false);
  }

}
