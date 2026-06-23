/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { MediaType } from '@prisma/client';
export class CreateGalleryItemDto {
  @ApiProperty() @IsString() title!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiProperty({ enum: MediaType }) @IsEnum(MediaType) mediaType: MediaType;
  @ApiProperty() @IsString() url!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() thumbnailUrl?: string;
  @ApiProperty() @IsString() category!: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() tags?: string[];
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isPublished?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsInt() sortOrder?: number;
  @ApiPropertyOptional() @IsOptional() @IsDateString() capturedAt?: string;
}
export class UpdateGalleryItemDto extends PartialType(CreateGalleryItemDto) {}