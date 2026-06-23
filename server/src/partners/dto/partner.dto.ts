/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { PartnerType } from '@prisma/client';

export class CreatePartnerDto {
  @ApiProperty() @IsString() name!: string;
  @ApiProperty({ enum: PartnerType }) @IsEnum(PartnerType) type: PartnerType;
  @ApiPropertyOptional() @IsOptional() @IsString() logoUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() website?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsInt() sortOrder?: number;
}
export class UpdatePartnerDto extends PartialType(CreatePartnerDto) {}