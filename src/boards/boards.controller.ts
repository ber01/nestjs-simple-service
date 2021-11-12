import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards'
import { CurrentUser } from 'src/common'
import { User } from 'src/users/users.entity'
import { BoardsService } from './boards.service'
import { CreateBoardRequest } from './dtos/create-board.request'

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public createBoard(
    @CurrentUser() user: User,
    @Body() req: CreateBoardRequest,
  ) {
    return this.boardsService.createBoard(user, req)
  }
}
