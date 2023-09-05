import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'


import { UsersRepository } from '../users-repository'


export class PrismaUsersRepository implements UsersRepository {
	
	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data
		})

		return user
	}

	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})

		return user
	}

	async	findUserById(id: string){
		const user = await prisma.user.findUnique({
			where: {
				id
			}
		})

		return user
	}

	async updateUser(data: Prisma.UserUpdateInput) {
		await prisma.user.update({
			where: {
				id: data.id?.toString(),
			},
			data : {
				first_name: data.first_name,
				last_name: data.last_name,
				phone_number: data.phone_number,
				birth_date: data.birth_date
			}
		})

	}
  
}