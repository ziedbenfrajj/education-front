import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { AuthenticationService } from "../auth/auth.service";
import { Marks } from "src/app/models/marks/marks";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MarksService {
  constructor(
    private _http: Http,
    private _authService: AuthenticationService
  ) {}
  private baseUrl: string = "http://localhost:8080/mark";
  // private headers=new Headers({'content-type':'application/json'});
  private header = new Headers({
    Authorization: "Bearer " + this._authService.jwt,
    "Content-Type": "application/json",
  });
  private options = new RequestOptions({ headers: this.header });

  //errorHandler
  errorHandler(error: Response) {
    return Observable.throw(error || "server Error");
  }

  // get all marks
  getMarks() {
    return this._http
      .get(this.baseUrl, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  // get mark
  getmark(id: Number) {
    return this._http
      .get(this.baseUrl + "/" + id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  // delete mark
  deleteMark(id: Number) {
    return this._http
      .delete(this.baseUrl + "/" + id, this.options)
      .catch(this.errorHandler);
  }
  // create mark
  createMark(mark: Marks) {
    return this._http
      .post(this.baseUrl, JSON.stringify(mark), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  // update mark
  updateMark(mark: Marks) {
    return this._http
      .put(this.baseUrl, JSON.stringify(mark), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
}
