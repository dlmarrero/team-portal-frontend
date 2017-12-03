import { CalendarEvent, EventColor, EventAction } from "calendar-utils";

export class CalEvent<MetaType = any> {
    id?: number;
    start: Date;
    end?: Date;
    title: string;
    type?: string;
    color?: EventColor;
    actions?: EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: MetaType;
}