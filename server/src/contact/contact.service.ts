/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactMessageDto } from './dto/contact.dto';
import { PaginationDto, paginate } from '../common/dto/pagination.dto';
@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}
  async submit(dto: CreateContactMessageDto) {
    return this.prisma.contactMessage.create({ data: dto });
  }
  async findAll(query: PaginationDto) {
    const { page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.contactMessage.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.contactMessage.count(),
    ]);
    return paginate(data, total, page, limit);
  }
  async markRead(id: string) {
    return this.prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
  }
}
