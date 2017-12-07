import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'app/projects/projects.service';
import { Project } from 'app/projects/models';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  constructor(private projectsService: ProjectsService) { }

  // TODO:  filter projects into completed and not completed.  maybe make separate inputs for child component
  completedProjects: Project[];
  incompleteProjects: Project[];
  
  private _projects$ = this.projectsService.projects
    .subscribe((projects: Project[]) => {
      this.completedProjects = projects.filter(iProject => iProject.complete == false);
      this.incompleteProjects = projects.filter(iProject => iProject.complete == true);
    })
  
  // completedProjects$ = this.projectsService.projects
  //   .map((projects: Project[]) => projects.filter(iProject => iProject.complete));

  // incompleteProjects$ = this.projectsService.projects
  //   .map((projects: Project[]) => projects.filter(iProject => !iProject.complete));

  ngOnInit() {
  }

}
