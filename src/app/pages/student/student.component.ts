import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/auth/auth.service";
import { UserService } from "src/app/services/user/user.service";
import { RoleService } from "src/app/services/role/role.service";
import { User } from "src/app/models/user/user";
import { Role } from "src/app/models/role/role";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"],
})
export class StudentComponent implements OnInit {
  public operation: string = "";
  public users: User[];
  public user: User;
  public userObj: User = new User();
  public displayPassword: boolean = true;
  private modalRef: BsModalRef;
  // role
  public roles: Role[];
  constructor(
    private _router: Router,
    private _authService: AuthenticationService,
    private _userService: UserService,
    private _roleService: RoleService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.OnGetAllUsers();
    this.onGetRole();
  }

  //get all departements
  OnGetAllUsers() {
    this._userService.getUsers().subscribe(
      (user) => {
        this.users = user;
        console.log(this.users);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // get Role
  onGetRole() {
    this._roleService.getRoles().subscribe(
      (role) => {
        this.roles = role;
        console.log(this.roles);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // add student
  newUser(template: TemplateRef<any>) {
    this.displayPassword = true;
    this.operation = "Add new User";
    this.onGetRole();
    this.modalRef = this.modalService.show(template);
  }
  // update student
  updateStudent(user, template: TemplateRef<any>) {
    // localStorage.setItem("update",departement)
    // this._depService.setter(departement);
    this.displayPassword = false;
    console.log(user);
    this.userObj = user;
    this.onGetRole();
    this.operation = "Edit User";
    this.modalRef = this.modalService.show(template);
  }

  //return true if exist role
  isAutheticated() {
    return this._authService.isAutheticated();
  }

  // //verify admin or not
  // isAdmin() {
  //   return this._authService.role == "ADMIN";
  // }

  // isUser() {
  //   return this._authService.role == "USER";
  // }

  // userName() {
  //   return this._authService.username;
  // }

  processForm() {
    //user.activated=true;
    if (this.userObj.id == undefined) {
      console.log("create  eyy");
      console.log(this.userObj);
      this._userService.createUser(this.userObj).subscribe(
        (user) => {
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("update eyy");
      console.log(this.userObj);
      this._userService.updateUser(this.userObj).subscribe(
        (user) => {
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
    }

    this.decline();
  }

  // show Delete MODAL
  deleteReq(confirmDelete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(confirmDelete, {
      class: "modal-sm",
    });
  }
  confirm(user) {
    this.user = user;
    this.deleteUsers(user);
    this.modalRef.hide();
  }
  //delete user
  deleteUsers(user: User) {
    this._userService.deleteUser(user.id).subscribe(
      () => {
        this.users.splice(this.users.indexOf(user), 1);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  decline(): void {
    this.modalRef.hide();
  }
  // // delete end

  // // user details
  // details(user, userDetail: TemplateRef<any>) {
  //   this.user = user;
  //   this.modalRef = this.modalService.show(userDetail, { class: "modal-sm" });
  // }
}
