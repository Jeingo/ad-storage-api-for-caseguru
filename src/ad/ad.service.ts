import { Ad } from './entities/ad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InputCreateAdDto } from './dto/input.create.ad.dto';
import { OutputCreatedAdDto } from './dto/output.created.ad.dto';
import { Photo } from './entities/photos.entity';
import { Direction, QueryAd, QueryAllAds } from '../utils/types/query.types';
import { OutputAdDto } from './dto/output.ad.dto';
import { photoToUrl } from '../utils/helper/to.url';
import { PaginatedType } from '../utils/types/paginated.type';
import { getPaginatedType } from '../utils/helper/get.paginated.type';

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

    return this.toOutputAd(adWithPhoto, fields);
  }

  async getAll(query: QueryAllAds): Promise<PaginatedType<OutputAdDto>> {
    const {
      sortBy = 'createdAt',
      sortDirection = Direction.DESC,
      pageNumber = 1,
      pageSize = 10,
    } = query;

    const skipNumber = (+pageNumber - 1) * +pageSize;
    const direction = sortDirection.toUpperCase() as Direction;

    const [ads, count] = await this.adRepository
      .createQueryBuilder('ad')
      .leftJoinAndSelect('ad.photos', 'photos')
      .orderBy(`"${sortBy}"`, direction)
      .limit(+pageSize)
      .offset(skipNumber)
      .getManyAndCount();

    const outputAd = ads.map((ad) => this.toOutputAd(ad, false));

    return getPaginatedType(outputAd, +pageSize, +pageNumber, count);
  }

  private toOutputAd(ad: Ad, withOptional: boolean): OutputAdDto {
    return {
      id: ad.id,
      title: ad.title,
      price: ad.price,
      mainPhoto: ad.photos[0].url,
      description: withOptional ? ad.description : undefined,
      optionalPhotos: withOptional
        ? ad.photos.map(photoToUrl).slice(1)
        : undefined,
    };
  }
}
