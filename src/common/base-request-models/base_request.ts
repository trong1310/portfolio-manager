import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class BaseRequestModels {
  @ApiProperty({ title: 'page', example: 1 })
  @Type(() => Number)
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value, 10) : value))
  @IsNumber()
  @Min(1)
  page: number;

  @ApiProperty({ title: 'limit', example: 10 })
  @Type(() => Number)
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value, 10) : value))
  @IsNumber()
  @Min(1)
  limit: number;
}
export class BaseRequestModelsKeyWord extends BaseRequestModels {
  @ApiProperty({ title: 'keyword', example: 'test' })
  keyword: string;
}
export class BaseRequestModelsKeyWordTime extends BaseRequestModelsKeyWord {
  @ApiProperty({ title: 'fromTime', example: '2023-01-01T00:00:00Z' })
  fromTime: Date;
  @ApiProperty({ title: 'toTime', example: '2023-12-31T23:59:59Z' })
  toTime: Date;
}
