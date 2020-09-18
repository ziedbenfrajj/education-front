import { AppService } from "./../../services/app.service";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(
    private appService: AppService,
    private authService: AuthenticationService
  ) {}
  isCollapsed = true;
  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
