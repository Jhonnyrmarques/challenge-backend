import { UsersRepository } from '../repositories/users-repository'
import { NotFoundError } from './errors/not-found-error'

interface IRequest {
  userId: string
  first_name?: string
	last_name?: string
	phone_number?: string
	birth_date?: Date
}


export class UserUpdateUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({userId, first_name, last_name, phone_number, birth_date}: IRequest) {
		const userExists = await this.usersRepository.findUserById(userId)

		if(!userExists) {
			throw new NotFoundError('User')
		}

		await this.usersRepository.updateUser({
			id: userId,
			first_name,
			last_name,
			phone_number,
			birth_date
		})
		
	}
}