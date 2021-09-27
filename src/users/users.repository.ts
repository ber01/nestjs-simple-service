import { EntityRepository, Repository } from 'typeorm'
import { User } from './users.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findByEmail(email: string): Promise<User> {
    return this.findOne({ email })
  }
}
