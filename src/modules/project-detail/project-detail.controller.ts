import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProjectDetailService } from './project-detail.service';
import { CreateProjectDetailDto } from './dto/create-project-detail.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { BaseRequestModels } from 'src/common/base-request-models/base_request';
import { ProjectDetailPageResponse } from './dto/respones/project-detail-response';

@Controller('project-detail')
@ApiTags('project-detail')
export class ProjectDetailController {
  constructor(private readonly projectDetailService: ProjectDetailService) {}

  @Post()
  @ApiOperation({ summary: 'Lấy danh sách project-detail' })
  @ApiBody({ type: BaseRequestModels })
  @ApiResponse({ status: 200, description: 'Lấy thành công', type: ProjectDetailPageResponse })
  get(@Body() req: BaseRequestModels) {
    return this.projectDetailService.get(req);
  }
}
