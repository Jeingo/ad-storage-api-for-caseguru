import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ad } from './ad.entity';

@Entity('photos')
export class Photos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  url: string;

  @ManyToOne(() => Ad, (ad) => ad.photos)
  ad: Ad;
}
