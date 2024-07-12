import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllUserResponse } from '../../dtos/getAllUserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllUser(): Observable<GetAllUserResponse> {
    return this.httpClient.get<GetAllUserResponse>('/user/getall', this.httpOptions);
  }
}
