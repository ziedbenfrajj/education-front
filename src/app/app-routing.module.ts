import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { StudentComponent } from "./pages/student/student.component";
import { SubjectComponent } from "./pages/subject/subject.component";
import { MarkComponent } from "./pages/mark/mark.component";
import { DashboardStudentComponent } from "./pages/dashboard-student/dashboard-student.component";
import { NgIf } from "@angular/common";

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "student", component: StudentComponent },
  { path: "subject", component: SubjectComponent },
  { path: "mark", component: MarkComponent },
  // student
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
