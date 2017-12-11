import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DraggableHelper } from "../../../../node_modules/angular-draggable-droppable/dist/esm/src/draggable-helper.provider";
import { CalendarModule, CalendarDateFormatter, CalendarUtils, CalendarEventTitleFormatter } from 'angular-calendar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@app/shared';

import { CalendarService } from './calendar.service';
import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CalendarModule, FormsModule, ReactiveFormsModule, MaterialModule, HttpClientModule, BrowserAnimationsModule],
      declarations: [CalendarComponent],
      providers: [CalendarService, CalendarDateFormatter, CalendarUtils, DraggableHelper, CalendarEventTitleFormatter]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
