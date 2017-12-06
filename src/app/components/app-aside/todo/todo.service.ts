import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Todo } from "./todo.model";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { UserDataService } from 'app/core/services/user-data.service';
import { User } from 'app/core/types/user';

// TODO:  convert form to material
// TODO:  hover to darker green on add todo button

const apiUrl = environment.apiUrl + "/api/todos";

@Injectable()
export class TodoService {
  private _todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(new Array<Todo>());
  public todos: Observable<Todo[]> = this._todos.asObservable();

  private sailorId: string;

  constructor(private http: HttpClient, private userDataService: UserDataService) {
    this.userDataService.userData.subscribe((data: User) => {
      if (data) {
        this.sailorId = data.id;
        this.getToDos(this.sailorId);
      }
    })
  }

  getToDos(id): Observable<Todo[]> {
    let obs = this.http.get<Todo[]>(apiUrl + `?SailorId=${id}`);
    obs.subscribe((todos: Todo[]) => this._todos.next(todos));
    return obs;
  }

  update(todo: Todo) {
    let obs = this.http.put<Todo>(`${apiUrl}/${todo.id}`, todo);
    obs.subscribe((todo: Todo) => {
      let todos: Todo[] = this._todos.getValue();
      let index = todos.indexOf(todo);
      todos[index] = todo;
      this._todos.next(todos)
    })
    return obs;
  }

  save(todo: Todo): Observable<Todo> {
    if (todo.sailorId) {
      this.update(todo)
    } else {
      todo.sailorId = this.sailorId
      let obs = this.http.post<Todo>(apiUrl, todo);
      obs.subscribe((todo: Todo) => {
        let todos: Todo[] = this._todos.getValue();
        todos.push(todo);
        this._todos.next(todos)
      })
      return obs;
    }
  }

  delete(todo: Todo): Observable<Todo> {
    let obs = this.http.delete<Todo>(`${apiUrl}/${todo.id}`);
    obs.subscribe((todo: Todo) => {
      let todos: Todo[] = this._todos.getValue()
      let index = todos.indexOf(todo);
      this._todos.next(todos.filter(td => td.id !== todo.id));
    })
    return obs;
  }
}
