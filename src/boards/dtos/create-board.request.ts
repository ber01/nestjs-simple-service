import { PickType } from '@nestjs/swagger'
import { Builder } from 'builder-pattern'
import { User } from 'src/users/users.entity'
import { Board } from '../boards.entity'

export class CreateBoardRequest extends PickType(Board, [
  'title',
  'content',
  'tag',
] as const) {
  public toEntity(user: User): Board {
    return Builder(Board)
      .title(this.title)
      .content(this.content)
      .tag(this.tag)
      .user(user)
      .build()
  }
}
