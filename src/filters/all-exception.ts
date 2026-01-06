import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';
import * as HttpRequestIp from 'request-ip';
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();
  constructor(private PinoLogger?: PinoLogger) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    this.logger.error(`${request.method} ${request.url} ${exception.message}`);
    // 如果是http异常,不是择返回500错误
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(httpStatus).json({
      code: httpStatus,
      date_time: new Date().toLocaleString(),
      msg: exception.message,
      path: request.url,
      ip: HttpRequestIp.getClientIp(request),
    });
  }
}
