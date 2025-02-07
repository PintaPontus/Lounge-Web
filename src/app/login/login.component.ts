import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  async onEnter() {
    console.log(`LOGIN WITH ${this.username} - ${this.password}`);
    try {
      await this.authService.login(this.username, this.password);
      await this.router.navigate(['/']);
      console.log(this.authService.getAuthToken());
    } catch (err) {
      console.log(err);
    }
  }
}
