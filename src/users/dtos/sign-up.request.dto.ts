import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { User } from '../users.entity'

export class SignUpRequestDto {
  @IsEmail()
  private email!: string

  @IsString()
  @IsNotEmpty()
  private name!: string

  @IsString()
  @IsNotEmpty()
  private password!: string

  public getEmail() {
    return this.email
  }

  public getName() {
    return this.name
  }

  public getPassword() {
    return this.password
  }

  public setPassword(password: string) {
    this.password = password
  }

  public toEntity(): User {
    const user = new User()
    user.email = this.getEmail()
    user.name = this.getName()
    user.password = this.getPassword()
    return user
  }
}
