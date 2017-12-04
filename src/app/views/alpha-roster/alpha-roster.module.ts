import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlphaRosterRoutingModule } from './alpha-roster-routing.module';
import { RosterService } from 'app/services/roster.service';
import { MatTableModule } from "@angular/material";
import { AlphaRosterComponent } from 'app/views/alpha-roster/alpha-roster.component';
@NgModule({
  imports: [
    CommonModule,
    AlphaRosterRoutingModule,
    MatTableModule,
  ],
  declarations: [
    AlphaRosterComponent
  ],
  exports: [AlphaRosterComponent],
  providers: [
    RosterService
  ]
})
export class AlphaRosterModule { }
