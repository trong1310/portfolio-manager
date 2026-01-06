import { ApiProperty } from '@nestjs/swagger';
import { ErrorCode } from '../error-code.enum';

/* ----------------------- PAGINATION --------------------------- */
export class PaginationDto {
  @ApiProperty({ example: 0 })
  TotalCount: number = 0;

  @ApiProperty({ example: 0 })
  TotalPage: number = 0;
}

/* ----------------------- BASE ERROR --------------------------- */
export class ErrorResponseDto {
  @ApiProperty({ example: ErrorCode.SUCCESS })
  Code: ErrorCode = ErrorCode.SUCCESS;

  @ApiProperty({ example: 'Success' })
  Message: string = 'Success';
}

/* ----------------------- BASE PAGE RESPONSE ------------------- */
export class PageDataResponseDto<T> {
  @ApiProperty({ isArray: true })
  Items: T[] = [];

  @ApiProperty({ type: PaginationDto })
  Pagination: PaginationDto = new PaginationDto();
}

/* ----------------------- BASE RESPONSE PAGE ------------------- */
export class BaseResponseMessagePage<T> {
  @ApiProperty({ type: ErrorResponseDto })
  error: ErrorResponseDto = new ErrorResponseDto();

  @ApiProperty({ type: () => PageDataResponseDto })
  Data: PageDataResponseDto<T> = new PageDataResponseDto<T>();
}

/* ----------------------- BASE RESPONSE BASE ------------------- */
export class BaseResponseMessageBase {
  @ApiProperty({ type: ErrorResponseDto })
  error: ErrorResponseDto = new ErrorResponseDto();
}

/* ----------------------- BASE LIST RESPONSE ------------------- */
export class BaseListResponseMessage<T> extends BaseResponseMessageBase {
  @ApiProperty({ isArray: true })
  Data: T[] = [];
}

/* ----------------------- BASE RESPONSE ------------------------ */
export class BaseResponseMessage<T> extends BaseResponseMessageBase {
  @ApiProperty({ isArray: true })
  Data: T[] = [];
}
