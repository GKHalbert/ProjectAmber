import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'
import { onErrorResumeNext, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validatingForm: FormGroup;

  errMsg;


  constructor(public modalRef: MDBModalRef,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      loginFormModalUserName: new FormControl('', Validators.required),
      loginFormModalPassword: new FormControl('', Validators.required)
    });

    console.log(this.validatingForm)

    this.loginFormModalUserName.valueChanges.subscribe(()=>{
      if(this.errMsg){
        this.errMsg=null;
        this.loginFormModalPassword.updateValueAndValidity()
      };
    })

    this.loginFormModalPassword.valueChanges.subscribe(()=>{
      if(this.errMsg){
        this.errMsg=null;
        this,this.loginFormModalUserName.updateValueAndValidity();
      }
    })


  }

  get loginFormModalUserName() {
    return this.validatingForm.get('loginFormModalUserName');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }

  loginUser(){
    console.log(this.validatingForm);
    let password = this.loginFormModalPassword;
    password.markAsTouched();
    let username = this.loginFormModalUserName;
    username.markAsTouched();
    
    if(username.valid && password.valid){
      let userData = {username: username.value, password:password.value};
      this.userService.login(userData).subscribe(
        (res: {token}) =>{
          console.log(res);
          localStorage.setItem('token',res.token);
          this.modalRef.hide();

          if (this.userService.afterLogin){
            this.router.navigate([this.userService.afterLogin]);
          }
          
        },
        err =>{
          this.errMsg = err.error;
          this.loginFormModalPassword.setErrors({serverErr:true});
          this.loginFormModalUserName.setErrors({serverErr:true});

        }
      )
    }
    else{
      console.log('invalid');
    }
  }

}
