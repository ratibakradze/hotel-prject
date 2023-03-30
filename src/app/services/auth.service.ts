import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private Header: HeaderService
  ) {}
  public Login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', res.user!.uid);
        if (res.user?.emailVerified) {
          this.router.navigateByUrl('/');
          this.Header.isAuth.next(true);
        } else {
          this.router.navigateByUrl('/verify-email/info');
        }
      },
      (err) => {
        console.log(err);
        this.router.navigateByUrl('/login');
      }
    );
  }

  public Register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        this.SendEmailForVerification(res.user);
      },
      (err) => {
        console.log(err);
        this.router.navigateByUrl('/register');
      }
    );
  }

  public LogOut() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
        this.Header.isAuth.next(false);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public ForgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigateByUrl('/verify-email/info');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public SendEmailForVerification(user: any) {
    user.sendEmailVerification().then(
      () => {
        this.router.navigateByUrl('/verify-email/info');
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  public GoogleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(
      (res) => {
        this.router.navigateByUrl('/');
        localStorage.setItem('token', res.user!.uid);
        this.Header.isAuth.next(true);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  public isUserAuth() {
    return localStorage.getItem('token')?.length === 28;
  }
}
