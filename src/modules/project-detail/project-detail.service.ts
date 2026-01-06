import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectDetail } from './entities/project-detail.entity';
import { BaseRequestModels } from 'src/common/base-request-models/base_request';
import { ProjectDetailPageResponse } from './dto/respones/project-detail-response';

@Injectable()
export class ProjectDetailService {
  private readonly logger = new Logger(ProjectDetailService.name);
  constructor(
    @InjectRepository(ProjectDetail)
    private readonly repo: Repository<ProjectDetail>,
  ) { }

  async get(uuid: string): Promise<ProjectDetailPageResponse> {
    try {
      const resp = new ProjectDetailPageResponse();
      const items = await this.repo.find({ where: { project: { uuid } } });
      const details = items
        .filter(item => item.isMain === false)
        .map(detail => ({
          id: detail.id,
          name: detail.title,
          description: detail.description,
          isMain: detail.isMain,
          imageUrl: '',
        }));
      const mapped = items
        .filter(item => item.isMain === true)
        .map(item => ({
          id: item.id,
          name: item.title,
          description: item.description,
          isMain: item.isMain,
          listDetail: details,
        }));

      resp.Data = {
        Items: mapped,

      } as any;

      return resp;
    } catch (error) {
      this.logger.error('Failed to get resources', error);
      throw error;
    }
  }
}
