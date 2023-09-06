import { UsersRepository } from '../repositories/users-repository'

export class ListUsersUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute() {
		const users = await this.usersRepository.listAllUsers()

		return users
	}
}