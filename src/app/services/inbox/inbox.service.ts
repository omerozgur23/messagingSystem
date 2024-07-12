import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetMessageResponse } from '../../dtos/getMessageResponse';
import { GetMessageDetailRequest } from '../../dtos/getMessageDetailRequest';

@Injectable({
  providedIn: 'root'
})
export class InboxService {
  
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  getMessage(): Observable<GetMessageResponse>{
    return this.httpClient.get<GetMessageResponse>('/message/get', this.httpOptions)
  }

  getMessageDetail(request: GetMessageDetailRequest): Observable<GetMessageResponse> {
    return this.httpClient.post<GetMessageResponse>("/message/getbyid", request, this.httpOptions)
  }

  getUnreadMessages(): Observable<GetMessageResponse> {
    return this.httpClient.get<GetMessageResponse>("/message/unread", this.httpOptions)
  }
}
