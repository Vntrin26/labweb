import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../models/UserModel';
import { UserService } from '../../../services/UserService';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthenticationService } from '../../../services/AuthenticationService';;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  empty = false;
  registerFlag = false;
  allUsers: UserModel[];
  statusCode: number;
  userIdToUpdate = null;
  updateForm = new FormGroup
  ({
  Username: new FormControl('',Validators.required),
  Email: new FormControl('',Validators.compose([Validators.required, Validators.email])),
  Password: new FormControl('',Validators.compose([Validators.required, Validators.min(8)]))
});
registerForm = new FormGroup
({
Username: new FormControl('',Validators.required),
Email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
Password: new FormControl('', Validators.compose([Validators.required, Validators.min(8)])),
PasswordRepeat: new FormControl('', Validators.required),

});

  constructor(private userService: UserService, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getAllUsers();
  }
  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  tasks(){
    this.router.navigate(['/dashboard']);
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
       data => {
        this.allUsers = data;
      },
      errorCode => this.statusCode = errorCode
    );
  }
  deactivateUser(userID){
    this.userService.deactivateUser(userID).subscribe(data=>
      {this,this.userService.getAllUsers();
      console.log(data)
    })
  }
  onSubmit() {

    if(this.userIdToUpdate != null){
      if (this.updateForm.invalid) {
        this.empty = true;
        return; //Validation failed, exit from method.
      }
    let updateThis = this.updateForm.value;
    updateThis.id = this.userIdToUpdate;
     this.userService.updateUser(updateThis).subscribe(data => {
       this.userService.getAllUsers();
        this.getAllUsers();
        });
        this.userIdToUpdate = null;
    } else {
      
    if (this.registerForm.invalid) {
      this.empty = true;
      return; //Validation failed, exit from method.
    }
        let registerThis = this.registerForm.value;
        this.userService.createUser(registerThis).subscribe(data => {
          console.log(data);
          this.getAllUsers();
        });
        this.registerFlag = false;
      }
  }
  loadUserToEdit(UserId: number, Username: string, Password: String, Email: string) {
    //let update
      this.registerFlag = false;
      this.userService.getUserById(UserId)
           .subscribe(update => {
               this.userIdToUpdate = UserId;               
               update.id = this.userIdToUpdate;
               this.updateForm.patchValue({  Username: Username, Password: Password, Email: Email});

         })
  }

}
