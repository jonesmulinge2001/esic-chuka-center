/* eslint-disable prettier/prettier */
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
import { GalleryService } from './gallery.service';
import { CreateGalleryItemDto, UpdateGalleryItemDto } from './dto/gallery.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private service: GalleryService) {}
  @Get() @ApiOperation({ summary: 'Browse gallery (public)' }) findAll(
    @Query() q: PaginationDto,
  ) {
    return this.service.findAll(q);
  }
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Add gallery item (Admin/Staff)' })
  create(@Body() dto: CreateGalleryItemDto) {
    return this.service.create(dto);
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update gallery item (Admin/Staff)' })
  update(@Param('id') id: string, @Body() dto: UpdateGalleryItemDto) {
    return this.service.update(id, dto);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete gallery item (Admin)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
