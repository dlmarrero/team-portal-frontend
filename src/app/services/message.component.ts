import { Component } from '@angular/core';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-messages',
  template: `
  <div *ngIf="messageService.message">
    <div [ngClass]="messageService.success ? 'alert alert-success alert-dismissable' : 'alert alert-danger alert-dismissable'"> 
      <a href="#" class="close" (click)="messageService.clear()" aria-label="close" style="color:darkred">&times;</a>
      {{messageService.message}} 
    </div>
  </div>
  `
})
export class MessageComponent {

  constructor(public messageService: MessageService) { }

}
