import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import * as Joi from 'joi'
import { BoardsModule } from './boards/boards.module'

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    password: configService.get('DATABASE_PASSWORD'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    database: configService.get('DATABASE_DATABASE'),
    autoLoadEntities: true,
    logging: ['error', 'query'],
    synchronize: true,
  }),
  inject: [ConfigService],
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().default('localhost'),
        DATABASE_PASSWORD: Joi.string().default('pg'),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USER: Joi.string().default('pg'),
        DATABASE_DATABASE: Joi.string().default('pg'),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UsersModule,
    AuthModule,
    BoardsModule,
  ],
})
export class AppModule {}
