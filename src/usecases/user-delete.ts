import { UsersRepository } from '../repositories/users-repository'
import { NotFoundError } from './errors/not-found-error'

interface IRequest {
  userId: string
}


export class UserDeleteUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({userId }: IRequest) {
		const userExists = await this.usersRepository.findUserById(userId)

		if(!userExists) {
			throw new NotFoundError('User')
		}

		await this.usersRepository.deleteUser(userId)
		
	}
}