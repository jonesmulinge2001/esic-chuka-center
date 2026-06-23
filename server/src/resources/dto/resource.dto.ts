/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ResourceType, ResourceVisibility } from '@prisma/client';

export class CreateResourceDto {
  @ApiProperty() @IsString() title!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiProperty({ enum: ResourceType }) @IsEnum(ResourceType) type: ResourceType;
  @ApiProperty() @IsString() url!: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() fileSize?: number;
  @ApiProperty() @IsString() category!: string;
  @ApiPropertyOptional({ enum: ResourceVisibility }) @IsOptional() @IsEnum(ResourceVisibility) visibility?: ResourceVisibility;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isPublished?: boolean;
}

export class UpdateResourceDto extends PartialType(CreateResourceDto) {}