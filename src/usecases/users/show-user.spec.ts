import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { ShowUserUseCase } from './show-user'

import { NotFoundError } from '../errors/not-found-error'


let usersRepository: InMemoryUsersRepository
let userProfile: ShowUserUseCase

describe('Get User Profile', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		userProfile = new ShowUserUseCase(usersRepository)
	})


	it('should be possible to list a profile', async () => {
		const userCreated = await usersRepository.create({
			first_name: 'Clarice',
			last_name: 'Heloise Caroline da Cunha',
			document: '60111056888',
			birth_date: new Date('1996-07-14'),
			email: 'clarice-dacunha83@petrobrais.com.br',
			phone_number: '16986339939'
		})

		const {user} = await userProfile.execute({userId: userCreated.id})

		expect(user.first_name).toEqual('Clarice')
	})

	it('should not be possible to list a profile with non-existent id', async () => {
		await	expect(() => 
			userProfile.execute({
				userId: 'invalid-id'
			})
		).rejects.toBeInstanceOf(NotFoundError)
	})
})