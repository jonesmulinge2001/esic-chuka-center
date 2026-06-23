/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ProjectStatus } from '@prisma/client';

export class CreateProjectDto {
  @ApiProperty() @IsString() slug!: string;
  @ApiProperty() @IsString() title!: string;
  @ApiProperty() @IsString() description!: string;
  @ApiProperty({ example: 'student' }) @IsString() category!: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() teamMembers?: string[];
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() imageUrls?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() videoUrl?: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() tags?: string[];
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isFeatured?: boolean;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiPropertyOptional({ enum: ProjectStatus })
  @IsOptional() @IsEnum(ProjectStatus)
  status?: ProjectStatus;
}

export class CreateSubmissionDto {
  @ApiProperty() @IsString() title!: string;
  @ApiProperty() @IsString() description!: string;
  @ApiProperty() @IsString() category!: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() teamMembers?: string[];
}