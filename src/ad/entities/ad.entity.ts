import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OptionalPhotos } from './optional.photos.entity';

@Entity('ad')
export class Ad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  title: string;

  @Column('varchar', { length: 1000 })
  description: string;

  @Column('integer')
  price: string;

  @Column('varchar', { length: 100 })
  main_photo_url: string;

  @Column('timestamptz')
  createdAt: Date;

  @OneToMany(() => OptionalPhotos, (optional_photos) => optional_photos.ad)
  optional_photos: OptionalPhotos[];
}
