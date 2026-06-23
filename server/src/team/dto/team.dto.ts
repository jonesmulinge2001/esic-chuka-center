/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { TeamRole } from '@prisma/client';
export class CreateTeamMemberDto {
  @ApiProperty() @IsString() name!: string;
  @ApiProperty({ enum: TeamRole }) @IsEnum(TeamRole) role: TeamRole;
  @ApiProperty() @IsString() title!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() bio?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() avatarUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() email?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() linkedin?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() sortOrder?: number;
}
export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {}