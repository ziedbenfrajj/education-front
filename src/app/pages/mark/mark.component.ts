import { Component, OnInit, TemplateRef } from "@angular/core";
import { Marks } from "src/app/models/marks/marks";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subject } from "src/app/models/subject/subject";
import { User } from "src/app/models/user/user";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/auth/auth.service";
import { UserService } from "src/app/services/user/user.service";
import { SubjectService } from "src/app/services/subject/subject.service";
import { MarksService } from "src/app/services/marks/marks.service";

@Component({
  selector: "app-mark",
  templateUrl: "./mark.component.html",
  styleUrls: ["./mark.component.scss"],
})
export class MarkComponent implements OnInit {
  public operation: string = "";
  public marks: Marks[];
  public mark: Marks;
  public markObj: Marks = new Marks();
  private modalRef: BsModalRef;
  // role
  public subjects: Subject[];
  public users: User[];
  constructor(
    private _router: Router,
    private _authService: AuthenticationService,
    private _userService: UserService,
    private _subjectService: SubjectService,
    private _markService: MarksService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.OnGetAllUsers();
    this.onGetSubject();
    this.onGetUsers();
  }

  //get all departements
  OnGetAllUsers() {
    this._markService.getMarks().subscribe(
      (mark) => {
        this.marks = mark;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // get subjects
  onGetSubject() {
    this._subjectService.getSubjects().subscribe(
      (role) => {
        this.subjects = role;
        console.log(this.subjects);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // get users
  onGetUsers() {
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

  // add student
  newUser(template: TemplateRef<any>) {
    this.operation = "Add new Mark";
    this.onGetSubject();
    this.onGetUsers();
    this.modalRef = this.modalService.show(template);
  }
  // update student
  updateStudent(user, template: TemplateRef<any>) {
    // localStorage.setItem("update",departement)
    // this._depService.setter(departement);
    this.markObj = user;
    this.onGetSubject();
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
    if (this.markObj.id == undefined) {
      console.log("create  eyy");
      console.log(this.markObj);
      this._markService.createMark(this.markObj).subscribe(
        (user) => {
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("update eyy");
      console.log(this.markObj);
      this._markService.updateMark(this.markObj).subscribe(
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
  confirm(mark) {
    this.mark = mark;
    this.deleteMark(mark);
    this.modalRef.hide();
  }
  //delete user
  deleteMark(mark: Marks) {
    this._markService.deleteMark(mark.id).subscribe(
      () => {
        this.marks.splice(this.marks.indexOf(mark), 1);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  decline(): void {
    this.modalRef.hide();
  }
}
