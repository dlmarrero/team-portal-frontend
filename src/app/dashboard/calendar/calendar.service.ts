import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
  private apiUrl = environment.apiUrl + '/api/events/';

  private _events: BehaviorSubject<CalEvent[]> = new BehaviorSubject(new Array<CalEvent>());
  public events: Observable<CalEvent[]> = this._events.asObservable();


  constructor(
    private http: HttpClient
  ) { this.getEvents() }


  /** Populate events */
  getEvents(): Observable<any> {
    let obs = this.http.get<CalEvent[]>(this.apiUrl)
      .map(events => {
        events.forEach((event: CalEvent) => {
          event.start = new Date(event.start);
          event.end = new Date(event.end) || undefined; // all day events have no end
          event.color = this.setColor(event.type);
        });
        return events;
      });

    obs.subscribe(events => this._events.next(events));
    return obs;
  }

  /** Save a new event to database */
  saveEvent(ev: CalEvent): Observable<any> {
    let obs = this.http.post(this.apiUrl, ev)
      .map((event: CalEvent) => {
        event.start = new Date(event.start);
        event.end = new Date(event.end) || undefined;
        event.color = this.setColor(event.type);

        return event;
      });

    obs.subscribe((event: CalEvent) => {
      let evs: CalEvent[] = this._events.getValue();
      evs.push(event);
      this._events.next(evs);
    });

    return obs
  };

  updateEvent(updatedEv: CalEvent): Observable<any> {
    let obs = this.http.put(this.apiUrl + updatedEv.id.toString(), updatedEv)
    obs.subscribe((event: CalEvent) => {
      let evs: CalEvent[] = this._events.getValue();
      let index = evs.indexOf(updatedEv)
      evs[index] = updatedEv;
      this._events.next(evs);
    });
    return obs;
  }

  /** Delete an event */
  delEvent(deletedEv: CalEvent): Observable<any> {
    let obs = this.http.delete(this.apiUrl + deletedEv.id.toString())
    obs.subscribe((event: CalEvent) => {
      this._events.next(this._events.getValue().filter(iEvent => iEvent !== deletedEv));
    });
    return obs;
  }

  /** Set up event colors */
  setColor(evType) {
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