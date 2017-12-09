import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { SharedModule } from "@app/shared";

import { TodoService } from './todo/todo.service';
import { TodoComponent } from "./todo/todo.component";
import { PocsComponent } from './pocs/pocs.component';
import { PocsService } from './pocs/pocs.service';


@NgModule({
  imports: [
    TabsModule,
    SharedModule,
  ],
  declarations: [TodoComponent, PocsComponent],
  providers: [TodoService, PocsService],
  exports: [TodoComponent, PocsComponent]
})
export class AppAsideModule { }
