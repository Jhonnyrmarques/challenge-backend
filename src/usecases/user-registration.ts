import { UserRegistrationRepository } from '../repositories/user-registration-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface IRequest {
	first_name: string
	last_name: string
	document: string
	email: string
	phone_number: string
	birth_date: Date
}

export class UserRegistrationUseCase {
	constructor(private userRegistrationRepository: UserRegistrationRepository) {}

	async execute({first_name, last_name, document, email, phone_number, birth_date}: IRequest) {
		const emailAlreadyExists = await this.userRegistrationRepository.findByEmail(email)

		if(emailAlreadyExists) {
			throw new UserAlreadyExistsError()
		}

		const user = await this.userRegistrationRepository.create({
			first_name,
			last_name,
			document,
			email,
			phone_number,
			birth_date
		})

		return {
			user
		}
	}
}