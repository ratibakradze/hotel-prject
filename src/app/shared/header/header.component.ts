import { Component, OnInit } from '@angular/core';
import { AuthService, HeaderService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuth: boolean = false;

  constructor(private auth: AuthService, private header: HeaderService) {}

  ngOnInit(): void {
    this.isAuth = this.auth.isUserAuth();
    this.header.isAuth.subscribe((res) => {
      this.isAuth = res;
      this.isAuth = this.auth.isUserAuth();
    });
  }

  logOut() {
    this.auth.LogOut();
    this.isAuth = false;
  }
}
