import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { BaseEntity } from 'src/common/entities'
import { Column, DeleteDateColumn, Entity } from 'typeorm'

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

  @DeleteDateColumn({ type: 'timestamptz' })
  public deletedAt?: Date
}
