import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgForm, FormGroup, Validators, FormControl} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PasswordNotificationComponent} from '../password-notification/password-notification.component'

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {

  successRef: MDBModalRef;

  constructor(
              private modalService: MDBModalService,
              public modalRef: MDBModalRef,
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
          this.modalRef.hide();
          this.successRef = this.modalService.show(PasswordNotificationComponent,{
            class: "modal-notify modal-success"
          });
          
        })
      }
      else{
        console.log('invalid');
      }
  }

}
