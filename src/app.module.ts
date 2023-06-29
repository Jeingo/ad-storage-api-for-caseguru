import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { ConfigType } from './configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdController } from './ad/ad.controller';
import { AdService } from './ad/ad.service';
import { Ad } from './ad/entities/ad.entity';
import { Photos } from './ad/entities/photos.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigType>) => ({
        type: 'mysql',
        host: configService.get('mysql_host'),
        port: configService.get('mysql_port'),
        username: configService.get('mysql_username'),
        password: configService.get('mysql_password'),
        database: configService.get('mysql_db_name'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Ad, Photos]),
  ],
  controllers: [AdController],
  providers: [AdService],
})
export class AppModule {}
