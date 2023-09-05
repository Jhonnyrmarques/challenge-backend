import { hash } from 'bcryptjs'
import dayjs from 'dayjs'

import { UserRegistrationRepository } from '../repositories/user-registration-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'


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
	constructor(private userRegistrationRepository: UserRegistrationRepository) {}

	async execute({first_name, last_name, document, email, phone_number, birth_date}: IRequest): Promise<IResponse> {
		const emailAlreadyExists = await this.userRegistrationRepository.findByEmail(email)

		const document_hash = await hash(document, 6)

		if(emailAlreadyExists) {
			throw new UserAlreadyExistsError()
		}

		const user = await this.userRegistrationRepository.create({
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