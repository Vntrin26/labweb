import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../../models/ProjectModel';
import { ProjectService } from '../../services/ProjectService';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthenticationService } from '../../services/AuthenticationService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit{
  empty = false;
  createFlag = false;
  allProjects: ProjectModel[];
  statusCode: number;
  projectIdToUpdate = null;
  updateForm = new FormGroup
  ({
  Name: new FormControl('',Validators.required),
  finishdate: new FormControl('',Validators.compose([Validators.required])),
});
createForm = new FormGroup
({
Name: new FormControl('',Validators.required),
finishdate: new FormControl('', Validators.compose([Validators.required])),

});

  constructor(private projectService: ProjectService, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getAllProjects();
  }
  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  tasks(){
    this.router.navigate(['/dashboard']);
  }
  getAllProjects() {
    this.projectService.getAllProjects().subscribe(
       data => {
        this.allProjects = data;
        for(var i = 1; i < data.length; i++){
          data[i].finishdate = formatDate(data[i].finishdate, 'yyyy/MM/dd', 'en-US');
        }
      },
      errorCode => this.statusCode = errorCode
    );
  }
  onSubmit() {

    if(this.projectIdToUpdate != null){
      if (this.updateForm.invalid) {
        this.empty = true;
        return; //Validation failed, exit from method.
      }
    let updateThis = this.updateForm.value;
    updateThis.id = this.projectIdToUpdate;
     this.projectService.updateProject(updateThis).subscribe(data => {
       this.projectService.getAllProjects();
        this.getAllProjects();
        });
        this.projectIdToUpdate = null;
    } else {
      
    if (this.createForm.invalid) {
      this.empty = true;
      return; //Validation failed, exit from method.
    }
        let createThis = this.createForm.value;
        this.projectService.createProject(createThis).subscribe(data => {
          console.log(data);
          this.getAllProjects();
        });
        this.createFlag = false;
      }
  }
  loadProjectToEdit(ProjectId: number, Name: string, finishdate: string) {
    //let update
      this.createFlag = false;
      this.projectService.getProjectById(ProjectId)
           .subscribe(update => {
               this.projectIdToUpdate = ProjectId;               
               update.id = this.projectIdToUpdate;
               this.updateForm.patchValue({  Name: Name, finishdate: finishdate});

         })
  }

}
