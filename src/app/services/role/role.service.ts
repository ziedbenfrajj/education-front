import { Injectable } from "@angular/core";
import { AuthenticationService } from "../auth/auth.service";
import { Role } from "src/app/models/role/role";
import { Observable } from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  constructor(
    private _http: Http,
    private _authService: AuthenticationService
  ) {}
  private baseUrl: string = "http://localhost:8080/role";
  // private headers=new Headers({'content-type':'application/json'});
  private header = new Headers({
    Authorization: "Bearer " + this._authService.jwt,
    "Content-Type": "application/json",
  });
  private options = new RequestOptions({ headers: this.header });

  private role = new Role();

  /**
   * we have 2 roles here :
   *  #### ADMIN
   *  #### USER
   */

  //errorHandler
  errorHandler(error: Response) {
    return Observable.throw(error || "server Error");
  }

  //get all roles
  getRoles() {
    return this._http
      .get(this.baseUrl, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
}
