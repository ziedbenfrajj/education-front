import { Component, OnInit } from "@angular/core";
import { Marks } from "src/app/models/marks/marks";
import { Subject } from "src/app/models/subject/subject";
import { AuthenticationService } from "src/app/services/auth/auth.service";
import { SubjectService } from "src/app/services/subject/subject.service";
import { MarksService } from "src/app/services/marks/marks.service";

@Component({
  selector: "app-dashboard-student",
  templateUrl: "./dashboard-student.component.html",
  styleUrls: ["./dashboard-student.component.scss"],
})
export class DashboardStudentComponent implements OnInit {
  public marks: Marks[] = [];
  public mark = new Marks();
  public subjects: Subject[];

  // number of users
  public coefficient: number = 0;
  // number of marks
  public markLength: number = 0;
  // number of subjects
  public subjectLength: number = 0;
  // sum of notes
  public sumMarks: number = 0;

  // grade  percentage
  public greater: number = 0;

  public max = 0;
  public percent = 0;

  public username: String = "";
  public notesUser: Marks[] = [];

  constructor(
    private _authService: AuthenticationService,
    private _subjectService: SubjectService,
    private _markService: MarksService
  ) {}

  ngOnInit() {
    this.userName();
    this.onGetSubject();
    this.OnGetAllMarks();
  }
  userName() {
    this.username = this._authService.username;
    return this._authService.username;
  }
  //get all departements
  OnGetAllMarks() {
    this._markService.getMarks().subscribe(
      (mark) => {
        this.marks = mark;
        // numbers of notes

        this.marks.forEach((element) => {
          if (element.user.userName == this.username) {
            this.sumMarks += element.note * element.subject.coefficient;
            this.notesUser.push(element);
          }
        });
        this.markLength = this.notesUser.length;
        // your overall average is ready
        if (this.markLength == this.subjectLength) {
          // show the notification
          document.getElementById("notif-div").style.display = "block";
          var element = document.getElementById("notif");
          element.classList.add("notifications");
        } else {
          console.log("no");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // get subjects
  onGetSubject() {
    this._subjectService.getSubjects().subscribe(
      (subject) => {
        this.subjects = subject;
        this.subjectLength = subject.length;
        this.subjects.forEach((element) => {
          this.coefficient += element.coefficient;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
