import { Catch, ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('exception :', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status = 400;
    let resMessage = '';
    if (!exception['response']) {
      resMessage = exception.message;
    } else {
      resMessage = exception['response']['message'];
    }
    try {
      status = exception.getStatus();
    } catch (error) {}
    response
      .status(status)
      .json({
        code: status,
        message: resMessage,
        status: 'fail',
        timestampz: new Date(),
      });
  }
}
