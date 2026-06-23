/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { EventType } from '@prisma/client';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  slug!: string;

  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty({ enum: EventType })
  @IsEnum(EventType)
  type!: EventType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isVirtual?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  meetingLink?: string;

  @ApiProperty()
  @IsDateString()
  startDate!: string;

  @ApiProperty()
  @IsDateString()
  endDate!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  registrationDeadline?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  maxCapacity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}