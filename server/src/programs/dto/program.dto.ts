/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProgramDto {
  @ApiProperty({ example: 'early-stem' })
  @IsString()
  slug!: string;

  @ApiProperty({ example: 'Early STEM' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Early STEM' })
  @IsString()
  level!: string;

  @ApiProperty()
  @IsString()
  overview!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  objectives!: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  activities!: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}

export class UpdateProgramDto extends PartialType(CreateProgramDto) {}