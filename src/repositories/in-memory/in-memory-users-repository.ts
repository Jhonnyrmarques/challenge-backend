import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'

import { UsersRepository } from '../users-repository'


export class InMemoryUsersRepository implements UsersRepository {
	public users: User[] = []

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: randomUUID(),
			first_name: data.first_name,
			last_name: data.last_name,
			document: data.document,
			email: data.email,
			phone_number: data.phone_number,
			birth_date: dayjs(data.birth_date).toDate(),
			created_at: new Date(),
			updated_at: null
		}

		this.users.push(user)

		return user
	}

	async findByEmail(email: string) {
		const user = this.users.find(user => user.email === email)

		if(!user) {
			return null
		}

		return user
	}

	async findUserById(id: string) {
		const user = this.users.find(user => user.id === id)

		if(!user) {
			return null
		}

		return user
	}

	async updateUser(data: Prisma.UserUpdateInput) {
		const index = this.users.findIndex(user => user.id === data.id)

		if(index >= 0) {
			if(data.first_name) {
				this.users[index].first_name = data.first_name.toString()
			}
		}
		
	}

	async deleteUser(id: string) {
		const index = this.users.findIndex(user => user.id === id)
		delete this.users[index]
		
	}

	async listAllUsers() {
		return this.users
	}
	
}