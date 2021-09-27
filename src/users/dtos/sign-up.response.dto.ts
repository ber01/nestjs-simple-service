import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class SignUpResponseDto {
  @IsUUID()
  private id!: string

  @IsEmail()
  private email!: string

  @IsString()
  @IsNotEmpty()
  private name!: string
}
