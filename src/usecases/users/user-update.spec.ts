import { beforeEach, describe, expect, it } from 'vitest'


import { UserUpdateUseCase } from './user-update'
import { UserRegistrationUseCase } from './user-registration'

import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { NotFoundError } from '../errors/not-found-error'



let usersRepository: InMemoryUsersRepository
let userUpdate: UserUpdateUseCase
let userRegistration: UserRegistrationUseCase

describe('User Update', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		userUpdate = new UserUpdateUseCase(usersRepository)
		userRegistration = new UserRegistrationUseCase(usersRepository)
	})

	it('should be possible to update a user profile', async () => {
		const { user } = await userRegistration.execute({
			first_name: 'Jonh',
			last_name: 'Doe',
			document: '50898574072',
			birth_date: new Date('1992-06-15'),
			email: 'jonhdoe@example.com',
			phone_number: '92986411974'
		})

		await userUpdate.execute({userId: user.id, first_name: 'Luíz'})

		expect(user.first_name).toEqual('Luíz')
		
	})

	it('should not be possible to update a user with non-existent id', async () => {
		await	expect(() => 
			userUpdate.execute({
				userId: 'invalid-id', 
				first_name: 'Luíz'
			})
		).rejects.toBeInstanceOf(NotFoundError)

		
	})
})