import { RoomCardInterface } from './room-card-interface';

export interface HotelCardInterface {
  id: string;
  uploaderAuthor: string;
  title: string;
  phone: string;
  location: string;
  email: string;
  star: string;
  description: string;
  image: string[];
  reactionUserids: string[];
  rooms: RoomCardInterface[];
  uploadTime: string;
  tempUploadTime?: string;
}
