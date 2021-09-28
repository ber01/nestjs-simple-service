import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { plainToClass } from 'class-transformer'
import * as EmailValidator from 'email-validator'
import { User } from 'src/users/users.entity'
import { UserRepository } from 'src/users/users.repository'
import { LoginRequestDto, LoginResponseDto } from './dtos'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async login(dto: LoginRequestDto) {
    const id = dto.getId()
    const user = await this.getUser(id)

    const password = dto.getPassword()
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    )

    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호를 확인하세요.')
    }

    // jwt 반환, sub: JWT의 주제(사용자)
    const payload = { username: id, sub: user.id }
    const accessToken = this.jwtService.sign(payload)
    return plainToClass(LoginResponseDto, { accessToken })
  }

  private async getUser(id: string): Promise<User> {
    const isEmail = EmailValidator.validate(id)
    if (isEmail) {
      const email = id
      const user = await this.userRepository.findByEmail(email)
      if (!user) {
        throw new UnauthorizedException('이메일과 비밀번호를 확인하세요.')
      }
      return user
    }

    const name = id
    const user = await this.userRepository.findByName(name)
    if (!user) {
      throw new UnauthorizedException('이름과 비밀번호를 확인하세요.')
    }
    return user
  }
}
