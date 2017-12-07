import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TodoService } from "app/components/app-aside/todo/todo.service";
import { FormsModule } from '@angular/forms';
import { TodoComponent } from "./todo/todo.component";
import { PocsComponent } from './pocs/pocs.component';
import { PocsService } from './pocs/pocs.service';
import { PocsFilterPipe } from 'app/core/pipes/filters.pipe';


@NgModule({
  imports: [
    CommonModule,
    TabsModule,
    FormsModule
  ],
  declarations: [ TodoComponent, PocsComponent, PocsFilterPipe ],
  providers: [ TodoService, PocsService ],
  exports: [ TodoComponent, PocsComponent ]
})
export class AppAsideModule { }
