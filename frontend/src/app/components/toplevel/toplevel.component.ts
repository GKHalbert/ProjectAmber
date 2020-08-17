import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toplevel',
  templateUrl: './toplevel.component.html',
  styleUrls: ['./toplevel.component.scss']
})
export class ToplevelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.delayAnimation();
  }

  menuOpened: boolean = false;

  cartOpened: boolean = false;

  autofocus : boolean = false;

  cartAnimate: boolean = false;

  closeOnClickOutside: boolean = true;

  delayAnimation(){
    setTimeout(() => {
      this.cartAnimate = true;
    });
  }  

  onToggleCart(opened) {    
    this.cartOpened = opened;
  }

  onToggleMenu(opened) {
    this.menuOpened = opened;
  }

}
