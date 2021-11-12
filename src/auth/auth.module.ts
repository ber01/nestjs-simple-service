import { forwardRef, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from 'src/users/users.module'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies'

const jwtModuleAsyncOptions: JwtModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: { expiresIn: '7d' },
  }),
  inject: [ConfigService],
}

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(jwtModuleAsyncOptions),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
