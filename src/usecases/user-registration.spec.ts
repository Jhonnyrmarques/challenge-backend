import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'

import { InMemoryUserRegistrationRepository } from '../repositories/in-memory/in-memory-user-registration-repository'
import { UserRegistrationUseCase } from './user-registration'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'


let userRegistrationRepository: InMemoryUserRegistrationRepository
let userRegistration: UserRegistrationUseCase

describe('User registration', () => {
	beforeEach(() => {
		userRegistrationRepository = new InMemoryUserRegistrationRepository()
		userRegistration = new UserRegistrationUseCase(userRegistrationRepository)
	})


	it('should be possible to register', async () => {
		const { user } = await userRegistration.execute({
			first_name: 'Jonh',
			last_name: 'Doe',
			document: '50898574072',
			birth_date: new Date('1992-06-15'),
			email: 'jonhdoe@example.com',
			phone_number: '92986411974'
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should hash user document upon registration', async () => {
		const { user } = await userRegistration.execute({
			first_name: 'Jonh',
			last_name: 'Doe',
			document: '50898574072',
			birth_date: new Date('1992-06-15'),
			email: 'jonhdoe@example.com',
			phone_number: '92986411974'
		})
		
		const correctlyHashedDocument = await compare(
			'50898574072',
			user.document
		)

		expect(correctlyHashedDocument).toBe(true)
	})

	it('should not be possible to register a user with duplicate email', async () => {

		await userRegistration.execute({
			first_name: 'Jonh',
			last_name: 'Doe',
			document: '50898574072',
			birth_date: new Date('1992-06-15'),
			email: 'jonhdoe@example.com',
			phone_number: '92986411974'
		})

		await expect(() => userRegistration.execute({
			first_name: 'Claudia',
			last_name: 'Lorena',
			document: '61922406040',
			birth_date: new Date('1992-06-15'),
			email: 'jonhdoe@example.com',
			phone_number: '12988876930'
		})
		).rejects.toBeInstanceOf(UserAlreadyExistsError)
    
	})
})