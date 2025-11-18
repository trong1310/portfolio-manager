import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseMessagePage } from 'src/common/base-response-messages/base-response';
export class ProjectDto {
  @ApiProperty() uuid: string;
  @ApiProperty() name: string;
  @ApiProperty() description: string;
  @ApiProperty() is_enable: boolean;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
  @ApiProperty() imageUrls: string[];
  @ApiProperty() rateAvg: number;
}
export class ProjectPageResponse extends BaseResponseMessagePage<ProjectDto> {
  @ApiProperty({ type: [ProjectDto], description: 'Danh sách project' })
  declare Items: ProjectDto[]; // Override để Swagger biết type
}
