import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidatorFn, FormControl, AbstractControl, FormGroup } from '@angular/forms';


@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: PasswordMatchDirective,
      multi: true
    }]
})
export class PasswordMatchDirective implements Validator {


  validate(c: FormGroup){
    const fstPwd = c.root.get('fstPwd').value;
    const sndPwd = c.value


    if (fstPwd !== sndPwd){
      return {passwordMatchError: true }
    }
    else{    
      return null;
    }


  }

  constructor() { }

}
