/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { EventsModule } from './events/events.module';
import { ResourcesModule } from './resources/resources.module';
import { PartnersModule } from './partners/partners.module';
import { GalleryModule } from './gallery/gallery.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { TeamModule } from './team/team.module';
import { ContactModule } from './contact/contact.module';
import { AppController } from './app.controller';
import { ProgramsModule } from './programs/programs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProgramsModule,
    ProjectsModule,
    EventsModule,
    ResourcesModule,
    PartnersModule,
    GalleryModule,
    AnnouncementsModule,
    TeamModule,
    ContactModule,
  ],
  controllers: [AppController],
})
export class AppModule {}