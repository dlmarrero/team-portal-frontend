import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTabGroup,
  MatTab,
  MatButton
} from '@angular/material';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { CalendarService } from './calendar.service';
import { CalEvent } from './cal-event.model';


@Component({
  selector: 'dash-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html'
})


export class CalendarComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  // Set up calendar variables
  view: string = 'month';           // Default view
  viewDate: Date = new Date();      // Stores current date to display events
  activeDayIsOpen: boolean = true;
  actions = [                       // Handles edit and delete events
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];
  refresh: Subject<any> = new Subject();

  // Initialize event variables
  events: CalEvent[] = [];
  newEvent: CalEvent;

  // For testing purposes
  modalData: {
    action: string;
    event: CalEvent;
  };

  ngOnInit() {
    this.getEvents();
  }

  constructor(
    private modal: MatDialog, // TODO:  remove when no longer necessary
    private calService: CalendarService) { }


  // *** SERVICE CALL FUNCTIONS
  // TODO:  implement this in service
  addEvent(): void {
    // this.events.push({
    //   title: 'New event',
    //   start: startOfDay(new Date()),
    //   end: endOfDay(new Date()),
    //   color: colors.red,
    //   draggable: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   }
    // });
    // this.refresh.next();
  }

  getEvents() {
    return this.calService.getEvents()
      .subscribe(events => {
        events.forEach(event => event.actions = this.actions);
        this.events = events;
        this.refresh.next();
      })
  }
  // SERVICE CALL FUNCTIONS ***


  // *** EVENT HANDLERS
  dayClicked({ date, events }: { date: Date; events: CalEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
    // Added this because if no events were on selected date, would not change viewDate
    this.viewDate = date;
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  // TODO:  convert this to edit/delete event
  handleEvent(action: string, event: CalEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent);
  }
  // EVENT HANDLERS ***
}

