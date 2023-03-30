import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthedGuard, PreAuthGuard } from './guards';
import {
  HomeComponent,
  NotfoundComponent,
  CreateHotelComponent,
  LoginComponent,
  RegisterComponent,
  ResetPasswordComponent,
  UpdateHotelComponent,
  VerifyEmailInfoComponent,
  HotelPageComponent,
  RentComponent,
  VreateRoomComponent,
  UpdateRoomComponent,
  RoomPageComponent,
} from './view';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PreAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [PreAuthGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [PreAuthGuard],
  },
  {
    path: 'verify-email/info',
    component: VerifyEmailInfoComponent,
    canActivate: [PreAuthGuard],
  },
  {
    path: 'create-hotel',
    component: CreateHotelComponent,
    canActivate: [AuthedGuard],
  },
  {
    path: 'update-hotel/:id',
    component: UpdateHotelComponent,
    canActivate: [AuthedGuard],
  },
  {
    path: 'update-room/:id',
    component: UpdateRoomComponent,
    canActivate: [AuthedGuard],
  },
  {
    path: 'hotel-page/:id',
    component: HotelPageComponent,
  },
  {
    path: 'room-page/:id',
    component: RoomPageComponent,
  },
  {
    path: 'vreate-room/:id',
    component: VreateRoomComponent,
  },
  {
    path: 'rent',
    component: RentComponent,
  },
  {
    path: '404',
    component: NotfoundComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
