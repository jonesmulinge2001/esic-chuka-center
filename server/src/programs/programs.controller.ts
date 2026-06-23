/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ProgramsService } from './programs.service';
import { CreateProgramDto, UpdateProgramDto } from './dto/program.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Programs')
@Controller('programs')
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}

  @Get()
  @ApiOperation({ summary: 'List all published programs (public)' })
  findAll(@Query() query: PaginationDto) {
    return this.programsService.findAll(query);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get program by slug (public)' })
  findOne(@Param('slug') slug: string) {
    return this.programsService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create a new program (Admin/Staff)' })
  create(@Body() dto: CreateProgramDto) {
    return this.programsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update a program (Admin/Staff)' })
  update(@Param('id') id: string, @Body() dto: UpdateProgramDto) {
    return this.programsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete a program (Admin only)' })
  remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }
}