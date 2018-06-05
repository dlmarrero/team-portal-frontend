import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { environment } from '@env/environment';

import { Project } from './models';

const apiUrl = environment.apiUrl + '/api/projects';

@Injectable()
export class ProjectsService {
  private _projects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([])
  public projects: Observable<Project[]> = this._projects.asObservable()

  private _pastProjects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
  public pastProjects: Observable<Project[]> = this._pastProjects.asObservable();

  private _currentProjects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
  public currentProjects: Observable<Project[]> = this._currentProjects.asObservable();


  constructor(private http: HttpClient) {
    this.getProjects();
    this.projects.subscribe((projects: Project[]) => {
      this._pastProjects.next(projects.filter(iProject => iProject.complete == true))
      this._currentProjects.next(projects.filter(iProject => iProject.complete == false))
      // console.log(this._pastProjects.getValue())
    });
  }


  getProjects(): Observable<Project[]> {
    let obs = this.http.get<Project[]>(apiUrl)
    obs.subscribe(projects => {
      this._projects.next(projects)
    });
    return obs;
  }

  save(project: Project): Observable<Project> {
    let obs = this.http.post<Project>(apiUrl, project);
    let projects: Project[] = this._projects.getValue();
    obs.subscribe(project => {
      projects.push(project);
      this._projects.next(projects)
    });
    return obs;
  }

  update(project: Project) {
    let projects: Project[] = this._projects.getValue();
    let obs = this.http.put<Project>(apiUrl + `/${project.id}`, project);
    obs.subscribe(() => {
      this._projects.next(projects);
    });
    return obs;
  }

  delete(project: Project) {
    let obs = this.http.delete<Project>(apiUrl + `/${project.id}`);
    obs.subscribe(poc => {
      this._projects.next(this._projects.getValue().filter(iProject => iProject.id !== project.id));
    });
    return obs;
  }


}
