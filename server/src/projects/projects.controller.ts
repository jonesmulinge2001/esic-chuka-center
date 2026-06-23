/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  CreateSubmissionDto,
} from './dto/project.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role, ProjectStatus } from '@prisma/client';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'List published projects (public)' })
  findAll(@Query() query: PaginationDto) {
    return this.projectsService.findAll(query);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured projects (public)' })
  getFeatured() {
    return this.projectsService.findFeatured();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get project by slug (public)' })
  findOne(@Param('slug') slug: string) {
    return this.projectsService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create project (Admin/Staff)' })
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update project (Admin/Staff)' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete project (Admin)' })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}

@ApiTags('Project Submissions')
@Controller('submissions')
export class SubmissionsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Submit a project (Authenticated users)' })
  create(@CurrentUser() user: any, @Body() dto: CreateSubmissionDto) {
    return this.projectsService.createSubmission(user.id, dto);
  }

  @Get('mine')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get my submissions' })
  getMine(@CurrentUser() user: any) {
    return this.projectsService.getUserSubmissions(user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get all submissions (Admin/Staff)' })
  getAll(@Query() query: PaginationDto) {
    return this.projectsService.getAllSubmissions(query);
  }

  @Patch(':id/review')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Review a submission (Admin/Staff)' })
  review(
    @Param('id') id: string,
    @Body() body: { status: ProjectStatus; reviewNotes?: string },
  ) {
    return this.projectsService.reviewSubmission(
      id,
      body.status,
      body.reviewNotes,
    );
  }
}
