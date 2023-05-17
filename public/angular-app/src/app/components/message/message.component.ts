import { Component, OnDestroy } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnDestroy {

  subscription!:Subscription;

  message!:any;
  constructor(private messageService:MessageService){
    this.subscription = this.messageService.onMessage().subscribe(message => {
      this.message = message;
    });
  }
  
  ngOnDestroy(): void {
    // to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
