import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Board } from 'src/boards/boards.entity'
import { BaseEntity } from 'src/common/entities'
import { Column, Entity, OneToMany } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @IsEmail()
  @Column({ type: 'varchar', unique: true, nullable: false })
  public email!: string

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', nullable: false })
  public name!: string

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', nullable: false })
  public password!: string

  @IsString()
  @IsOptional()
  @Column({ type: 'varchar', nullable: true })
  public imageUrl?: string

  @OneToMany(() => Board, (board) => board.user, { cascade: true })
  public boards!: Board[]
}
