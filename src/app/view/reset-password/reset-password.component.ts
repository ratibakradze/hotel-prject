import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  resetPassword() {
    this.auth.ForgotPassword(this.email);
  }
}
