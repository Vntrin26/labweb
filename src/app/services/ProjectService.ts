import { Injectable } from "@angular/core";
import {
  Response,
  Headers,
  URLSearchParams,
  RequestOptions
} from "@angular/http";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/Rx";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

import { ProjectModel } from "../models/ProjectModel";

@Injectable()
export class ProjectService {
  //URL for CRUD operations
  ProjectUrl = "http://localhost:3000/api/v1/projects";
  //Create constructor to get Http instance
  constructor(private http: HttpClient) {}

  //Fetch all Projects
  getAllProjects(): Observable<ProjectModel[]> {
    let authToken = JSON.parse(localStorage.getItem('currentUser'));
    let cpHeaders = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer "+authToken.token
      })
    };
    let url = this.ProjectUrl + "/get-project";
    return this.http
      .get(url, cpHeaders)
      .map(this.extractData)
      .catch(this.handleError);
  }



  //Create Project
  createProject(Project: ProjectModel): Observable<any> {
    let authToken = JSON.parse(localStorage.getItem('currentUser'));
    let cpHeaders = {
      headers: new HttpHeaders({
        "Authorization": "Bearer "+authToken.token,
        "Content-Type": "application/json"
      })
    };
    let url = this.ProjectUrl + "/create-project";
    return this.http
      .post(url, Project, cpHeaders)
      .pipe(catchError(this.handleError));
  }
  //Fetch Project by id
  getProjectById(ProjectId: number): Observable<any> {
    let authToken = JSON.parse(localStorage.getItem('currentUser'));
    let cpHeaders = {
      headers: new HttpHeaders({
        "Authorization": "Bearer "+authToken.token,
        "Content-Type": "application/json"
      })
    };
    return this.http
      .get(this.ProjectUrl + "/get-project-by-id?id=" + ProjectId, cpHeaders)
      .pipe(catchError(this.handleError));
  }
  //Update Project
  updateProject(Project: ProjectModel): Observable<any> {
    let authToken = JSON.parse(localStorage.getItem('currentUser'));
    let cpHeaders = {
      headers: new HttpHeaders({
        "Authorization": "Bearer "+authToken.token,
        "Content-Type": "application/json"
      })
    };
    return this.http
      .put(this.ProjectUrl + "/update-project", Project, cpHeaders)
      .pipe(catchError(this.handleError));
  }
  //Delete Project
  deleteProjectById(ProjectId: string): Observable<number> {
    return this.http
      .delete(this.ProjectUrl + "/delete-case?id=" + ProjectId)
      .map(success => {
        console.log(success);
        return JSON.parse(JSON.stringify(success));
      })
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = JSON.parse(JSON.stringify(res));
    return body;
  }

  private handleError (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }
}
