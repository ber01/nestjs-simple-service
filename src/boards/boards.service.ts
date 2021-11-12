import { Injectable } from '@nestjs/common'
import { BoardRepository } from './boards.repository'

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardRepository) {}
}
