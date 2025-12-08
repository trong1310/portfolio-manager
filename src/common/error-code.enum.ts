export enum ErrorCode {
  
  SUCCESS = 200,
  FAILL = 1,
  NOT_FOUND = 404,
  VALIDATION = 400,
  SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  PROJECT_NAME_EXIST ,
}
export const ErrorMessage: Record<ErrorCode, string> = {
  [ErrorCode.SUCCESS]: 'Success',
  [ErrorCode.FAILL]: 'Operation failed',
  [ErrorCode.NOT_FOUND]: 'Resource not found',
  [ErrorCode.VALIDATION]: 'Validation error',
  [ErrorCode.SERVER_ERROR]: 'Internal server error',
  [ErrorCode.UNAUTHORIZED]: 'Unauthorized',
  [ErrorCode.PROJECT_NAME_EXIST]: 'Project name already exists',
};
