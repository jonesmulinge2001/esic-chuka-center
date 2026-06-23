/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnnouncementsService } from './announcements.service';
import {
  CreateAnnouncementDto,
  UpdateAnnouncementDto,
} from './dto/announcement.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
@ApiTags('Announcements')
@Controller('announcements')
export class AnnouncementsController {
  constructor(private service: AnnouncementsService) {}
  @Get()
  @ApiOperation({ summary: 'List published announcements (public)' })
  findAll(@Query() q: PaginationDto) {
    return this.service.findAll(q);
  }
  @Get('featured')
  @ApiOperation({ summary: 'Get featured announcements (public)' })
  getFeatured() {
    return this.service.findFeatured();
  }
  @Get(':slug')
  @ApiOperation({ summary: 'Get announcement by slug (public)' })
  findOne(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create announcement (Admin/Staff)' })
  create(@Body() dto: CreateAnnouncementDto) {
    return this.service.create(dto);
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update announcement (Admin/Staff)' })
  update(@Param('id') id: string, @Body() dto: UpdateAnnouncementDto) {
    return this.service.update(id, dto);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete announcement (Admin)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
