import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsInt,
  Min,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';

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

  @ArrayMaxSize(3)
  @ArrayMinSize(1)
  photos: string[];
}
