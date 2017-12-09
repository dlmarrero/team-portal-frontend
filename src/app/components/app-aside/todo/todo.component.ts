import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/Operator/map'

import { UserDataService } from 'app/core/services/user-data.service';
import { AuthService } from 'app/core/services/auth.service';

import { Todo } from './todo.model';
import { TodoService } from "./todo.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  showAdd: boolean = false;
  todos$: Observable<Todo[]>;
  newToDo: Todo = {
    sailorId: undefined,
    dueDate: undefined,
    time: undefined,
    toDoItem: undefined,
    priority: 'low'
  };

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos$ = this.todoService.todos
      .map(todos => {
        return this.sortToDos(todos)
      });
  }

  delToDo(todo: Todo) {
    this.todoService.delete(todo);
  }

  updateToDo(todo: Todo) {
    this.newToDo = todo;
    this.showAdd = true;
    this.todoService.update(this.newToDo)
  }

  saveToDo() {
    this.todoService.save(this.newToDo);
    this.showAdd = false;
    this.newToDo = {
      sailorId: undefined,
      dueDate: undefined,
      time: undefined,
      toDoItem: undefined,
      priority: 'low'
    };
  }

  sortToDos(todos: Todo[]) {
    return todos.sort((t1, t2) => {
      if (t1.dueDate > t2.dueDate) {
        return 1;
      }
      else if (t1.dueDate < t2.dueDate) {
        return -1;
      } else {
        // Dates match, compare times
        if (t1.time > t2.time) {
          return 1;
        }
        else if (t1.time < t2.time) {
          return -1;
        }
        else {
          return 0;
        }
      }
    })
  }
}
