/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { PaginationDto, paginate } from '../common/dto/pagination.dto';
import { EventStatus } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: PaginationDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;
    const where: any = { status: EventStatus.PUBLISHED };
    if (search)
      where.OR = [{ title: { contains: search, mode: 'insensitive' } }];

    const [data, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { startDate: 'asc' },
      }),
      this.prisma.event.count({ where }),
    ]);
    return paginate(data, total, page, limit);
  }

  async findFeatured() {
    return this.prisma.event.findMany({
      where: { isFeatured: true, status: EventStatus.PUBLISHED },
      orderBy: { startDate: 'asc' },
      take: 6,
    });
  }

  async findBySlug(slug: string) {
    const event = await this.prisma.event.findUnique({
      where: { slug },
      include: { _count: { select: { registrations: true } } },
    });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async create(dto: CreateEventDto) {
    return this.prisma.event.create({ data: dto as any });
  }

  async update(id: string, dto: UpdateEventDto) {
    await this.findById(id);
    return this.prisma.event.update({ where: { id }, data: dto as any });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.event.delete({ where: { id } });
  }

  async register(eventId: string, userId: string) {
    const event = await this.findById(eventId);
    if (event.status !== EventStatus.PUBLISHED)
      throw new BadRequestException('Event is not open for registration');
    if (event.registrationDeadline && new Date() > event.registrationDeadline)
      throw new BadRequestException('Registration deadline has passed');

    const count = await this.prisma.eventRegistration.count({
      where: { eventId },
    });
    if (event.maxCapacity && count >= event.maxCapacity)
      throw new BadRequestException('Event is at full capacity');

    const existing = await this.prisma.eventRegistration.findUnique({
      where: { eventId_userId: { eventId, userId } },
    });
    if (existing)
      throw new ConflictException('Already registered for this event');

    return this.prisma.eventRegistration.create({ data: { eventId, userId } });
  }

  async unregister(eventId: string, userId: string) {
    return this.prisma.eventRegistration.delete({
      where: { eventId_userId: { eventId, userId } },
    });
  }

  async getUserRegistrations(userId: string) {
    return this.prisma.eventRegistration.findMany({
      where: { userId },
      include: { event: true },
      orderBy: { registeredAt: 'desc' },
    });
  }

  async getEventRegistrations(eventId: string) {
    return this.prisma.eventRegistration.findMany({
      where: { eventId },
      include: {
        user: {
          select: { id: true, email: true, firstName: true, lastName: true },
        },
      },
    });
  }

  private async findById(id: string) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }
}
