import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { AuthenticationService } from "../auth/auth.service";
import { Observable } from "rxjs";
import { Subject } from "src/app/models/subject/subject";

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  constructor(
    private _http: Http,
    private _authService: AuthenticationService
  ) {}
  private baseUrl: string = "http://localhost:8080/subject";
  // private headers=new Headers({'content-type':'application/json'});
  private header = new Headers({
    Authorization: "Bearer " + this._authService.jwt,
    "Content-Type": "application/json",
  });
  private options = new RequestOptions({ headers: this.header });

  private subject = new Subject();

  //errorHandler
  errorHandler(error: Response) {
    return Observable.throw(error || "server Error");
  }

  // get all Users
  getSubjects() {
    return this._http
      .get(this.baseUrl, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  // get User
  getSubject(id: Number) {
    return this._http
      .get(this.baseUrl + "/" + id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  // delete User
  deleteSubject(id: Number) {
    return this._http
      .delete(this.baseUrl + "/" + id, this.options)
      .catch(this.errorHandler);
  }
  // create User
  createSubject(subject: Subject) {
    console.log(subject);
    return this._http
      .post(this.baseUrl, JSON.stringify(subject), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  // update user
  updateSubject(subject: Subject) {
    console.log(subject);
    return this._http
      .put(this.baseUrl, JSON.stringify(subject), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
}
