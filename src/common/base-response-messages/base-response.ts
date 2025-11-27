import { ApiProperty } from '@nestjs/swagger';
import { ErrorCode } from '../error-code.enum';
import e from 'express';

/* ----------------------- PAGINATION --------------------------- */
export class PaginationDto {
  @ApiProperty({ example: 0 })
  TotalCount: number;

  @ApiProperty({ example: 0 })
  TotalPage: number;
}

/* ----------------------- BASE ERROR --------------------------- */
export class ErrorResponseDto {
  @ApiProperty({ enum: ErrorCode, example: ErrorCode.SUCCESS })
  Code!: ErrorCode;

  @ApiProperty({ example: 'SUCCESS' })
  Message!: string;
}

/* ----------------------- BASE PAGE RESPONSE ------------------- */
export class PageDataResponseDto<T> {
  @ApiProperty({ isArray: true })
  Items: T[];

  @ApiProperty({ type: PaginationDto })
  Pagination: PaginationDto;
}

/* ----------------------- BASE RESPONSE ------------------------ */
export class BaseResponseMessagePage<T> {
  @ApiProperty({ type: ErrorResponseDto })
  error: ErrorResponseDto;

  @ApiProperty({ type: () => PageDataResponseDto })
  Data: PageDataResponseDto<T>;

  constructor() {
    this.error = {
      Code: ErrorCode.SUCCESS,
      Message: 'SUCCESS',
    };

    this.Data = {
      Items: [],
      Pagination: {
        TotalCount: 0,
        TotalPage: 0,
      },
    };
  }
}
export class BaseListResponseMessage<T> {
  @ApiProperty({ type: ErrorResponseDto })
  error: ErrorResponseDto;
  @ApiProperty({ isArray: true })
  Data: T[];
}
export class BaseResponseMessage<T> {
  @ApiProperty({ type: ErrorResponseDto })
  error: ErrorResponseDto;
  @ApiProperty({ isArray: true })
  Data!: T[]; // mảng
}
