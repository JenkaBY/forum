import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { RoutesConstants } from '../common/routes.constants';
import IMessageService from './interface/imessage.service';
import { Topic } from '../model/topic';
import { Message } from '../model/message';

@Injectable()
export class MessageService implements IMessageService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private  http: Http) {
    }

    getAllMessages(topicId: number): Promise<Message[]> {
      return this.http.get(RoutesConstants.TOPIC + topicId + '/all')
            .toPromise()
            .then(response => {
                return response.json()['content'];
            })
            .catch(error => this.errorHandle(error));
    }

    deleteMessage(id: number): void {
        throw new Error('Method not implemented.');
    }


    updateMessage(message: Message): Promise<Message> {
      return this.http.put(RoutesConstants.MESSAGE + message.id, JSON.stringify(message), {headers: this.headers})
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(error => this.errorHandle(error));
    }

    createMessage(topic: Topic, message: Message): Promise<Message> {
        return null;
    }

    private errorHandle(error): Promise<Topic> {
        console.log(error);
        return null;
    }
}
