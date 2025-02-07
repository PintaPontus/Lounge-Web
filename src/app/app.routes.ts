import {Routes} from '@angular/router';
import {ChatViewComponent} from './chat-view/chat-view.component';
import {EmptyViewComponent} from './empty-view/empty-view.component';
import {LoginComponent} from './login/login.component';
import {authGuard} from './auth.guard';

export const routes: Routes = [
  {path: '', component: EmptyViewComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'chat/:id', component: ChatViewComponent, canActivate: [authGuard]}
];
