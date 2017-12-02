import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { CalendarModule } from 'angular-calendar';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatTabsModule, MatDialogModule } from '@angular/material';


import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarService } from './calendar/calendar.service';

@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    MatTabsModule, MatDialogModule,
    CalendarModule.forRoot(),
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [DashboardComponent, CalendarComponent],
  providers: [CalendarService]
})
export class DashboardModule { }