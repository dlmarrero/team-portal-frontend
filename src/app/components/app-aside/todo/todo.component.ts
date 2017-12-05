import { Component, OnInit } from '@angular/core';
import { TodoService } from "./todo.service";
import { AuthService } from 'app/core/services/auth.service';
import { UserDataService } from 'app/core/services/user-data.service';
import { Todo } from 'app/components/app-aside/todo/todo.model';
import { map } from 'rxjs/operator/map';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  newToDo: Todo = {
    sailorId: undefined,
    dueDate: undefined,
    time: undefined,
    toDoItem: undefined,
    priority: 'low'
  };
  
  constructor(
    private todoService: TodoService,
    private userDataService: UserDataService
  ) { }

  ngOnInit() {
  }

  toggleAdd() {}

  saveToDo() {}
}
