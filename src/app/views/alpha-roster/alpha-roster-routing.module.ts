import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlphaRosterComponent } from 'app/views/alpha-roster/alpha-roster.component';

const routes: Routes = [
  {
    path: '',
    component: AlphaRosterComponent,
    data: {
      title: "roster"
    }
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlphaRosterRoutingModule { }
