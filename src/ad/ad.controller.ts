import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AdService } from './ad.service';
import { QueryAd } from '../utils/types/query.types';
import { PaginatedType } from '../utils/types/paginated.type';
import { OutputAdDto } from './dto/output.ad.dto';
import { InputCreateAdDto } from './dto/input.create.ad.dto';
import { OutputCreatedAdDto } from './dto/output.created.ad.dto';

@Controller('ads')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createAd(
    @Body() createAdDto: InputCreateAdDto,
  ): Promise<OutputCreatedAdDto> {
    return this.adService.create(createAdDto);
  }

  // @HttpCode(HttpStatus.OK)
  // @Get()
  // async getAllAds(
  //   @Query() query: QueryAd,
  // ): Promise<PaginatedType<OutputAdDto>> {
  //   return this.adService.getAll(query);
  // }
}