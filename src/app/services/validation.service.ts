import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  Empty(data: string) {
    return data == '';
  }

  validTitle(data: string) {
    let title = /^[a-zA-Z]*$/g;
    return title.test(data);
  }

  validPhone(data: string) {
    let phone = /^\d{9}$/;

    return phone.test(data);
  }

  validRate(data: string) {
    let rate = /^(10(\.0+)?|[0-9](\.[0-9])?)$/;
    return rate.test(data);
  }

  validEmail(data: string) {
    let email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return email.test(data);
  }

  validDescriptionTextLength(data: string, length: number) {
    return data.length <= length;
  }

  validnumber(data: string) {
    let number = /^-?\d*\.?\d+$/;
    return number.test(data);
  }
}
