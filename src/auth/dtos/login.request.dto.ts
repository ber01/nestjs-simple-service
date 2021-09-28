import { IsNotEmpty, IsString } from 'class-validator'

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  private id!: string

  @IsString()
  @IsNotEmpty()
  private password!: string

  public getId(): string {
    return this.id
  }

  public getPassword(): string {
    return this.password
  }
}
