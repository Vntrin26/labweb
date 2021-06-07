import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/UserService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'register-form',
  templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
  ngOnInit(){

  }
  constructor(private userService: UserService,private activatedRoute: ActivatedRoute,private router: Router) {
  }
  registerForm = new FormGroup
  ({
  Username: new FormControl('',Validators.required),
  Email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
  Password: new FormControl('', Validators.compose([Validators.required, Validators.min(8)])),
  PasswordRepeat: new FormControl('', Validators.required)

});
onSubmit() {

  if (this.registerForm.invalid) {
      return; //Validation failed, exit from method.
    }
      let registerThis = this.registerForm.value;
      if (registerThis.PasswordRepeat !== registerThis.Password){
        return; //Password matching failed
      }
      this.userService.createUser(registerThis).subscribe(data => {
        this.router.navigate(['/login']);
      });



  }
};