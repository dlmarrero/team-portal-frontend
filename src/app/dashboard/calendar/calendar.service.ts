import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';

import { CalEvent, AllEvents } from "./cal-event.model";
import { EventColor } from 'calendar-utils';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

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
    private http: HttpClient,
    private router: Router
  ) { }

  private apiUrl = environment.apiUrl;

  /** GET all events from server */
  getEvents(): Observable<any> {
    return this.http.get<CalEvent[]>(this.apiUrl + '/api/events')
      .map(events => {
        let eventsArray: CalEvent[] = [];
        // let eventsArray = [];
        let color: EventColor;

        events.forEach((calEvent: CalEvent) => {
          // Set up colors
          switch (calEvent.type) {
            case 'volunteer':
              color = colors.green;
              break;
            case 'appointment':
              color = colors.red;
              break;
            case 'event':
              color = colors.blue;
              break;
            // TODO:  make some color palettes
            case 'watch':
              color = colors.yellow;
              break;
            case 'leave':
              color = colors.purple;
              break;
            default:
              break;
          }

          // Build event to pass to array
          let ev: CalEvent = {
            start: new Date(calEvent.start),
            end: new Date(calEvent.end),
            type: calEvent.type,
            title: calEvent.title,
            color: color,
          }

          eventsArray.push(ev);
        })

        return eventsArray;
      })
  }


  /** POST:  register a new user */
  register(registration): Observable<any> {
    return this.http.post(this.apiUrl + '/api/account/register', registration);
    // .subscribe(data => {
    //   this.log('Regisration successful!  Logging you in...', true)
    // }, err => {
    //   this.log(err.error.error_description, false)
    // })
  };
}