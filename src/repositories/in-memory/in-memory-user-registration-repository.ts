import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'

import { UserRegistrationRepository } from '../user-registration-repository'
import dayjs from 'dayjs'


export class InMemoryUserRegistrationRepository implements UserRegistrationRepository {
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
}