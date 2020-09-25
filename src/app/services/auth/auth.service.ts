import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  //the host
  host: string = "http://localhost:8080";
  // jwt variable
  jwt: string;
  //user name
  username;
  //  role
  role: string;

  constructor(private http: HttpClient, private router: Router) {}
  //login
  login(data) {
    return this.http.post(this.host + "/login", data, { observe: "response" });
  }
  //save the token in local storage
  saveToken(jwt: string) {
    //save in local storage
    localStorage.setItem("Token", jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  //decode the jwt
  parseJWT() {
    let jwtHelper = new JwtHelperService();

    let objJWT = jwtHelper.decodeToken(this.jwt);

    //save username
    if (objJWT != null) {
      this.username = objJWT.sub;
      this.role = objJWT.roles;
      console.log(this.role);
    } else {
      console.log("erreur !");
    }
  }

  // verify if it's an Teacher or not
  isTeacher() {
    return this.role == "Teacher";
  }
  // verify if it's an Student or not
  isStudent() {
    return this.role == "Student";
  }
  isAutheticated() {
    return this.role != undefined && (this.isTeacher() || this.isStudent());
  }

  // get the token from local storage
  public getToken(): string {
    return localStorage.getItem("Token");
  }
  //load the token
  loadToken() {
    this.jwt = this.getToken();
    this.parseJWT();
  }
  logout() {
    localStorage.removeItem("Token");
    this.jwt = undefined;
    this.username = undefined;
    this.role = undefined;
    this.router.navigateByUrl("/");
  }
}
