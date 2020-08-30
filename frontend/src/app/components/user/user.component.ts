import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service'
import { userModelRes } from '../../models/user.model'
import { onErrorResumeNext } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userInfo;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserInfo()
    .subscribe(
      (res: userModelRes) => {
        this.userInfo = res;
        console.log(this.userInfo);
      },
      err => {
        if (err instanceof HttpErrorResponse){
          if (err.status === 401){

          }
        }

      }
    )
  }

}
