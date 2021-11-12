import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { User } from 'src/users/users.entity'
import { EntityManager, Transaction, TransactionManager } from 'typeorm'
import { BoardRepository } from './boards.repository'
import { CreateBoardRequest } from './dtos'
import { CreateBoardResponse } from './dtos/create-board.response'

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardRepository) {}

  @Transaction()
  public async createBoard(
    user: User,
    req: CreateBoardRequest,
    @TransactionManager() manager?: EntityManager,
  ) {
    const board = await manager.save(req.toEntity(user))
    if (!board) {
      throw new InternalServerErrorException('create-board error')
    }

    const boardsOfCurrentUser = user.boards
    console.log('boardsOfCurrentUser =>', boardsOfCurrentUser)

    // throw new BadRequestException('API 테스트 중')

    const { id } = board
    return plainToClass(CreateBoardResponse, { id })
  }
}
