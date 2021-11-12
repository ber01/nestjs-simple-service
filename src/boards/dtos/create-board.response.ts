import { IsUUID } from 'class-validator'

export class CreateBoardResponse {
  @IsUUID()
  public id!: string
}
