import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Upload } from '../upload/entities/upload.entity';
import { AccountRatetingProjectEntity } from './entities/account-rating-project.entity';
import { BaseRequestModels } from 'src/common/base-request-models/base_request';
@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
    @InjectRepository(AccountRatetingProjectEntity)
    private readonly ratingRepository: Repository<AccountRatetingProjectEntity>,
  ) {}
  async get(req: BaseRequestModels) {
    try {
      // Defensive: ensure page and limit are numbers
      const page = Number(req.page) || 1;
      const limit = Number(req.limit) || 10;
      const skip = (page - 1) * limit;

      const projects = await this.projectRepository
        .createQueryBuilder('project')
        .where('project.is_enable = :is_enable', { is_enable: true })
        .orderBy('project.createdAt', 'DESC')
        .skip(skip)
        .take(limit)
        .getMany();
      var lstProjectUuids = projects.map((project) => project.uuid);
      var uploads = await this.uploadRepository.find({
        where: { ownerUuid: In(lstProjectUuids) },
      });
      // lấy rating
      var lstRating = await this.ratingRepository.find({
        where: { is_enable: true, project_uuid: In(lstProjectUuids) },
        select: ['project_uuid', 'rate'],
      });

      const result = projects.map((project) => {
        // lấy ratings
        const ratings = lstRating.filter(
          (r) => r.project_uuid === project.uuid,
        );
        const rateAvg = ratings.length
          ? ratings.reduce((sum, r) => sum + r.rate, 0) / ratings.length
          : 0;
        // lọc images
        const imageUrls = uploads
          .filter((upload) => upload.ownerUuid === project.uuid)
          .map((x) => x.path);

        return {
          uuid: project.uuid,
          name: project.name,
          description: project.description,
          is_enable: project.is_enable,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
          imageUrls,
          rateAvg,
        };
      });
      return result;
    } catch (error) {
      this.logger.error('Failed to get projects', error);
      throw new NotFoundException('Failed to get projects');
    }
  }
}
