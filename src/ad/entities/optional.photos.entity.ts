import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ad } from './ad.entity';

@Entity('optional_photos')
export class OptionalPhotos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  url: string;

  @ManyToOne(() => Ad, (ad) => ad.optional_photos)
  ad: Ad;
}
