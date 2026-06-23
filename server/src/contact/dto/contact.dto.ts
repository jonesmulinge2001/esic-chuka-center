/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
export class CreateContactMessageDto {
  @ApiProperty({ example: 'Jane Smith' }) @IsString() name!: string;
  @ApiProperty({ example: 'jane@example.com' }) @IsEmail() email!: string;
  @ApiProperty({ example: 'Partnership Inquiry' }) @IsString() subject!: string;
  @ApiProperty() @IsString() @MinLength(10) message!: string;
}