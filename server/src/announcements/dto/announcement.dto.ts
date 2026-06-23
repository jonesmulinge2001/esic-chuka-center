/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
export class CreateAnnouncementDto {
  @ApiProperty() @IsString() slug!: string;
  @ApiProperty() @IsString() title!: string;
  @ApiProperty() @IsString() content!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() excerpt?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() imageUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isFeatured?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isPublished?: boolean;
}
export class UpdateAnnouncementDto extends PartialType(CreateAnnouncementDto) {}
