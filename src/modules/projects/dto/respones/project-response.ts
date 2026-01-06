import { ApiProperty } from '@nestjs/swagger';
import {
  BaseResponseMessagePage,
  PageDataResponseDto,
  PaginationDto,
  BaseResponseMessage,
} from 'src/common/base-response-messages/base-response';
export class ProjectDto {
  @ApiProperty() uuid: string;
  @ApiProperty() name: string;
  @ApiProperty() description: string;
  @ApiProperty() is_enable: boolean;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
  @ApiProperty() imageUrls: string;
}
export class ProjectDetailDto {
  @ApiProperty({type: String }) uuid;
  @ApiProperty() name: string;
  @ApiProperty({type: String , nullable: true}) description;
  @ApiProperty() createdAt: Date;
  @ApiProperty({type: [String], nullable: true}) imageUrls;
}
export class ProjectDetailResponse extends BaseResponseMessage<ProjectDetailDto> {
  @ApiProperty({ type: ProjectDetailDto })
  declare Data: ProjectDetailDto[];
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
