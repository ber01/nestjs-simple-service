import { IsNotEmpty, IsString } from 'class-validator'
import { BaseEntity } from 'src/common/entities'
import { Column, Entity } from 'typeorm'

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

  @Column({ type: 'varchar', default: [] })
  public tag!: string[]
}
