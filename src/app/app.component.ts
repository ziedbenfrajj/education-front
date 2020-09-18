import { Component } from "@angular/core";
import { AppService } from "./services/app.service";
import { AuthenticationService } from "./services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "EDUCATION";

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  //load the JWT
  ngOnInit(): void {
    this.authService.loadToken();
  }

  //return true if exist role
  isAutheticated() {
    return this.authService.isAutheticated();
  }
  isTeacher() {
    return this.authService.role == "Teacher";
  }

  isStudent() {
    return this.authService.role == "Student";
  }

  userName() {
    console.log(this.authService.username);
    return this.authService.username;
  }
}
