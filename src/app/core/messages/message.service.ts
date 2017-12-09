import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  message: string;
  success: boolean;

  add(message: string, success: boolean) {
    this.message = message;
    this.success = success;
  }

  clear() {
    this.message = undefined;
    this.success = undefined;
  }
}