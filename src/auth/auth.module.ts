import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies'

const jwtModuleAsyncOptions: JwtModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET_KEY'),
    signOptions: { expiresIn: '10m' },
  }),
  inject: [ConfigService],
}

@Module({
  imports: [PassportModule, JwtModule.registerAsync(jwtModuleAsyncOptions)],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
