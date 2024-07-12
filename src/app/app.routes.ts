import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { loginGuard } from './core/guard/login.guard';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { InboxComponent } from './components/inbox/inbox.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [loginGuard]},
    { path: 'send-message', component: SendMessageComponent },
    { path: 'inbox', component: InboxComponent },
    { path: '**', component: ErrorComponent },
];
