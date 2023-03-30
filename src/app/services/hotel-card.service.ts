import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HotelCardInterface } from '../interfaces/hotel-card-interface';

@Injectable({
  providedIn: 'root',
})
export class HotelCardService {
  constructor(private afs: AngularFirestore) {}

  addCard(hotelcard: HotelCardInterface) {
    hotelcard.id = this.afs.createId();
    hotelcard.uploaderAuthor = localStorage.getItem('token') || '';
    hotelcard.uploadTime = new Date().toString();

    return this.afs.collection('/hotels').add(hotelcard);
  }

  getCardById(id: string) {
    return this.afs.doc(`/hotels/${id}`).get();
  }

  getAllCards() {
    return this.afs.collection('/hotels').snapshotChanges();
  }

  deleteCard(hotelcard: HotelCardInterface) {
    this.afs.doc(`/hotels/${hotelcard.id}`).delete();
  }

  updateCard(hotelcard: HotelCardInterface) {
    this.afs.doc(`/hotels/${hotelcard.id}`).update(hotelcard);
  }
}
