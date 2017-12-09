import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ProjectsService } from './projects.service';
import { Project } from './models';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  constructor(private projectsService: ProjectsService, private router: Router) {
    // Get current URL to control what displays in details window (details or your-projects)
    router.events.subscribe((r: RouterEvent) => this.currentRoute = r.url);
  }

  // TODO:  filter projects into completed and not completed.  maybe make separate inputs for child component
  //        may have to create two separate observables if inputs are only passed into directives on creation
  pastProjects: Project[];
  currentProjects: Project[];
  showYourProjs: boolean = true;
  currentRoute: string;

  private _projects$ = this.projectsService.projects
    .subscribe((projects: Project[]) => {
      this.pastProjects = projects.filter(iProject => iProject.complete == true);
      this.currentProjects = projects.filter(iProject => iProject.complete == false);
    })

  ngOnInit() {
  }

}
