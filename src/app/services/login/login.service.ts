import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedIn = false;
  token = "";
  username = "";
  password = "";

  constructor(
    private httpClient: HttpClient,
  ) {
    this.loadSessionData();
    }

  private loadSessionData(): void{
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.token = storedToken;
      this.loggedIn = true;
      this.username = localStorage.getItem('username') || '';
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>('/login', {username, password}).pipe(
      map(data => this.parseLoginResponse(data, username, password))
    );
  }
  
  parseLoginResponse(data: any, username: string, password: string){
    this.loggedIn = true;
        this.token = data.token;
        this.username = username;
        this.password = password;
        this.saveSessionData();
        return data;
  }

  saveSessionData(): void {
    localStorage.setItem("token", this.token);
    localStorage.setItem("username", this.username);
  }

  reLogin(): Observable<any>{
    return this.login(this.username, this.password);
  }

  logout() {
    this.loggedIn = false;
    this.token = "";
    this.username = "";
    this.password = "";
    for (let key in localStorage) {
        localStorage.removeItem(key);
    }
  }
}
