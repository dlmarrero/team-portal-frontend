import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ProjectsService } from './projects.service';
import { Project } from './models';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {
  constructor(private projectsService: ProjectsService, private router: Router) {
    // Get current URL to control what displays in details window (details or your-projects)
    router.events.subscribe((r: RouterEvent) => this.currentRoute = r.url);
  }

  // TODO:  shows strange behavior.. only works half of the time
  pastProjects$: Observable<Project[]> = this.projectsService.pastProjects;
  currentProjects$: Observable<Project[]> = this.projectsService.currentProjects;

  showYourProjs: boolean = true;
  currentRoute: string;

  ngOnInit() {
  }

}
