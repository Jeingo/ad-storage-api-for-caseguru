import { Photo } from '../../ad/entities/photos.entity';

export function photoToUrl(photo: Photo): string {
  return photo.url;
}
