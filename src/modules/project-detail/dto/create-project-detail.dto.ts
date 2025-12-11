import { IsOptional, IsString } from 'class-validator';

export class CreateProjectDetailDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
