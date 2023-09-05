import { Prisma, User } from '@prisma/client'

export interface UserRegistrationRepository {
 create(data: Prisma.UserCreateInput): Promise<User>
}