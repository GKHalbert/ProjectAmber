import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service'
import { userModelRes } from '../../models/user.model'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userInfo;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserInfo()
    .subscribe(
      (res: userModelRes) => {
        this.userInfo = res;
        console.log(this.userInfo);
      },
      err => {

      }
    )
  }

}
