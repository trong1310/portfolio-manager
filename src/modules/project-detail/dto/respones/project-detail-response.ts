import { ApiProperty } from '@nestjs/swagger';
import {
  BaseResponseMessagePage,
  PageDataResponseDto,
  PaginationDto,
} from 'src/common/base-response-messages/base-response';


export class ProjectDetailBaseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isMain: boolean;

  @ApiProperty()
  imageUrl: string;
}
export class ProjectDetailDto extends ProjectDetailBaseDto {
  @ApiProperty({ type: () => ProjectDetailBaseDto, isArray: true })
  listDetail: ProjectDetailBaseDto[];
}

export class ProjectDetailDataPage extends PageDataResponseDto<ProjectDetailDto> {
  @ApiProperty({ type: [ProjectDetailDto] })
  declare Items: ProjectDetailDto[];

  @ApiProperty({ type: PaginationDto })
  declare Pagination: PaginationDto;
}

export class ProjectDetailPageResponse extends BaseResponseMessagePage<ProjectDetailDto> {
  @ApiProperty({ type: ProjectDetailDataPage })
  declare Data: ProjectDetailDataPage;
}
