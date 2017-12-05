import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'app/guards/auth.guard';
import { AuthInterceptor } from './services/authinterceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from "./services/auth.service";
import { MessageService } from "./services/message.service";
import { UserDataService } from 'app/core/services/user-data.service';
import { MessageComponent } from "app/core/components/message.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessageComponent],
  providers: [
    AuthGuard,
    MessageService,
    UserDataService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  exports: [MessageComponent]
})
export class CoreModule { }
