import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
 create(data: Prisma.UserCreateInput): Promise<User>
 findByEmail(email: string): Promise<User | null>
 findUserById(id: string): Promise<User | null>
 updateUser(data: Prisma.UserUpdateInput): Promise<void>
 deleteUser(id: string): Promise<void>
}