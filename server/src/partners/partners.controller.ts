/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PartnersService } from './partners.service';
import { CreatePartnerDto, UpdatePartnerDto } from './dto/partner.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
  constructor(private service: PartnersService) {}
  @Get() @ApiOperation({ summary: 'List active partners (public)' }) findAll() {
    return this.service.findAll();
  }
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Add partner (Admin/Staff)' })
  create(@Body() dto: CreatePartnerDto) {
    return this.service.create(dto);
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update partner (Admin/Staff)' })
  update(@Param('id') id: string, @Body() dto: UpdatePartnerDto) {
    return this.service.update(id, dto);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete partner (Admin)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
