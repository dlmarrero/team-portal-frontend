import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
// TODO:  remove when no longer needed
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { SharedModule } from "@app/shared";

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarService } from './calendar/calendar.service';

@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
    CalendarModule.forRoot(),
    ChartsModule,
    BsDropdownModule,
    SharedModule
  ],
  declarations: [DashboardComponent, CalendarComponent],
  providers: [CalendarService]
})
export class DashboardModule { }
