import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Upload } from '../upload/entities/upload.entity';
import { AccountRatetingProjectEntity } from './entities/account-rating-project.entity';
import { BaseRequestModels } from 'src/common/base-request-models/base_request';
import { ProjectPageResponse } from './dto/respones/project-response';
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
  async get(req: BaseRequestModels): Promise<ProjectPageResponse> {
    try {
      // Defensive: ensure page and limit are numbers
      const page = Number(req.page) || 1;
      const limit = Number(req.limit) || 10;
      const skip = (page - 1) * limit;
      
      const resp = new ProjectPageResponse();
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
      const result = projects.map((project) => {
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
        };
      });
      resp.Data ={
        Items: result,
        Pagination: {
          TotalCount: await this.projectRepository.count({where: { is_enable: true }}),
          TotalPage : Math.ceil(await this.projectRepository.count({where: { is_enable: true }}) / limit),
        }
      };
      return resp;
      }catch (error) {
      this.logger.error('Failed to get projects', error);
      throw new NotFoundException('Failed to get projects');
    }
  }
}
