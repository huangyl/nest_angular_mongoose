import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        console.log('错误日志:',exception.message);
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        res.status(exception.status).send(' ');
    }
}