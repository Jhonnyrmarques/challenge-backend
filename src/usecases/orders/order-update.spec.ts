import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrdersRepository } from '../../repositories/in-memory/in-memory-orders-repository'

import { OrderUpdateUseCase } from './order-update'
import { OrdersRegistrationUseCase } from './order-registration'


let ordersRepository: InMemoryOrdersRepository
let ordersUpdate: OrderUpdateUseCase
let ordersRegistration: OrdersRegistrationUseCase

describe('Order Update', () => {
	beforeEach(() => {
		ordersRepository = new InMemoryOrdersRepository()
		ordersUpdate = new OrderUpdateUseCase(ordersRepository)
		ordersRegistration = new OrdersRegistrationUseCase(ordersRepository)
	})

	it('should be possible to update order', async () => {

		const { order } = await ordersRegistration.execute({
			description: 'Fone de Ouvido',
			quantity: 1,
			price: 168.50,
			user_id: 'test'
		})

		await ordersUpdate.execute({id: order.id, description: 'Mouse'})

		expect(order.description).toEqual('Mouse')
		
	})
})