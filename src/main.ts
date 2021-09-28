import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { httpExceptionFilter, validationPipe } from './common'

const logger = new Logger(bootstrap.name)

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(validationPipe)
  app.useGlobalFilters(httpExceptionFilter)

  await app.listen(3000)
  logger.log('Hello World!')
}

bootstrap()
