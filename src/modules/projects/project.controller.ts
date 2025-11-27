import { Get, Post, Body, Param, Controller } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { BaseRequestModels } from 'src/common/base-request-models/base_request';
import { ProjectPageResponse } from './dto/respones/project-response';

@Controller('projects')
@ApiTags('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Lấy danh sách projects' })
  @ApiBody({ type: BaseRequestModels })
  @ApiResponse({ status: 200, description: 'Lấy thành công', type: ProjectPageResponse })
  Post(@Body() req: BaseRequestModels) {
    return this.projectService.project(req);
  }
  @Get('/:uuid')
  @ApiOperation({ summary: 'Lấy chi tiết project' })
  @ApiResponse({ status: 200, description: 'Lấy thành công', type: ProjectPageResponse })
  Get(@Param('uuid') uuid: string) {
    return this.projectService.projectByUuid(uuid);
  }
}