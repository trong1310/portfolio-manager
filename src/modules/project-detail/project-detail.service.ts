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
  ) {}

  async get(req: BaseRequestModels): Promise<ProjectDetailPageResponse> {
    try {
      const page = Number(req.page) || 1;
      const limit = Number(req.limit) || 10;
      const skip = (page - 1) * limit;

      const resp = new ProjectDetailPageResponse();
      const items = await this.repo.find({ skip, take: limit });

      const mapped = items.map((item) => ({
        // adjust fields based on entity shape
        id: (item as any).id,
        name: (item as any).name,
        description: (item as any).description,
        createdAt: (item as any).createdAt,
        updatedAt: (item as any).updatedAt,
      }));

      resp.Data = {
        Items: mapped,
        Pagination: {
          TotalCount: await this.repo.count(),
          TotalPage: Math.ceil((await this.repo.count()) / limit),
        },
      } as any;

      return resp;
    } catch (error) {
      this.logger.error('Failed to get resources', error);
      throw error;
    }
  }
}
