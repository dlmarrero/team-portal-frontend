import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Todo } from "./todo.model";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const apiUrl = environment.apiUrl + "todos";

@Injectable()
export class TodoService {

  constructor(private http: HttpClient) {  }

  private _todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(new Array<Todo>());
  public todos: Observable<Todo[]> = this._todos.asObservable();

  getToDos(id): Observable<Todo[]> {
    let obs = this.http.get<Todo[]>(apiUrl + `?SailorId=${id}`);
    obs.subscribe((todos: Todo[]) => this._todos.next(todos));
    return obs;
  }

  update(todos: Todo[]) {
    this._todos.next(todos);
  }
}
