import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HomeComponent,
  NotfoundComponent,
  CreateHotelComponent,
  LoginComponent,
  RegisterComponent,
  ResetPasswordComponent,
  UpdateHotelComponent,
  VerifyEmailInfoComponent,
  RentComponent,
  VreateRoomComponent,
  HotelPageComponent,
  RoomPageComponent,
  UpdateRoomComponent,
} from './view';
import { HeaderComponent, BannerComponent, LineComponent } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    CreateHotelComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    UpdateHotelComponent,
    VerifyEmailInfoComponent,
    HeaderComponent,
    BannerComponent,
    LineComponent,
    HotelPageComponent,
    VreateRoomComponent,
    RentComponent,
    UpdateRoomComponent,
    RoomPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
