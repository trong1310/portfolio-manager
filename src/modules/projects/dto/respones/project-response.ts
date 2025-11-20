import { ApiProperty } from '@nestjs/swagger';
import {
  BaseResponseMessagePage,
  PageDataResponseDto,
  PaginationDto,
} from 'src/common/base-response-messages/base-response';
export class ProjectDto {
  @ApiProperty() uuid: string;
  @ApiProperty() name: string;
  @ApiProperty() description: string;
  @ApiProperty() is_enable: boolean;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
  @ApiProperty() imageUrls: string[];
}
export class ProjectDataPage extends PageDataResponseDto<ProjectDto> {
  @ApiProperty({ type: [ProjectDto] })
  declare Items: ProjectDto[];

  @ApiProperty({ type: PaginationDto })
  declare Pagination: PaginationDto;
}

export class ProjectPageResponse extends BaseResponseMessagePage<ProjectDto> {
  @ApiProperty({ type: ProjectDataPage })
  declare Data: ProjectDataPage;
}
