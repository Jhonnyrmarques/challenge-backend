import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrdersRepository } from '../repositories/in-memory/in-memory-orders-repository'
import { OrdersRegistrationUseCase } from './order-registration'

import { UserRegistrationUseCase } from './user-registration'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'


let ordersRepository: InMemoryOrdersRepository
let ordersRegistration: OrdersRegistrationUseCase
let usersRepository: InMemoryUsersRepository
let userRegistration: UserRegistrationUseCase

describe('Order registration', () => {
	beforeEach(() => {
		ordersRepository = new InMemoryOrdersRepository()
		ordersRegistration = new OrdersRegistrationUseCase(ordersRepository)
		usersRepository = new InMemoryUsersRepository()
		userRegistration = new UserRegistrationUseCase(usersRepository)
	})


	it('should be possible to register a new order', async () => {

		const { user } = await userRegistration.execute({
			first_name: 'Jonh',
			last_name: 'Doe',
			document: '50898574072',
			birth_date: new Date('1992-06-15'),
			email: 'jonhdoe@example.com',
			phone_number: '92986411974'
		})
    
		const { order } = await ordersRegistration.execute({
			description: 'Fone de Ouvido',
			quantity: 1,
			price: 168.50,
			user_id: user.id
		})

		expect(order.id).toEqual(expect.any(String))
	})

	
})