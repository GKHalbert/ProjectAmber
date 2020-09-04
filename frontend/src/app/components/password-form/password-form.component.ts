import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { NgForm, FormGroup, Validators, FormControl} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {

  constructor(public modalRef: MDBModalRef,
              private userService: UserService) { }

  pwdForm: FormGroup;

  ngOnInit(): void {
    this.pwdForm = new FormGroup({
      fstPwd: new FormControl('', Validators.required),
      sndPwd: new FormControl('', Validators.required),
    })

    this.pwdForm.controls.fstPwd.valueChanges.subscribe(() =>{
      this.sndPwd.updateValueAndValidity();
    })
  }

  get fstPwd(){
    return this.pwdForm.get('fstPwd');
  }

  get sndPwd(){
    return this.pwdForm.get('sndPwd');
  }

  submitPassword(){
      this.pwdForm.markAllAsTouched();
      if (this.pwdForm.valid){
        this.userService.changePassword(this.sndPwd.value).subscribe(res => {
          console.log(res);
        })
      }
      else{
        console.log('invalid');
      }
  }

}
