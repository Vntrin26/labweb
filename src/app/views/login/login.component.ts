import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/AuthenticationService';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{
    loading = false;
    returnUrl: string;
    statusCode = false;

  loginForm = new FormGroup
  ({
  Username: new FormControl('',Validators.required),
  Password: new FormControl('',Validators.required)
});
constructor(private Route: ActivatedRoute,  private router: Router,  private authenticationService: AuthenticationService) {
  }
  ngOnInit() {
    // reset login status
    //this.authenticationService.logout();
    if(localStorage.getItem('currentUser')!== undefined){
      //this.router.navigate(['/dashboard'])
    }
    // get return url from route parameters or default to '/'
    this.returnUrl = this.Route.snapshot.queryParams['returnUrl'] || '/';
}
gotoRegister(){
    this.router.navigate(['/register']);
}
login() {
  let loginThis = this.loginForm.value;
  this.loading = true;
  this.authenticationService.login(loginThis.Username, loginThis.Password)
      .subscribe(data => {
         console.log(data);
         this.router.navigate(['/dashboard'])
        },
        error => {
           if(error === 401){
             this.statusCode = true;
           }
        }
        
        );
    
}
}
