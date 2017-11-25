import { RouterModule } from "@angular/router";
import { LoginComponent } from "app/accounts/login/login.component";
import { NgModule } from "@angular/core";

const routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }