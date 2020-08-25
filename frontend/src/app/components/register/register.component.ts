import { Component, OnInit } from '@angular/core';
import {FormsModule, FormControl, FormGroup, NgForm} from '@angular/forms'
import { invalid } from '@angular/compiler/src/render3/view/util';
import { UserService } from '../../services/user.service'

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


  

  constructor(private userService: UserService) { }

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
