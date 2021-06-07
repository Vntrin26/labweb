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

import { UserModel } from "../models/UserModel";

@Injectable()
export class UserService {
  //URL for CRUD operations
  userUrl = "http://localhost:3000/api/v1/user";
  //Create constructor to get Http instance
  constructor(private http: HttpClient) {}
  //Fetch all users
  getAllUsers(): Observable<UserModel[]> {
    let authToken = JSON.parse(localStorage.getItem('currentUser'));
    let cpHeaders = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer "+authToken.token
      })
    };
    let url = this.userUrl + "/get-user";
    return this.http
      .get(url, cpHeaders)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //Create user
  createUser(User: UserModel): Observable<any> {
    let authToken = JSON.parse(localStorage.getItem('currentUser'));
    let cpHeaders = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    };
    let url = this.userUrl + "/create-user";
    return this.http
      .post(url, User, cpHeaders)
      .pipe(catchError(this.handleError));
  }
  //Fetch User by id
  getUserById(userId: number): Observable<any> {
    let authToken = JSON.parse(localStorage.getItem('currentUser'));
    let cpHeaders = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer "+authToken.token
      })
    };
    return this.http
      .get(this.userUrl + "/get-user-by-id?id=" + userId, cpHeaders)
      .pipe(catchError(this.handleError));
  }
  //Update user
  updateUser(User: UserModel): Observable<any> {
    let authToken = JSON.parse(localStorage.getItem('currentUser'));
    let cpHeaders = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer "+authToken.token
      })
    };
    //let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: cpHeaders });
    return this.http
      .put(this.userUrl + "/update-user", User, cpHeaders)
      .pipe(catchError(this.handleError));
  }
  deactivateUser(userId: number): Observable<any> {
    let authToken = JSON.parse(localStorage.getItem('currentUser'));
    let cpHeaders = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer "+authToken.token
      })
    };
    //let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: cpHeaders });
    return this.http
      .put(this.userUrl + "/deactivate-user", JSON.parse(JSON.stringify(userId)), cpHeaders)
      .pipe(catchError(this.handleError));
  }
  //Delete user
  deleteUserById(userId: string): Observable<number> {
    return this.http
      .delete(this.userUrl + "/delete-user?id=" + userId)
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
