import { HttpException, HttpStatus } from '@nestjs/common';

export function throwError(message: string, code: HttpStatus) {
  throw new HttpException(message, code);
}
