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
}