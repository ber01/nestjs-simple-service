import { IsJWT } from 'class-validator'

export class LoginResponseDto {
  @IsJWT()
  private accessToken!: string

  public getAccessToken(): string {
    return this.accessToken
  }
}
