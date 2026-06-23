/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResourceDto, UpdateResourceDto } from './dto/resource.dto';
import { PaginationDto, paginate } from '../common/dto/pagination.dto';
import { ResourceVisibility } from '@prisma/client';

@Injectable()
export class ResourcesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: PaginationDto, userId?: string) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;
    const where: any = { isPublished: true };
    if (!userId) where.visibility = ResourceVisibility.PUBLIC;
    if (search)
      where.OR = [{ title: { contains: search, mode: 'insensitive' } }];
    const [data, total] = await Promise.all([
      this.prisma.resource.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.resource.count({ where }),
    ]);
    return paginate(data, total, page, limit);
  }

  async findOne(id: string) {
    const resource = await this.prisma.resource.findUnique({ where: { id } });
    if (!resource) throw new NotFoundException('Resource not found');
    await this.prisma.resource.update({
      where: { id },
      data: { downloadCount: { increment: 1 } },
    });
    return resource;
  }

  async create(dto: CreateResourceDto) {
    return this.prisma.resource.create({ data: dto as any });
  }

  async update(id: string, dto: UpdateResourceDto) {
    await this.findOne(id);
    return this.prisma.resource.update({ where: { id }, data: dto as any });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.resource.delete({ where: { id } });
  }
}
