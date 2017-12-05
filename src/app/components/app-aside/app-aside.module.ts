import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TodoService } from "app/components/app-aside/todo/todo.service";
import { FormsModule } from '@angular/forms';
// import { AppAsideComponent } from 'app/components';
import { TodoComponent } from "./todo/todo.component";


@NgModule({
  imports: [
    CommonModule,
    TabsModule,
    FormsModule
  ],
  declarations: [ TodoComponent ],
  providers: [ TodoService ],
  exports: [ TodoComponent ]
})
export class AppAsideModule { }
