import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ProjectsRoutingModule } from './projects-routing.module';

import { ProjectsComponent } from './projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { YourProjectsComponent } from './your-projects/your-projects.component';
import { ProjectsService } from './projects.service';
import { MaterialModule } from '@app/shared';
// import { MatTab } from '@app/core'

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    YourProjectsComponent
  ],
  providers: [ProjectsService]
})
export class ProjectsModule { }
