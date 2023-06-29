import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ad } from './ad.entity';

@Entity('photo')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  url: string;

  @Column('integer')
  adId: number;

  @ManyToOne(() => Ad, (ad) => ad.photos)
  ad: Ad;
}
