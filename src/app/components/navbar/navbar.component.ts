import { AppService } from "./../../services/app.service";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { AuthenticationService } from "src/app/services/auth/auth.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(
    private appService: AppService,
    private authService: AuthenticationService,
    private modalService: BsModalService
  ) {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  isCollapsed = true;
  ngOnInit() {}

  logout() {
    this.authService.logout();
  }

  //return true if exist role
  isAutheticated() {
    return this.authService.isAutheticated();
  }

  //verify admin or not
  isTeacher() {
    return this.authService.role == "Teacher";
  }

  isStudent() {
    return this.authService.role == "Student";
  }
}
