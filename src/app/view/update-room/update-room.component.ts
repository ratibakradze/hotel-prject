import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelCardInterface } from 'src/app/interfaces/hotel-card-interface';
import { RoomCardInterface } from 'src/app/interfaces/room-card-interface';
import { HotelCardService, ValidationService } from 'src/app/services';
import { RommError } from 'src/app/interfaces/romm-error';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.scss'],
})
export class UpdateRoomComponent implements OnInit {
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

  public roomcard: RoomCardInterface = {
    id: '',
    m2: '',
    floor: '',
    rooms: '',
    bedroom: '',
    waterspot: '',
    pool: '',
    parking: '',
    price: '',
    image: [],
    reactionUserids: [],
    description: '',
    currentid: '',
  };

  constructor(
    private CardService: HotelCardService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private location: Location,
    private ValidationService: ValidationService
  ) {}

  ngOnInit(): void {
    const currentCardId = this.activatedRouter.snapshot.params['id'];
    this.CardService.getCardById(currentCardId).subscribe((res) => {
      const temp = res.data() as HotelCardInterface;
      console.log(temp);
      if (temp) {
        this.hotelcard = temp;
        const roomid = localStorage.getItem('roomId');
        const temproom = this.hotelcard.rooms.find(
          (element) => element.id === roomid
        ) as RoomCardInterface;
        console.log(temproom);
        this.roomcard = temproom;
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  onChange(event: Event) {
    this.roomcard.image = [];
    const target = event.target as HTMLInputElement;
    if (target.files) {
      if (target.files.length) {
        for (let i = 0; i < target.files.length; i++) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(target.files[i]);
          fileReader.onload = () => {
            this.roomcard.image.push(fileReader.result as string);
            console.log(this.roomcard.image.length);
            console.log(target.files?.length);
          };
        }
      }
    }
  }

  public roomError: RommError = {
    m2Error: '',
    floorError: '',
    roomsError: '',
    bedroomError: '',
    waterspotError: '',
    poolError: '',
    parkingError: '',
    priceError: '',
    ServiceError: '',
  };

  ValidationInputs() {
    this.roomError.bedroomError = this.ValidationService.Empty(
      this.roomcard.bedroom
    )
      ? 'Field Required'
      : !this.ValidationService.validnumber(this.roomcard.bedroom)
      ? 'Enter Number!'
      : '';
    this.roomError.floorError = this.ValidationService.Empty(
      this.roomcard.floor
    )
      ? 'Field Required'
      : !this.ValidationService.validnumber(this.roomcard.floor)
      ? 'Enter Number!'
      : '';
    this.roomError.m2Error = this.ValidationService.Empty(this.roomcard.m2)
      ? 'Field Required'
      : !this.ValidationService.validnumber(this.roomcard.m2)
      ? 'Enter Number!'
      : '';
    this.roomError.priceError = this.ValidationService.Empty(
      this.roomcard.price
    )
      ? 'Field Required'
      : !this.ValidationService.validnumber(this.roomcard.price)
      ? 'Enter Number!'
      : '';
    this.roomError.roomsError = this.ValidationService.Empty(
      this.roomcard.rooms
    )
      ? 'Field Required'
      : !this.ValidationService.validnumber(this.roomcard.rooms)
      ? 'Enter Number!'
      : '';
    this.roomError.waterspotError = this.ValidationService.Empty(
      this.roomcard.waterspot
    )
      ? 'Field Required'
      : !this.ValidationService.validnumber(this.roomcard.waterspot)
      ? 'Enter Number!'
      : '';
    this.roomError.poolError = this.ValidationService.Empty(this.roomcard.pool)
      ? 'Field Required'
      : '';
    this.roomError.parkingError = this.ValidationService.Empty(
      this.roomcard.parking
    )
      ? 'Field Required'
      : '';
    this.roomError.ServiceError = this.ValidationService.Empty(
      this.roomcard.description
    )
      ? 'Field Required'
      : !this.ValidationService.validTitle(this.roomcard.description)
      ? 'Enter text!'
      : '';

    return (
      this.roomError.bedroomError == '' &&
      this.roomError.m2Error == '' &&
      this.roomError.floorError == '' &&
      this.roomError.parkingError == '' &&
      this.roomError.poolError == '' &&
      this.roomError.priceError == '' &&
      this.roomError.roomsError == '' &&
      this.roomError.waterspotError == '' &&
      this.roomError.ServiceError == ''
    );
  }

  resetError() {
    this.roomError.bedroomError == '';
    this.roomError.m2Error == '';
    this.roomError.floorError == '';
    this.roomError.parkingError == '';
    this.roomError.poolError == '';
    this.roomError.priceError == '';
    this.roomError.roomsError == '';
    this.roomError.waterspotError == '';
    this.roomError.ServiceError == '';
  }

  updateRoom() {
    if (this.ValidationInputs()) {
      this.resetError();
      this.CardService.updateCard(this.hotelcard);
      console.log(this.roomcard);
      this.location.back();
    }
  }
  onDelete() {
    const roomid = localStorage.getItem('roomId');
    for (let i = 0; i < this.hotelcard.rooms.length; i++) {
      if (this.hotelcard.rooms[i].id === roomid) {
        this.hotelcard.rooms.splice(i, 1);
        break;
      }
    }
    console.log(this.hotelcard.rooms);
    this.CardService.updateCard(this.hotelcard);
    this.location.back();
  }
}
