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
import { TeamService } from './team.service';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto/team.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private service: TeamService) {}
  @Get() @ApiOperation({ summary: 'List team members (public)' }) findAll() {
    return this.service.findAll();
  }
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Add team member (Admin)' })
  create(@Body() dto: CreateTeamMemberDto) {
    return this.service.create(dto);
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update team member (Admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateTeamMemberDto) {
    return this.service.update(id, dto);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Remove team member (Admin)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
