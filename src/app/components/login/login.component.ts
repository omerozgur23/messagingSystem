import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrMessages } from './constants/toastrMessage';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = this.fb.nonNullable.group({
    username: '',
    password: '',
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService
  ){}

  login(){
    let username = this.loginForm.get('username')!.value;
    let password = this.loginForm.get('password')!.value;

    this.loginService.login(username, password).subscribe({
        next: () => {
            this.router.navigate(["/home"]);
            this.toastr.success(ToastrMessages.loginSuccess)
        },
        error: (err) => {
          this.toastr.error(ToastrMessages.loginError)
          console.log(err);
        }
      }
    );
  }
}
