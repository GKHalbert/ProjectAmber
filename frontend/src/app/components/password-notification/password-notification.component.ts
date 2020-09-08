import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-password-notification',
  templateUrl: './password-notification.component.html',
  styleUrls: ['./password-notification.component.scss']
})
export class PasswordNotificationComponent implements OnInit {

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

}
