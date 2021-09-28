import { EntityRepository, Repository } from 'typeorm'
import { User } from './users.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findByEmail(email: string): Promise<User> {
    return this.findOne({ email })
  }

  public findByName(name: string): Promise<User> {
    return this.findOne({ name })
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

  public findAllWithoutPassword(): Promise<User[]> {
    const queryBuilder = this.createQueryBuilder('user').select([
      'user.id',
      'user.email',
      'user.name',
      'user.imageUrl',
      'user.createdAt',
      'user.updatedAt',
    ])

    return queryBuilder.getMany()
  }
}
