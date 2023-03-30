import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  public isAuth = new BehaviorSubject<boolean>(false);

  constructor() {}
}
