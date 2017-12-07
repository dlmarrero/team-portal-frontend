import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../models'
import { ProjectsService } from '../projects.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  
  @Input() completedProjects: Project[];
  @Input() incompleteProjects: Project[];

  constructor( private projectsService: ProjectsService) { }

  ngOnInit() {
  }

}
