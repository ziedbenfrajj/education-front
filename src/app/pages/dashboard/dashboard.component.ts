import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/auth/auth.service";
import { UserService } from "src/app/services/user/user.service";
import { SubjectService } from "src/app/services/subject/subject.service";
import { MarksService } from "src/app/services/marks/marks.service";
import { Marks } from "src/app/models/marks/marks";
import { User } from "src/app/models/user/user";
import { Subject } from "src/app/models/subject/subject";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public marks: Marks[];
  public mark = new Marks();
  public users: User[];
  public subjects: Subject[];

  // number of users
  public userLength: number = 0;
  // number of marks
  public markLength: number = 0;
  // number of subjects
  public subjectLength: number = 0;

  // grade  percentage
  public greater: number = 0;

  public max = 0;
  public percent = 0;

  // chart

  constructor(
    private _router: Router,
    private _authService: AuthenticationService,
    private _userService: UserService,
    private _subjectService: SubjectService,
    private _markService: MarksService
  ) {}

  ngOnInit() {
    this.OnGetAllUsers();
    this.onGetSubject();
    this.OnGetAllMarks();
  }

  // calculate grade percentage
  gradePercenyage() {
    this.marks.forEach((element) => {
      if (element.note > 10) {
        this.greater += 1;
      }
      if (element.note > this.max) {
        this.max = element.note;
        this.mark = element;
      }
    });
    this.percent = Math.floor((this.greater / this.markLength) * 100);
    var x = 440 - (440 * this.percent) / 100;
    document.getElementById("myChart").style.strokeDashoffset = x.toString();
  }
  //get all marks
  OnGetAllMarks() {
    this._markService.getMarks().subscribe(
      (mark) => {
        this.marks = mark;
        // numbers of notes
        this.markLength = mark.length;
        // grade
        this.gradePercenyage();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //get all users
  OnGetAllUsers() {
    this._userService.getUsers().subscribe(
      (user) => {
        this.users = user;
        this.userLength = user.length;
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
        console.log(this.subjects);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
