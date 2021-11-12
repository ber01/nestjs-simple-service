import { IsArray, IsNotEmpty, IsString } from 'class-validator'
import { BaseEntity } from 'src/common/entities'
import { User } from 'src/users/users.entity'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
export class Board extends BaseEntity {
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  public title!: string

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  public content!: string

  @IsArray()
  @Column({ type: 'varchar', array: true, default: [] })
  public tag!: string[]

  @ManyToOne(() => User, (user) => user.boards)
  public user!: User
}
