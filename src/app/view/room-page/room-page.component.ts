import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelCardInterface } from 'src/app/interfaces/hotel-card-interface';
import { RoomCardInterface } from 'src/app/interfaces/room-card-interface';
import { HeaderService } from 'src/app/services';
import { HotelCardService } from 'src/app/services';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss'],
})
export class RoomPageComponent implements OnInit {
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
    private HotelCardService: HotelCardService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private Header: HeaderService
  ) {}

  ngOnInit(): void {
    const currentCardId = this.activatedRouter.snapshot.params['id'];
    this.HotelCardService.getCardById(currentCardId).subscribe((res) => {
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

    this.Header.isAuth.subscribe((res) => {
      this.isUserAuthorized = res;

      if (localStorage.getItem('token')) {
        this.isUserAuthorized = true;
      }
    });
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
}
