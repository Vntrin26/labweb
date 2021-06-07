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

import { TaskModel } from "../models/TaskModel";

@Injectable()
export class TaskService {
  //URL for CRUD operations
  taskUrl = "http://localhost:3000/api/v1/tasks";
  //Create constructor to get Http instance
  constructor(private http: HttpClient) {}

  //Fetch all tasks
  getAllTasks(): Observable<TaskModel[]> {
    let authToken = JSON.parse(localStorage.getItem('currentUser'));
    let cpHeaders = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer "+authToken.token
      })
    };
    let url = this.taskUrl + "/get-task";
    return this.http
      .get(url, cpHeaders)
      .map(this.extractData)
      .catch(this.handleError);
  }


  getTasksURL = 'http://localhost:3000/api/v1/getSpreadsheetsV4/getTasks/';
  public getWorksheet(task_id){
    let authToken = JSON.parse(localStorage.getItem('currentUser'));
    let cpHeaders = {
      headers: new HttpHeaders({
        "Authorization": "Bearer "+authToken.token,
        "Content-Type": "application/json"
      })
    };
    return this.http.get(this.getTasksURL + task_id, cpHeaders).map(data=> data);
  }

  //Create task
  createTask(Task: TaskModel): Observable<any> {
    let authToken = JSON.parse(localStorage.getItem('currentUser'));
    let cpHeaders = {
      headers: new HttpHeaders({
        "Authorization": "Bearer "+authToken.token,
        "Content-Type": "application/json"
      })
    };
    let url = this.taskUrl + "/create-task";
    return this.http
      .post(url, Task, cpHeaders)
      .pipe(catchError(this.handleError));
  }
  //Fetch task by id
  getTaskById(taskId: number): Observable<any> {
    let authToken = JSON.parse(localStorage.getItem('currentUser'));
    let cpHeaders = {
      headers: new HttpHeaders({
        "Authorization": "Bearer "+authToken.token,
        "Content-Type": "application/json"
      })
    };
    console.log(this.taskUrl + "/get-task-by-id?id=" + taskId);
    return this.http
      .get(this.taskUrl + "/get-task-by-id?id=" + taskId, cpHeaders)
      .pipe(catchError(this.handleError));
  }
  //Update task
  updateTask(Task: TaskModel): Observable<any> {
    let authToken = JSON.parse(localStorage.getItem('currentUser'));
    let cpHeaders = {
      headers: new HttpHeaders({
        "Authorization": "Bearer "+authToken.token,
        "Content-Type": "application/json"
      })
    };
    return this.http
      .put(this.taskUrl + "/update-task", Task, cpHeaders)
      .pipe(catchError(this.handleError));
  }
  //Delete task
  deleteTaskById(taskId: string): Observable<number> {
    return this.http
      .delete(this.taskUrl + "/delete-case?id=" + taskId)
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
