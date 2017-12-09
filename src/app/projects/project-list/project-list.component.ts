import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Project } from '../models'
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  @Input() pastProjects: Project[];
  @Input() currentProjects: Project[];

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
  }

}
