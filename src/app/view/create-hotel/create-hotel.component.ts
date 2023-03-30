import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardError } from 'src/app/interfaces/card-error';
import { HotelCardInterface } from 'src/app/interfaces/hotel-card-interface';
import { HotelCardService } from 'src/app/services';
import { ValidationService } from 'src/app/services';

@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss'],
})
export class CreateHotelComponent implements OnInit {
  public readonly defaultImage: string =
    'https://www.shutterstock.com/image-vector/add-image-icon-editable-vector-260nw-1692684598.jpg';

  public hotelcard: HotelCardInterface = {
    id: '',
    uploaderAuthor: '',
    title: '',
    phone: '',
    location: '',
    email: '',
    star: '',
    description: '',
    image: [],
    reactionUserids: [],
    uploadTime: '',
    tempUploadTime: '',
    rooms: [],
  };

  public cardError: CardError = {
    titleError: '',
    phoneError: '',
    rateError: '',
    emailError: '',
    locationError: '',
    descriptionError: '',
  };

  constructor(
    private CardService: HotelCardService,
    private router: Router,
    private ValidationService: ValidationService
  ) {}

  ngOnInit(): void {}

  onChange(event: Event) {
    this.hotelcard.image = [];
    const target = event.target as HTMLInputElement;
    if (target.files) {
      if (target.files.length) {
        for (let i = 0; i < target.files.length; i++) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(target.files[i]);
          fileReader.onload = () => {
            this.hotelcard.image.push(fileReader.result as string);
            console.log(this.hotelcard.image.length);
            console.log(target.files?.length);
          };
        }
      }
    }
  }

  ValidationInputs() {
    this.cardError.titleError = this.ValidationService.Empty(
      this.hotelcard.title
    )
      ? 'Field Required'
      : !this.ValidationService.validTitle(this.hotelcard.title)
      ? 'Name Should be alphabet!'
      : '';
    this.cardError.emailError = this.ValidationService.Empty(
      this.hotelcard.email
    )
      ? 'Field required'
      : !this.ValidationService.validEmail(this.hotelcard.email)
      ? 'Enter valid email'
      : '';
    this.cardError.phoneError = this.ValidationService.Empty(
      this.hotelcard.phone
    )
      ? 'Field required'
      : !this.ValidationService.validPhone(this.hotelcard.phone)
      ? 'Enter valid phone'
      : '';
    this.cardError.rateError = this.ValidationService.Empty(this.hotelcard.star)
      ? 'Field required'
      : !this.ValidationService.validRate(this.hotelcard.star)
      ? 'Enter valid rate'
      : '';
    this.cardError.locationError = this.ValidationService.Empty(
      this.hotelcard.location
    )
      ? 'Field required'
      : '';
    this.cardError.descriptionError = this.ValidationService.Empty(
      this.hotelcard.description
    )
      ? 'Field required'
      : !this.ValidationService.validDescriptionTextLength(
          this.hotelcard.description,
          200
        )
      ? 'maximum 200 character'
      : '';
    return (
      this.cardError.descriptionError == '' &&
      this.cardError.emailError == '' &&
      this.cardError.locationError == '' &&
      this.cardError.phoneError == '' &&
      this.cardError.rateError == '' &&
      this.cardError.titleError == ''
    );
  }
  resetError() {
    this.cardError.titleError == '';
    this.cardError.descriptionError == '';
    this.cardError.emailError == '';
    this.cardError.locationError == '';
    this.cardError.phoneError == '';
    this.cardError.rateError == '';
  }

  upload() {
    if (this.ValidationInputs()) {
      this.resetError();
      this.CardService.addCard(this.hotelcard);
      this.router.navigateByUrl('/');
    }
  }
}
