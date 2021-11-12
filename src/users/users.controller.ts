import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { LoginRequestDto } from 'src/auth/dtos'
import { JwtAuthGuard } from 'src/auth/guards'
import { SuccessInterceptor } from 'src/common'
import { SignUpRequestDto } from './dtos'
import { UsersService } from './users.service'

@Controller('users')
@UseInterceptors(SuccessInterceptor)
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  public signUp(@Body() dto: SignUpRequestDto) {
    return this.userService.signUp(dto)
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  public getUsers() {
    return this.userService.getUsers()
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  public getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.userService.getUserById(id)
  }

  @Post('/login')
  public login(@Body() dto: LoginRequestDto) {
    return this.authService.login(dto)
  }
}
