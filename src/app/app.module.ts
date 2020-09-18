import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CollapseModule } from "ngx-bootstrap/collapse";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { StudentComponent } from "./pages/student/student.component";
import { LoginComponent } from "./pages/login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ModalModule } from "ngx-bootstrap/modal";
import { SubjectComponent } from './pages/subject/subject.component';
import { MarkComponent } from './pages/mark/mark.component';
import { DashboardStudentComponent } from './pages/dashboard-student/dashboard-student.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    StudentComponent,
    LoginComponent,
    SubjectComponent,
    MarkComponent,
    DashboardStudentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
