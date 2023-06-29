import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsInt,
  Min,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InputCreateAdDto {
  @MaxLength(200)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(1000)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ minItems: 1, maxItems: 3 })
  @ArrayMaxSize(3)
  @ArrayMinSize(1)
  photos: string[];
}
