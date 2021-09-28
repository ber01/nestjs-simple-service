import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { plainToClass } from 'class-transformer'
import { EntityManager, Transaction, TransactionManager } from 'typeorm'
import { SignUpRequestDto, SignUpResponseDto } from './dtos'
import { UserRepository } from './users.repository'

@Injectable()
export class UsersService {
  constructor(private readonly userRepostiory: UserRepository) {}

  @Transaction()
  public async signUp(
    dto: SignUpRequestDto,
    @TransactionManager() manager?: EntityManager,
  ) {
    const email = dto.getEmail()
    const user = await this.userRepostiory.findByEmail(email)
    if (user) {
      throw new ConflictException('email is exist')
    }

    const saveUser = await this.saveUser(dto, manager)
    if (!saveUser) {
      throw new InternalServerErrorException('sign-up error')
    }

    return plainToClass(SignUpResponseDto, {
      id: saveUser.id,
      email: saveUser.email,
      name: saveUser.name,
    })
  }

  private async saveUser(dto: SignUpRequestDto, manager: EntityManager) {
    const password = dto.getPassword()
    const saltOrRounds = 10
    const hashPassword = await bcrypt.hash(password, saltOrRounds)
    dto.setPassword(hashPassword)
    return await manager?.save(dto.toEntity())
  }

  public async getUserById(id: string) {
    const user = await this.userRepostiory.findByIdWithoutPassword(id)
    if (!user) {
      throw new NotFoundException('user is not exist')
    }

    return user
  }

  public async getAllUser() {
    const users = await this.userRepostiory.findAllWithoutPassword()
    if (!users.length) {
      throw new NotFoundException('users is not exists')
    }

    return users
  }
}
