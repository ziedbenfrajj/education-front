import { Component, OnInit, TemplateRef } from "@angular/core";
import { Subject } from "src/app/models/subject/subject";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/auth/auth.service";
import { SubjectService } from "src/app/services/subject/subject.service";

@Component({
  selector: "app-subject",
  templateUrl: "./subject.component.html",
  styleUrls: ["./subject.component.scss"],
})
export class SubjectComponent implements OnInit {
  public operation: string = "";
  public subjects: Subject[];
  public subject: Subject;
  public subjectObj: Subject = new Subject();
  private modalRef: BsModalRef;

  private numbersSubjects: number;
  private coefficient: number = 0;

  constructor(
    private _router: Router,
    private _authService: AuthenticationService,
    private _subjectService: SubjectService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.coefficient = 0;
    this.OnGetAllSubjects();
  }

  //get all departements
  OnGetAllSubjects() {
    this._subjectService.getSubjects().subscribe(
      (subject) => {
        this.subjects = subject;
        this.numbersSubjects = this.subjects.length;
        console.log(this.subjects);
        this.subjects.forEach((element) => {
          this.coefficient += element.coefficient;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // add subject
  newSubject(template: TemplateRef<any>) {
    this.operation = "Add new Subject";
    this.modalRef = this.modalService.show(template);
  }

  // update student
  updateSubject(subject, template: TemplateRef<any>) {
    // localStorage.setItem("update",departement)
    // this._depService.setter(departement);
    this.subjectObj = subject;
    this.operation = "Edit Subject";
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
    if (this.subjectObj.id == undefined) {
      this._subjectService.createSubject(this.subjectObj).subscribe(
        (user) => {
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this._subjectService.updateSubject(this.subjectObj).subscribe(
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
  confirm(subject) {
    this.subject = subject;
    this.deleteSubject(subject);
    this.ngOnInit();
    this.modalRef.hide();
  }
  //delete user
  deleteSubject(subject: Subject) {
    this._subjectService.deleteSubject(subject.id).subscribe(
      () => {
        this.subjects.splice(this.subjects.indexOf(subject), 1);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  decline(): void {
    this.ngOnInit();
    this.modalRef.hide();
  }
}
