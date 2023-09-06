import { Order } from '@prisma/client'

import { OrdersRepository } from '../repositories/orders-repository'

import { NotFoundError } from './errors/not-found-error'


interface IRequest {
  orderId: string
}

interface IResponse {
  order: Order
}

export class OrderProfileUseCase {
	constructor(private ordersRepository: OrdersRepository) {}

	async execute({ orderId }: IRequest): Promise<IResponse> {
		const order = await this.ordersRepository.findById(orderId)

		if(!order) {
			throw new NotFoundError('Order')
		}

		return {
			order
		}
	}
}