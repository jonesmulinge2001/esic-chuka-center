/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/contact.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private service: ContactService) {}
  @Post()
  @ApiOperation({ summary: 'Submit a contact message (public)' })
  submit(@Body() dto: CreateContactMessageDto) {
    return this.service.submit(dto);
  }
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'View all contact messages (Admin/Staff)' })
  findAll(@Query() q: PaginationDto) {
    return this.service.findAll(q);
  }
  @Patch(':id/read')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Mark message as read (Admin/Staff)' })
  markRead(@Param('id') id: string) {
    return this.service.markRead(id);
  }
}
