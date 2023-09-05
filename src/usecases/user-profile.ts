import { User } from '@prisma/client'

import { UsersRepository } from '../repositories/users-repository'

import { NotFoundError } from './errors/not-found-error'


interface IRequest {
  userId: string
}

interface IResponse {
  user: User
}

export class UserProfileUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({userId}: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findUserById(userId)

		if(!user) {
			throw new NotFoundError()
		}

		return {
			user
		}
	}
}