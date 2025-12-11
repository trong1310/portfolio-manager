import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectDetail } from './entities/project-detail.entity';
import { ProjectDetailService } from './project-detail.service';
import { ProjectDetailController } from './project-detail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectDetail])],
  controllers: [ProjectDetailController],
  providers: [ProjectDetailService],
  exports: [ProjectDetailService],
})
export class ProjectDetailModule {}
