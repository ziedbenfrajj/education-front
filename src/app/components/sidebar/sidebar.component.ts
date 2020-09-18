import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  constructor(private _authService: AuthenticationService) {}

  ngOnInit() {}

  //return true if exist role
  isAutheticated() {
    return this._authService.isAutheticated();
  }

  //verify admin or not
  isTeacher() {
    return this._authService.role == "Teacher";
  }

  isStudent() {
    return this._authService.role == "Student";
  }

  userName() {
    console.log(this._authService.username);
    return this._authService.username;
  }
}
