import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BoardsController } from './boards.controller'
import { Board } from './boards.entity'
import { BoardRepository } from './boards.repository'
import { BoardsService } from './boards.service'

@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardRepository])],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [TypeOrmModule],
})
export class BoardsModule {}
