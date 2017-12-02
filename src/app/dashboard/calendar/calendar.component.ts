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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabGroup, MatTab } from '@angular/material';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { CalendarService } from './calendar.service';
import { CalEvent } from 'app/dashboard/calendar/cal-event.model';

// const colors: any = {
//   red: {
//     primary: '#ad2121',
//     secondary: '#FAE3E3'
//   },
//   blue: {
//     primary: '#1e90ff',
//     secondary: '#D1E8FF'
//   },
//   yellow: {
//     primary: '#e3bc08',
//     secondary: '#FDF1BA'
//   }
// };

@Component({
  selector: 'dash-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {
  ngOnInit() {
    this.getEvents();
  }

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  // Default view
  view: string = 'month';

  // Stores current date to display events
  viewDate: Date = new Date();

  // For testing purposes
  modalData: {
    action: string;
    event: CalEvent;
  };

  actions = [
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

  events: CalEvent[] = [];

  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     actions: this.actions
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: new Date(),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   }
  // ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: MatDialog, private calService: CalendarService) { }

  dayClicked({ date, events }: { date: Date; events: CalEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
    // Added this because if no events were on date, would not change viewDate
    this.viewDate = date;
    // Switch to day view on date click
    // this.view = 'day';
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

  handleEvent(action: string, event: CalEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent);
  }

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
}

