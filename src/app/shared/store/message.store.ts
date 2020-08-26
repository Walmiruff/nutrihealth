import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { IMessage } from '../models/message.model';


@Injectable({
    providedIn: 'root'
})
export class MessageStore {

    private messageSource = new ReplaySubject<IMessage>(1);

    message$ = this.messageSource.asObservable();

    set(message: IMessage) {
        this.messageSource.next(message);
    }
}
