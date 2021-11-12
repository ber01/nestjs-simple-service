import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const res = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] }

    response.status(status).json({
      statusCode: status,
      message: typeof res === 'string' ? res : res.message,
      data: undefined,
    })
  }
}
