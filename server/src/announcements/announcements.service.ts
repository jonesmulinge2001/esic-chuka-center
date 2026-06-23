/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAnnouncementDto,
  UpdateAnnouncementDto,
} from './dto/announcement.dto';
import { PaginationDto, paginate } from '../common/dto/pagination.dto';
@Injectable()
export class AnnouncementsService {
  constructor(private prisma: PrismaService) {}
  async findAll(query: PaginationDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;
    const where: any = { isPublished: true };
    if (search)
      where.OR = [{ title: { contains: search, mode: 'insensitive' } }];
    const [data, total] = await Promise.all([
      this.prisma.announcement.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
      }),
      this.prisma.announcement.count({ where }),
    ]);
    return paginate(data, total, page, limit);
  }
  async findFeatured() {
    return this.prisma.announcement.findMany({
      where: { isFeatured: true, isPublished: true },
      take: 4,
      orderBy: { publishedAt: 'desc' },
    });
  }
  async findBySlug(slug: string) {
    const a = await this.prisma.announcement.findUnique({ where: { slug } });
    if (!a) throw new NotFoundException('Announcement not found');
    return a;
  }
  async create(dto: CreateAnnouncementDto) {
    const data: any = { ...dto };
    if (dto.isPublished) data.publishedAt = new Date();
    return this.prisma.announcement.create({ data });
  }
  async update(id: string, dto: UpdateAnnouncementDto) {
    await this.findBySlug(id);
    return this.prisma.announcement.update({ where: { id }, data: dto });
  }
  async remove(id: string) {
    return this.prisma.announcement.delete({ where: { id } });
  }
}
