import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  #subject = new Subject<any>();

  constructor() { }

  sendMessageAndClear(message: string){
    this.sendMessage(message);
    setTimeout(() => {
      this.clearMessage();
    }, 5000);
  }

  sendMessage(message: string){
    this.#subject.next({text: message});
  }

  clearMessage(){
    this.#subject.next({});
  }

  onMessage(): Observable<any>{
    return this.#subject.asObservable();
  }
}
