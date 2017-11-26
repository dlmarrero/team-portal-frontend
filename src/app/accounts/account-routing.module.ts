import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "app/accounts/login/login.component";
import { RegisterComponent } from "app/accounts/register/register.component";

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }