/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgramDto, UpdateProgramDto } from './dto/program.dto';
import { PaginationDto, paginate } from '../common/dto/pagination.dto';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: PaginationDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [{ title: { contains: search, mode: 'insensitive' as any } }],
          isPublished: true,
        }
      : { isPublished: true };

    const [data, total] = await Promise.all([
      this.prisma.program.findMany({
        where,
        skip,
        take: limit,
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.program.count({ where }),
    ]);
    return paginate(data, total, page, limit);
  }

  async findAllAdmin(query: PaginationDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;
    const where = search
      ? { title: { contains: search, mode: 'insensitive' as any } }
      : {};
    const [data, total] = await Promise.all([
      this.prisma.program.findMany({
        where,
        skip,
        take: limit,
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.program.count({ where }),
    ]);
    return paginate(data, total, page, limit);
  }

  async findBySlug(slug: string) {
    const program = await this.prisma.program.findUnique({ where: { slug } });
    if (!program) throw new NotFoundException('Program not found');
    return program;
  }

  async create(dto: CreateProgramDto) {
    return this.prisma.program.create({ data: dto });
  }

  async update(id: string, dto: UpdateProgramDto) {
    await this.findById(id);
    return this.prisma.program.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.program.delete({ where: { id } });
  }

  private async findById(id: string) {
    const program = await this.prisma.program.findUnique({ where: { id } });
    if (!program) throw new NotFoundException('Program not found');
    return program;
  }
}
