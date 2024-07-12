import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private router: Router,
    private loginService: LoginService
  ){}

  navigateToSendForm(){
    this.router.navigate(['send-message']);
  }

  navigateToInbox(){
    this.router.navigate(['inbox']);
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(["/"]);
  }
}
