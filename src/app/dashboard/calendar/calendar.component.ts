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
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatTabGroup,
  MatTab,
  MatButton,
  MatInput,
  MatFormField,
  MatDatepicker,
  MatCheckbox,
  MatSelect
} from '@angular/material';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { CalendarService } from './calendar.service';
import { CalEvent } from './cal-event.model';
import { tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'dash-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html'
})


// TODO:  update events
// TODO:  configure resizing/drag options on incoming events (if not all day, and if team lead allow it)
// TODO:  nothing happens when clicking a day in week or day view.  would be nice if day view allowed a time click
// TODO:  use signalR to push updated events to front end
// TODO:  animate new event slide out
// TODO:  sort daily events by type/name
// TODO:  scrollbar messes with sizing. perfect scrollbar?
// TODO:  add event description, shows only in details (modal)
// TODO:  style navigation buttons
// TODO:  add tooltip to + event to read "New Event"
// TODO:  all event editing should probably be restricted to team leads


export class CalendarComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;  // TODO:  remove when no longer necessary
  @ViewChild('delModal') delModal: TemplateRef<any>;
  @ViewChild('detailsModal') detailsModal: TemplateRef<any>;

  // Set up calendar variables
  view: string = 'month';           // Default view
  viewDate: Date = new Date();      // Stores current date to display events
  activeDayIsOpen: boolean = true;
  actions = [                       // Sets up edit and delete events
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalEvent }): void => {
        this.confirmDel(event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();  // Used to trigger calendar to update

  // Initialize event variables
  events: CalEvent[] = [];
  eventTypes: string[] = ['Volunteer', 'Appointment', 'Event', 'Watch', 'Leave'];
  showAdd: boolean = false;
  eventForm: FormGroup;

  // For testing purposes
  modalData: {
    action?: string;
    event: CalEvent;
  };


  constructor(
    private modal: MatDialog,
    private calService: CalendarService,
    private fb: FormBuilder) { }


  ngOnInit() {
    this.createForm();
    this.calService.events.subscribe(evs => {
      evs.forEach(event => event.actions = this.actions);
      this.events = evs;
      this.refresh.next();
    });
  }

  createForm() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      start: [this.viewDate, Validators.required],
      end: [this.viewDate],
      allDay: [false]
    })
  }


  // *** SERVICE CALL FUNCTIONS
  saveEvent() {
    if (this.eventForm.valid) {
      const formData = this.eventForm.value;

      const newEvent: CalEvent = {
        title: formData.title as string,
        type: formData.type as string,
        start: new Date(formData.start),
        end: new Date(formData.end),
        allDay: formData.allDay as boolean
      }

      this.calService.saveEvent(newEvent)
    }
  }

  delEvent(ev: CalEvent) {
    this.calService.delEvent(ev)
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
    this.viewDate = date;
    // Added this because if no events were on selected date, 
    // it would not change viewDate

    // Update form start and end date to match clicked date
    this.eventForm.patchValue({
      start: date,
      end: date,
    })
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

  confirmDel(event: CalEvent): void {
    this.modalData = { event };
    this.delModalRef = this.modal.open(this.delModal);
  }

  handleEvent(action: string, event: CalEvent): void {
    if (action === 'Clicked') {
      this.modalData = { event };
      this.modal.open(this.detailsModal)
    } else {
      this.modalData = { event, action };
      this.modal.open(this.modalContent);
    }
  }
  // EVENT HANDLERS ***
}

