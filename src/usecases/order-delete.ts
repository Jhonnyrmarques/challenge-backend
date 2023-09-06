import { OrdersRepository } from '../repositories/orders-repository'

import { NotFoundError } from './errors/not-found-error'

interface IRequest {
  orderId: string
}

export class OrderDeleteUseCase {
	constructor(private ordersRepository: OrdersRepository) {}

	async execute({ orderId }: IRequest) {
		const orderExists = await this.ordersRepository.findById(orderId)

		if(!orderExists) {
			throw new NotFoundError('Order')
		}

		await this.ordersRepository.deleteOrder(orderId)
		
	}
}