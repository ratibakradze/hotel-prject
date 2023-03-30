import { Component, OnInit } from '@angular/core';
import { HotelCardInterface } from 'src/app/interfaces/hotel-card-interface';
import { HeaderService, HotelCardService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isUserAuthorized: boolean = false;
  isCurrentUploader: boolean = false;
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
    rooms: [],
    uploadTime: '',
  };
  cardsArray: HotelCardInterface[] = [];
  tempCardsArray: HotelCardInterface[] = [];

  constructor(
    private HotelCardService: HotelCardService,
    private Header: HeaderService
  ) {}

  ngOnInit(): void {
    this.HotelCardService.getAllCards().subscribe(
      (res) => {
        this.cardsArray = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          data.tempUploadTime =
            data.uploadTime
              .split('GMT')
              .shift()
              .split(' ')
              .slice(1, 5)
              .join(' ') || '';

          return data;
        });
        this.tempCardsArray = this.cardsArray;
      },
      (err) => {
        console.log(err);
      }
    );

    this.Header.isAuth.subscribe((res) => {
      this.isUserAuthorized = res;

      if (localStorage.getItem('token')) {
        this.isUserAuthorized = true;
      }
    });
  }
  reactCard(hotelcard: HotelCardInterface, icon: HTMLElement) {
    const currentReactUserId = hotelcard.reactionUserids.find(
      (id) => id === localStorage.getItem('token')
    );
    if (currentReactUserId) {
      hotelcard.reactionUserids = hotelcard.reactionUserids.filter(
        (id) => id !== localStorage.getItem('token')
      );
      icon.classList.remove('reacted');
    } else if (localStorage.getItem('token')) {
      hotelcard.reactionUserids.push(localStorage.getItem('token') || '');
    }
    this.HotelCardService.updateCard(hotelcard);
  }

  isUserReacted(hotelcard: HotelCardInterface) {
    return hotelcard.reactionUserids.findIndex(
      (id) => id === localStorage.getItem('token')
    ) === -1
      ? false
      : true;
  }

  checkCurrentUser(hotelcard: HotelCardInterface) {
    return hotelcard.uploaderAuthor === localStorage.getItem('token');
  }
}
