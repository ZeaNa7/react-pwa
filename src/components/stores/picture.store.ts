import { makeAutoObservable } from 'mobx';

class PictureStore {
  photos: string[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setPhotos(photos: string[]) {
    this.photos = photos;
  }
}

export default new PictureStore();
