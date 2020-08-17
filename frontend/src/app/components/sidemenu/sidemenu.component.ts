import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Output ('menuClosed') closeMenu = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeMenuCallBack(){
    this.closeMenu.emit(false);
  }

}
