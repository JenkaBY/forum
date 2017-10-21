import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { RoutesConst } from '../common/routes.constants';
import IMessageService from './interface/imessage.service';
import { Topic } from '../model/topic';
import { Message } from '../model/message';
import { Page } from "../model/page";

@Injectable()
export class MessageService implements IMessageService {
    private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private  http: Http) {
  }

  getAllMessagesBy(topicId: number, urlParams?: URLSearchParams): Promise<Page<Message>> {
    const params = new RequestOptions({params: urlParams});
    console.log("service " + urlParams.toString());
    return this.http.get(RoutesConst.TOPIC + topicId + '/all', params)
            .toPromise()
            .then(response => {
              console.log("from service " + response.json());
              return response.json();
            })
            .catch(error => this.errorHandle(error));
    }

    deleteMessage(id: number): void {
        throw new Error('Method not implemented.');
    }

    updateMessage(message: Message): Promise<Message> {
      return this.http.put(RoutesConst.MESSAGE + message.id, JSON.stringify(message), {headers: this.headers})
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
