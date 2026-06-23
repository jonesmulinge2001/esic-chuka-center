/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import {
  ProjectsController,
  SubmissionsController,
} from './projects.controller';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController, SubmissionsController],
})
export class ProjectsModule {}
