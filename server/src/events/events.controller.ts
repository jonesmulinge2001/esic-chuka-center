/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'List all published events (public)' })
  findAll(@Query() query: PaginationDto) {
    return this.eventsService.findAll(query);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured events (public)' })
  getFeatured() {
    return this.eventsService.findFeatured();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get event details by slug (public)' })
  findOne(@Param('slug') slug: string) {
    return this.eventsService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create an event (Admin/Staff)' })
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update an event (Admin/Staff)' })
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete an event (Admin)' })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/register')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Register for an event (Authenticated users)' })
  register(@Param('id') id: string, @CurrentUser() user: any) {
    return this.eventsService.register(id, user.id);
  }

  @Delete(':id/register')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Cancel event registration (Authenticated users)' })
  unregister(@Param('id') id: string, @CurrentUser() user: any) {
    return this.eventsService.unregister(id, user.id);
  }

  @Get(':id/registrations')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get all registrations for an event (Admin/Staff)' })
  getRegistrations(@Param('id') id: string) {
    return this.eventsService.getEventRegistrations(id);
  }
}