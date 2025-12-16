import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
        if (
          result &&
          (result.message !== undefined) &&
          (result.data !== undefined || result.error !== undefined)
        ) {
          return result;
        }

        return {
          message: 'success',
          data: result === undefined ? null : result,
        };
      }),
    );
  }
}
