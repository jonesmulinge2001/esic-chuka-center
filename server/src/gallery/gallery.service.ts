/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGalleryItemDto, UpdateGalleryItemDto } from './dto/gallery.dto';
import { PaginationDto, paginate } from '../common/dto/pagination.dto';
@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}
  async findAll(query: PaginationDto) {
    const { page = 1, limit = 12 } = query;
    const skip = (page - 1) * limit;
    const where = { isPublished: true };
    const [data, total] = await Promise.all([
      this.prisma.galleryItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.galleryItem.count({ where }),
    ]);
    return paginate(data, total, page, limit);
  }
  async create(dto: CreateGalleryItemDto) {
    return this.prisma.galleryItem.create({ data: dto as any });
  }
  async update(id: string, dto: UpdateGalleryItemDto) {
    await this.findOne(id);
    return this.prisma.galleryItem.update({ where: { id }, data: dto as any });
  }
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.galleryItem.delete({ where: { id } });
  }
  private async findOne(id: string) {
    const item = await this.prisma.galleryItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Gallery item not found');
    return item;
  }
}
