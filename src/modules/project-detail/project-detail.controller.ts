import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProjectDetailService } from './project-detail.service';
import { CreateProjectDetailDto } from './dto/create-project-detail.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { BaseRequestModels } from 'src/common/base-request-models/base_request';
import { ProjectDetailPageResponse } from './dto/respones/project-detail-response';
import { Router } from 'express';

@Controller('project-detail')
@ApiTags('project-detail')
export class ProjectDetailController {
  constructor(private readonly projectDetailService: ProjectDetailService) {}

  @Post('project/:uuid')
  @ApiOperation({ summary: 'Lấy danh sách project-detail' })
  @ApiResponse({ status: 200, description: 'Lấy thành công', type: ProjectDetailPageResponse })
  get( @Param('uuid') uuid: string) {
    return this.projectDetailService.get(uuid);
  }
}
