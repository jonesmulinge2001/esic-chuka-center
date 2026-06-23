/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  CreateSubmissionDto,
} from './dto/project.dto';
import { PaginationDto, paginate } from '../common/dto/pagination.dto';
import { ProjectStatus } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: PaginationDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;
    const where: any = { status: ProjectStatus.PUBLISHED };
    if (search)
      where.OR = [{ title: { contains: search, mode: 'insensitive' } }];

    const [data, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { attachments: true },
      }),
      this.prisma.project.count({ where }),
    ]);
    return paginate(data, total, page, limit);
  }

  async findFeatured() {
    return this.prisma.project.findMany({
      where: { isFeatured: true, status: ProjectStatus.PUBLISHED },
      take: 6,
    });
  }

  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      include: { attachments: true },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(dto: CreateProjectDto) {
    return this.prisma.project.create({ data: dto as any });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findById(id);
    return this.prisma.project.update({ where: { id }, data: dto as any });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.project.delete({ where: { id } });
  }

  async createSubmission(userId: string, dto: CreateSubmissionDto) {
    return this.prisma.projectSubmission.create({
      data: { userId, ...dto, teamMembers: dto.teamMembers ?? [] },
    });
  }

  async getUserSubmissions(userId: string) {
    return this.prisma.projectSubmission.findMany({
      where: { userId },
      orderBy: { submittedAt: 'desc' },
      include: { attachments: true },
    });
  }

  async getAllSubmissions(query: PaginationDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.projectSubmission.findMany({
        skip,
        take: limit,
        orderBy: { submittedAt: 'desc' },
        include: {
          user: {
            select: { id: true, email: true, firstName: true, lastName: true },
          },
          attachments: true,
        },
      }),
      this.prisma.projectSubmission.count(),
    ]);
    return paginate(data, total, page, limit);
  }

  async reviewSubmission(
    id: string,
    status: ProjectStatus,
    reviewNotes?: string,
  ) {
    return this.prisma.projectSubmission.update({
      where: { id },
      data: { status, reviewNotes, reviewedAt: new Date() },
    });
  }

  private async findById(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }
}
