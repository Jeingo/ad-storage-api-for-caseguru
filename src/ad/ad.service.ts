import { Ad } from './entities/ad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InputCreateAdDto } from './dto/input.create.ad.dto';
import { OutputCreatedAdDto } from './dto/output.created.ad.dto';
import { Photo } from './entities/photos.entity';

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

  // async getAll(query: QueryAd): Promise<PaginatedType<OutputAdDto>> {
  //   // return this.adRepository.find();
  // }
}
