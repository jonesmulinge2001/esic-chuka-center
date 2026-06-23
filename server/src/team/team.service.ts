/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto/team.dto';
@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
  }
  async create(dto: CreateTeamMemberDto) {
    return this.prisma.teamMember.create({ data: dto });
  }
  async update(id: string, dto: UpdateTeamMemberDto) {
    await this.findOne(id);
    return this.prisma.teamMember.update({ where: { id }, data: dto });
  }
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.teamMember.delete({ where: { id } });
  }
  private async findOne(id: string) {
    const m = await this.prisma.teamMember.findUnique({ where: { id } });
    if (!m) throw new NotFoundException('Team member not found');
    return m;
  }
}
