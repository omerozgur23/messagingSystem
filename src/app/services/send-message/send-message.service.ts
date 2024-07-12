import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SendMessageRequest } from '../../dtos/sendMessageRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMessageService {
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private httpClient: HttpClient,) { }

  sendMessage(message: SendMessageRequest): Observable<SendMessageRequest> {
    return this.httpClient.post<SendMessageRequest>('/message/send', message, this.httpOptions)
  }
}
