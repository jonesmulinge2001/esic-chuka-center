/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartnerDto, UpdatePartnerDto } from './dto/partner.dto';

@Injectable()
export class PartnersService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.partner.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
  }
  findAllAdmin() {
    return this.prisma.partner.findMany({ orderBy: { sortOrder: 'asc' } });
  }
  async create(dto: CreatePartnerDto) {
    return this.prisma.partner.create({ data: dto });
  }
  async update(id: string, dto: UpdatePartnerDto) {
    await this.findOne(id);
    return this.prisma.partner.update({ where: { id }, data: dto });
  }
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.partner.delete({ where: { id } });
  }
  private async findOne(id: string) {
    const p = await this.prisma.partner.findUnique({ where: { id } });
    if (!p) throw new NotFoundException('Partner not found');
    return p;
  }
}
