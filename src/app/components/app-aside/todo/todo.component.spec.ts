import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { FormsModule } from '@angular/forms';
import { TodoService } from 'app/components/app-aside/todo/todo.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDataService } from 'app/core/services/user-data.service';
import { AuthService } from 'app/core/services/auth.service';
import { MessageService } from 'app/core/services/message.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [TodoComponent],
      providers: [TodoService, UserDataService, AuthService, MessageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
