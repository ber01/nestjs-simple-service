import { IsUUID } from 'class-validator'
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export abstract class BaseEntity {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt!: Date
}
