import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import dayjs from 'dayjs'

import { UsersRepository } from '../repositories/users-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'


interface IRequest {
	first_name: string
	last_name: string
	document: string
	email: string
	phone_number: string
	birth_date: Date
}

interface IResponse {
	user: User
}

export class UserRegistrationUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({first_name, last_name, document, email, phone_number, birth_date}: IRequest): Promise<IResponse> {
		const emailAlreadyExists = await this.usersRepository.findByEmail(email)

		const document_hash = await hash(document, 6)

		if(emailAlreadyExists) {
			throw new UserAlreadyExistsError()
		}

		const user = await this.usersRepository.create({
			first_name,
			last_name,
			document: document_hash,
			email,
			phone_number,
			birth_date: dayjs(birth_date).toDate()
		})

		return {
			user
		}
	}
}