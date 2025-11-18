import { ApiProperty } from "@nestjs/swagger";
import { ErrorCode } from "../error-code.enum";

export class PaginationDto {
  @ApiProperty({ example: 0, description: 'Tổng số item' })
  TotalCount: number = 0;

  @ApiProperty({ example: 0, description: 'Tổng số trang' })
  TotalPage: number = 0;
}

export class BaseResponseMessage {
  @ApiProperty({
    description: 'Thông tin lỗi',
    type: Object
  })
  error: {
    Code: ErrorCode;
    Message: string;
  };

  constructor(code: ErrorCode = ErrorCode.SUCCESS) {
    this.error = {
      Code: code,
      Message: toDescriptionString(code),
    };
  }
}

export class BaseResponseMessageGeneric<T> extends BaseResponseMessage {
  @ApiProperty({
    description: 'Dữ liệu trả về',
    type: Object,
    nullable: true,
  })
  Data: T | null;

  constructor(type?: new () => T) {
    super();
    if (type === String as any) {
      this.Data = '' as any;
    } else if (type) {
      this.Data = new type();
    } else {
      this.Data = null;
    }
  }
}

export class BaseResponseMessageItem<T> {
  @ApiProperty({
    type: [Object],
    description: 'Danh sách items'
  })
  Items: T[] = [];
}

export class BaseResponseMessagePage<T> {
  @ApiProperty({
    type: [Object],
    description: 'Danh sách items'
  })
  Items: T[] = [];

  @ApiProperty({
    type: PaginationDto,
    description: 'Thông tin phân trang'
  })
  Pagination: PaginationDto = new PaginationDto();
}

export class BaseUpdateCode<T> {
  @ApiProperty()
  query: QueryBase | null = null;

  @ApiProperty({ type: [Object] })
  Results: T[] = [];

  @ApiProperty()
  err: string | null = null;
}

export class QueryBase {
  max_time = 0;
}

export class BaseUpdateCodeData<T> {
  @ApiProperty()
  Code = 0;

  @ApiProperty()
  Results: T | null = null;
}

export class BaseResponse {
  @ApiProperty()
  Code: ErrorCode = ErrorCode.SUCCESS;

  @ApiProperty()
  Message: string = toDescriptionString(ErrorCode.SUCCESS);
}

export class DataResponse<T> extends BaseResponse {
  @ApiProperty({ type: Object })
  Data: T;

  constructor(data: T) {
    super();
    this.Data = data;
  }
}

export function toDescriptionString(code: ErrorCode): string {
  return ErrorCode[code] ?? code.toString();
}
