import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelCardInterface } from 'src/app/interfaces/hotel-card-interface';
import { RoomCardInterface } from 'src/app/interfaces/room-card-interface';
import { HeaderService, HotelCardService } from 'src/app/services';

@Component({
  selector: 'app-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.scss'],
})
export class HotelPageComponent implements OnInit {
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
  public roomcard: RoomCardInterface = {
    id: '',
    m2: '',
    floor: '',
    rooms: '',
    bedroom: '',
    waterspot: '',
    pool: '',
    parking: '',
    description: '',
    price: '',
    image: [],
    reactionUserids: [],
    currentid: '',
  };

  constructor(
    private HotelCardService: HotelCardService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private Header: HeaderService
  ) {}
  ngOnInit(): void {
    const currentCardId = this.activatedRouter.snapshot.params['id'];
    this.HotelCardService.getCardById(currentCardId).subscribe((res) => {
      const temp = res.data() as HotelCardInterface;
      if (temp) {
        this.hotelcard = temp;
        this.hotelcard.id = currentCardId;
      } else {
        this.router.navigateByUrl('/');
      }
    });

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

  reactRoomCard(roomcard: RoomCardInterface, icon: HTMLElement) {
    const currentReactUserId = roomcard.reactionUserids.find(
      (id) => id === localStorage.getItem('token')
    );
    if (currentReactUserId) {
      roomcard.reactionUserids = roomcard.reactionUserids.filter(
        (id) => id !== localStorage.getItem('token')
      );
      icon.classList.remove('reacted');
    } else if (localStorage.getItem('token')) {
      roomcard.reactionUserids.push(localStorage.getItem('token') || '');
    }
    this.HotelCardService.updateCard(this.hotelcard);
  }

  isUserRoomReacted(roomcard: RoomCardInterface) {
    return roomcard.reactionUserids.findIndex(
      (id) => id === localStorage.getItem('token')
    ) === -1
      ? false
      : true;
  }

  checkCurrentUser(hotelcard: HotelCardInterface) {
    return hotelcard.uploaderAuthor === localStorage.getItem('token');
  }
  saveRoomId(roomcard: RoomCardInterface) {
    localStorage.setItem('roomId', roomcard.id);
  }
}
