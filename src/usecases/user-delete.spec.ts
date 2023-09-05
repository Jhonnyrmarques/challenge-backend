import { beforeEach, describe, expect, it } from 'vitest'

import { UserDeleteUseCase } from './user-delete'

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'

import { UserRegistrationUseCase } from './user-registration'

import { NotFoundError } from './errors/not-found-error'


let usersRepository: InMemoryUsersRepository
let userDelete: UserDeleteUseCase
let userRegistration: UserRegistrationUseCase

describe('Delete User', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		userDelete = new UserDeleteUseCase(usersRepository)
		userRegistration = new UserRegistrationUseCase(usersRepository)
	})

	it('should be possible to delete a user', async () => {
		const { user } = await userRegistration.execute({
			first_name: 'Jonh',
			last_name: 'Doe',
			document: '50898574072',
			birth_date: new Date('1992-06-15'),
			email: 'jonhdoe@example.com',
			phone_number: '92986411974'
		})

		const deleted =	await userDelete.execute({userId: user.id})
   
		expect(deleted).toBe(undefined)

		
	})

	it('should not be possible to delete a user with non-existent id', async () => {
		await	expect(() => 
			userDelete.execute({
				userId: 'invalid-id', 
				
			})
		).rejects.toBeInstanceOf(NotFoundError)

	})
})