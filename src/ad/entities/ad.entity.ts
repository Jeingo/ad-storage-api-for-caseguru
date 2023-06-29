import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photos } from './photos.entity';

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

  @Column('timestamp')
  createdAt: Date;

  @OneToMany(() => Photos, (photos) => photos.ad)
  photos: Photos[];
}
