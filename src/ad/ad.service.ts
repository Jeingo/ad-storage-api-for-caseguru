import { Ad } from './entities/ad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InputCreateAdDto } from './dto/input.create.ad.dto';
import { OutputCreatedAdDto } from './dto/output.created.ad.dto';
import { Photo } from './entities/photos.entity';
import { QueryAd } from '../utils/types/query.types';
import { OutputAdDto } from './dto/output.ad.dto';
import { photoToUrl } from '../utils/helper/toUrl';

@Injectable()
export class AdService {
  constructor(
    @InjectRepository(Ad)
    private adRepository: Repository<Ad>,
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async create(createAdDto: InputCreateAdDto): Promise<OutputCreatedAdDto> {
    const { title, description, price, photos } = createAdDto;

    const ad = await this.adRepository.create({
      title: title,
      description: description,
      price: price,
      createdAt: new Date(),
    });
    await this.adRepository.save(ad);

    const photosInDb: Array<Photo> = [];
    for (const photo of photos) {
      const photoInDb = await this.photoRepository.create({
        url: photo,
        adId: ad.id,
      });
      photosInDb.push(photoInDb);
    }
    await this.photoRepository.save(photosInDb);

    return { id: ad.id };
  }

  async getById(adId: number, query: QueryAd): Promise<OutputAdDto> {
    const { fields } = query;

    const adWithPhoto = await this.adRepository.findOne({
      where: { id: adId },
      relations: { photos: true },
    });

    if (!adWithPhoto) throw new NotFoundException();

    return {
      id: adWithPhoto.id,
      title: adWithPhoto.title,
      price: adWithPhoto.price,
      mainPhoto: adWithPhoto.photos[0].url,
      description: fields ? adWithPhoto.description : undefined,
      optionalPhotos: fields
        ? adWithPhoto.photos.map(photoToUrl).slice(1)
        : undefined,
    };
  }

  // async getAll(query: QueryAd): Promise<PaginatedType<OutputAdDto>> {
  //   // return this.adRepository.find();
  // }
}
