import { EntityRepository, Repository } from 'typeorm'
import { User } from './users.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findByEmail(email: string): Promise<User> {
    return this.findOne({ email })
  }

  public findByIdWithoutPassword(id: string): Promise<User> {
    const queryBuilder = this.createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.name',
        'user.imageUrl',
        'user.createdAt',
        'user.updatedAt',
      ])
      .where({ id })

    return queryBuilder.getOne()
  }
}
