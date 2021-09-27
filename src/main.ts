import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const logger = new Logger(bootstrap.name)

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
  logger.log('Hello World!')
}

bootstrap()
