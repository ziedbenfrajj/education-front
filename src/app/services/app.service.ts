import { Injectable } from "@angular/core";
import { AuthenticationService } from "./auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class AppService {
  isSidebarPinned = false;
  isSidebarToggeled = false;

  constructor(private _authService: AuthenticationService) {}

  //verify admin or not
  isTeacher() {
    return this._authService.role == "Teacher";
  }

  isStudent() {
    return this._authService.role == "Student";
  }

  toggleSidebar() {
    this.isSidebarToggeled = !this.isSidebarToggeled;
  }

  toggleSidebarPin() {
    this.isSidebarPinned = !this.isSidebarPinned;
  }

  getSidebarStat() {
    return {
      isSidebarPinned: this.isSidebarPinned,
      isSidebarToggeled: this.isSidebarToggeled,
    };
  }
}
