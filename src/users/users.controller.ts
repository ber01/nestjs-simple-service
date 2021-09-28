import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { SuccessInterceptor } from 'src/common/interceptors'
import { SignUpRequestDto } from './dtos'
import { UsersService } from './users.service'

@Controller('users')
@UseInterceptors(SuccessInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  public signUp(@Body() dto: SignUpRequestDto) {
    return this.userService.signUp(dto)
  }

  @Get('/all')
  public getAllUser() {
    return this.userService.getAllUser()
  }

  @Get('/:id')
  public getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id)
  }
}
