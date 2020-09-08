import { Component, OnInit } from '@angular/core';
import {FormsModule, FormControl, FormGroup, NgForm} from '@angular/forms'
import { invalid } from '@angular/compiler/src/render3/view/util';
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { RegisterSuccessComponent } from "../register-success/register-success.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  userData = {fname : '',
  lname : '',
  email : '',
  username: '',
  password : '',
  phone:''}

  userErr: boolean = false;

  userErrMsg = ''

  modalRef: MDBModalRef;
  

  constructor(private userService: UserService,
              private router: Router,
              private modalService: MDBModalService) { }

  ngOnInit(): void {
  }

  disErr(){
    this.userErrMsg = '';
    this.userErr = false;
  }

  onSubmit(f:NgForm){
    this.userErr = false;
    f.form.markAllAsTouched();
    if(f.form.valid){
      this.userService.register(this.userData).subscribe((res: {message: string, success: boolean}) =>{
      console.log(res.message);
      this.router.navigate([''])
      this.modalRef = this.modalService.show(RegisterSuccessComponent, {
        class: "modal-notify modal-success"
      });
     },
     error => {
        f.controls["username"].setErrors({'invalid': true})
        
        this.userErr = true;
        console.log(error.error.message)
        this.userErrMsg = error.error.message;
     }    

     )
    }
    else{
      console.log("invalid");
    }  

    

  }

}
