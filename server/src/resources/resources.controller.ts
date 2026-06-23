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
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ResourcesService } from './resources.service';
import { CreateResourceDto, UpdateResourceDto } from './dto/resource.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { OptionalJwtGuard } from '../common/guards/optional-jwt.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Resources')
@Controller('resources')
export class ResourcesController {
  constructor(private resourcesService: ResourcesService) {}

  @Get()
  @UseGuards(OptionalJwtGuard)
  @ApiOperation({
    summary:
      'List resources (public resources visible to all, restricted to authenticated users)',
  })
  findAll(@Query() query: PaginationDto, @Request() req: any) {
    return this.resourcesService.findAll(query, req.user?.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get and download a resource (public resources only)',
  })
  findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Upload a resource (Admin/Staff)' })
  create(@Body() dto: CreateResourceDto) {
    return this.resourcesService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update a resource (Admin/Staff)' })
  update(@Param('id') id: string, @Body() dto: UpdateResourceDto) {
    return this.resourcesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete a resource (Admin)' })
  remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }
}
