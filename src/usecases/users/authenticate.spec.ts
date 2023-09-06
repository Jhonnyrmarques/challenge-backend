import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'


import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'

import { InvalidCredentialError } from '../errors/invalid-credential-error'

let usersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate User', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		authenticateUseCase = new AuthenticateUseCase(usersRepository)
	})

	it('shoud be able to authenticate', async () => {
		await usersRepository.create({
			first_name: 'Jonh',
			last_name: 'Doe',
			email: 'johndoe@example.com',
			document: await hash('123456', 6),
			birth_date: new Date('1995-08-20'),
			phone_number: '1198526347'
		})

		const { user } = await authenticateUseCase.execute({
			email: 'johndoe@example.com',
			document: '123456'
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should be able to authenticate with wrong email', async () => {
		await expect(() =>
			authenticateUseCase.execute({
				email: 'johndoe@example.com',
				document: '123456',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialError)
	})

	it('should be able to authenticate with wrong password', async () => {

		await usersRepository.create({
			first_name: 'Jonh',
			last_name: 'Doe',
			email: 'johndoe@example.com',
			document: await hash('123456', 6),
			birth_date: new Date('1995-08-20'),
			phone_number: '1198526347'
		})

		await expect(() =>
			authenticateUseCase.execute({
				email: 'johndoe@example.com',
				document: '123123',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialError)
    
	})
})