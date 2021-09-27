import { Body, Controller, Post } from '@nestjs/common'
import { SignUpRequestDto } from './dtos'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  public signUp(@Body() dto: SignUpRequestDto) {
    return this.userService.signUp(dto)
  }
}
