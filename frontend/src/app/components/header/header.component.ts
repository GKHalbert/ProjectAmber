import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  opened: boolean = false;

  closeOnClickOutside: boolean = true;
 
  toggleSidebar() {
    this.opened = !this.opened;
  }

  

}
