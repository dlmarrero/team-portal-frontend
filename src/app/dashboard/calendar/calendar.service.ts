import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { HttpErrorResponse } from '@angular/common/http/src/response';

import { CalEvent } from "./cal-event.model";
import { EventColor } from 'calendar-utils';


const colors: any = {
  red: {
    primary: '#bf2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  green: {
    primary: '#13ee8e',
    secondary: '#b8fadd'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  purple: {
    primary: "#b05af3",
    secondary: "#e9d0fc"
  }
};


@Injectable()
export class CalendarService {
  constructor(
    private http: HttpClient
  ) { }

  private apiUrl = environment.apiUrl;
  public events: CalEvent[] = [];

  /** GET  all events from server */
  getEvents(): Observable<CalEvent[]> {
    return this.http.get<CalEvent[]>(this.apiUrl + '/api/events')
      .map(events => {
        let color: EventColor;

        events.forEach((event: CalEvent) => {

          // Build event to pass to array for view model
          let ev: CalEvent = {
            start: new Date(event.start),
            end: new Date(event.end) || undefined, // all day events have no end
            allDay: event.allDay,
            type: event.type,
            title: event.title,
            color: this.getColor(event.type)
          }
          this.events.push(ev);
        })

        return this.events;
      })
  }

  /** POST  save a new event */
  saveEvent(ev): Observable<any> {
    return this.http.post(this.apiUrl + '/api/events', ev)
      .map((event: CalEvent) => {
        // Build event to pass to array for view model
        let ev: CalEvent = {
          start: new Date(event.start),
          end: new Date(event.end) || undefined, // all day events have no end
          allDay: event.allDay,
          type: event.type,
          title: event.title,
          color: this.getColor(event.type),
        }
        this.events.push(ev);

        this.events.push(event)
        return this.events;
      });
  };

  getColor(evType) {
    // Set up colors
    switch (evType) {
      case 'Volunteer':
        return colors.green;
      case 'Appointment':
        return colors.yellow;
      case 'Event':
        return colors.blue;
      case 'Watch':
        return colors.red;
      case 'Leave':
        return colors.purple;
    }
  }
}