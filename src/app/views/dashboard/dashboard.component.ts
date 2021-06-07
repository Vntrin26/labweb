import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../services/TaskService';
import { TaskModel } from '../../models/TaskModel';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from '../../services/AuthenticationService';
import { formatDate } from '@angular/common';

@Component({
  templateUrl: 'dashboard.component.html'
  
})
export class DashboardComponent implements OnInit {
  empty = false;
  createFlag = false;
  loadingFlag = false;
  taskIdToUpdate = null;
  allTasks: TaskModel[];
  baseTasks:any;
  statusCode: number;
  updateForm = new FormGroup
  ({
  Project: new FormControl('',Validators.required),
  Task: new FormControl('',Validators.required),
  description: new FormControl('',Validators.required),
  date: new FormControl('',Validators.required),
});
createForm = new FormGroup({
  //ID: new FormControl(Validators.required),
  Project: new FormControl('',Validators.required),
  Task: new FormControl('',Validators.required),
  description: new FormControl('',Validators.required),
  date: new FormControl('',Validators.required),
});
constructor(private spinner: NgxSpinnerService, private taskService: TaskService,private activatedRoute: ActivatedRoute,private router: Router, private permissionsService: NgxPermissionsService, 
  private http: HttpClient,  private authenticationService: AuthenticationService) {
  }
  ngOnInit(): void {
    this.getAllTasks();
    //this.spinner.show();
  }
logout(){
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}
  
  loading(){
    while(this.loadingFlag = false){

    }
  }

  navigate(url) {
    this.router.navigate(['dashboard/' + url]);
  }
  users(){
    this.router.navigate(['/users']);
  }
  projects(){
    this.router.navigate(['/projects']);
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe(
       data => {     

        for(var i = 1; i < data.length; i++){
            data[i].finishdate = formatDate(data[i].finishdate, 'yyyy/MM/dd', 'en-US');
        }
        this.allTasks = data;

      },
      errorCode => this.statusCode = errorCode
    );
  }
    onSubmit() {
      if(this.taskIdToUpdate != null){
        if (this.updateForm.invalid) {
          this.empty=true;
          return; //Validation failed, exit from method.
        }
      let updateThis = this.updateForm.value;
      updateThis.id = this.taskIdToUpdate;
      console.log(updateThis.id);
       this.taskService.updateTask(updateThis).subscribe(data => {
         this.taskService.getAllTasks();
          console.log(data);
          this.getAllTasks();
          });
          this.taskIdToUpdate = null;
      } else {
        
      if (this.createForm.invalid) {
        this.empty=true;
        return; //Validation failed, exit from method.
      }
          let createThis = this.createForm.value;
          this.taskService.createTask(createThis).subscribe(data => {
            console.log(data);
            this.getAllTasks();
          });
      
          this.createFlag = false;
        }
    }
    loadTaskToEdit(TaskId: number, project: string, description: String, cas: string, date: string) {
      //let update
        this.createFlag = false;
        this.taskService.getTaskById(TaskId)
             .subscribe(update => {
                 this.taskIdToUpdate = TaskId;               
                 update.id = this.taskIdToUpdate;
                 this.updateForm.setValue({  Project: project, Task: cas, description: description, date:date });

           })
    }

  loadView(view, task_id, tab_id?:string, tab_name?){
   

    this.router.navigate(['/' + view], { queryParams: { task_id: task_id, tab_id: tab_id, tab_name: tab_name}});
    
  }
}
