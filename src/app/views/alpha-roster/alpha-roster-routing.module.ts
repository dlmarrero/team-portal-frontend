import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlphaRosterComponent } from 'app/views/alpha-roster/alpha-roster.component';

const routes: Routes = [
  {
    path: 'roster',
    component: AlphaRosterComponent
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlphaRosterRoutingModule { }
