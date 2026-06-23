/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'SecurePassword123!' })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName!: string;
}

export class LoginDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'SecurePassword123!' })
  @IsString()
  password!: string;
}

export class AuthResponseDto {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  user!: Record<string, any>;
}
