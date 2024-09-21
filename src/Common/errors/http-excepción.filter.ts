import { Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter {
  catch(exception: HttpException, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Si el mensaje es un objeto, se asume que tiene una propiedad 'message'
    const message = typeof exceptionResponse === 'object' && exceptionResponse['message']
      ? exceptionResponse['message']
      : exceptionResponse;

    response
      .status(status)
      .json({
        statusCode: status,
        message: message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
