import { Todo } from "app/components/app-aside/todo/todo.model";

export interface User {
    id?: string;
    rate: string;
    rank: string;
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phoneNumber: string;
    team: string;
    adsd: Date;
    heaos: Date;
    seaos: Date;
    prd: Date;
    reportDate: Date;
    tirDate: Date;
    blueBadge: boolean;
    destUIC: string;
    destCommand: string;
    toDos: Todo[];
}