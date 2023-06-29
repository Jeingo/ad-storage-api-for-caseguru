import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AdService } from './ad.service';
import { QueryAd, QueryAllAds } from '../utils/types/query.types';
import { PaginatedType } from '../utils/types/paginated.type';
import { OutputAdDto } from './dto/output.ad.dto';
import { InputCreateAdDto } from './dto/input.create.ad.dto';
import { OutputCreatedAdDto } from './dto/output.created.ad.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('ads')
@Controller('ads')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @ApiOperation({ summary: 'Create ad' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createAd(
    @Body() createAdDto: InputCreateAdDto,
  ): Promise<OutputCreatedAdDto> {
    return this.adService.create(createAdDto);
  }

  @ApiOperation({ summary: 'Return ad by id' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @ApiQuery({
    name: 'fields',
    required: false,
    type: 'boolean',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getAdById(
    @Param('id') id: number,
    @Query() query: QueryAd,
  ): Promise<OutputAdDto> {
    return this.adService.getById(id, query);
  }

  @ApiOperation({ summary: 'Return all ads with pagination' })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: `default 'createdAt`,
    type: 'string',
  })
  @ApiQuery({
    name: 'sortDirection',
    required: false,
    description: `default 'DESK'`,
    type: 'string',
  })
  @ApiQuery({
    name: 'pageNumber',
    required: false,
    description: `default 1`,
    type: 'number',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: `default 10`,
    type: 'number',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllAds(
    @Query() query: QueryAllAds,
  ): Promise<PaginatedType<OutputAdDto>> {
    return this.adService.getAll(query);
  }
}
