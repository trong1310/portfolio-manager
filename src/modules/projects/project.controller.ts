import { Get, Post, Body, Param, Controller } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { BaseRequestModels } from 'src/common/base-request-models/base_request';
import { ProjectPageResponse } from './dto/respones/project-response';
import { CreateProjectDto } from './dto/create-project.dto';
import { BaseResponseMessageBase } from 'src/common/base-response-messages/base-response';

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
  @Get('/:slug')
  @ApiOperation({ summary: 'Lấy chi tiết project' })
  @ApiResponse({ status: 200, description: 'Lấy thành công', type: ProjectPageResponse })
  Get(@Param('slug') slug: string) {
    return this.projectService.projectByUuid(slug);
  }
  @Post('/create')
  @ApiOperation({ summary: 'Tạo mới project' })
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({ status: 200, description: 'Tạo thành công', type: BaseResponseMessageBase })
  CreateProject(@Body() req: CreateProjectDto) {
    return this.projectService.createProject(req);
  }
}