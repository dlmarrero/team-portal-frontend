import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Project } from "../models";
import { ProjectsService } from "../projects.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  // TODO:  organize functions by purpose (project mgmt, task mgmt, etc)
  // **** stopping point 12dec: fixed loading issue and href issue. can begin feature by feature

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService
  ) { }

  projectId: number;
  project: Project;
  // TODO:  create Link type
  newLink: object;
  // TODO:  create Task type
  newTask: object;
  newComment: Comment;
  taskedUser: string;
  assignedUsers: string[]; // holds array of users selected while creating task

  editTitle: boolean = false;
  editDescription: boolean = false;
  showConfirmDeleteTask: boolean = false;
  showConfirmDeleteProject: boolean = false;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectsService.projects.subscribe(
        projects => {
          this.project = projects.find(project => project.id == params['id']);
        })
    });
  }

  assignTask(taskedUser) {

  }

  deleteComment(comment) {

  }

  deleteLink(id) {

  }

  deleteProject() {

  }

  deleteTask(task) {

  }

  deleteTaskAssignment(tm, task) {

  }

  deleteTeamMember(id) {

  }

  projectComplete(state: boolean) {
    // save new project completion state
  }

  saveComment(task) {

  }

  saveResource() {

  }

  saveTask() {

  }

  updateProject() {

  }

  unassignTask(user) {

  }


}
