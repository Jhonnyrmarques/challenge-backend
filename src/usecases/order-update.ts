import { OrdersRepository } from '../repositories/orders-repository'
import { NotFoundError } from './errors/not-found-error'

interface IRequest {
  id: string,
  description?: string
  price?: number
  quantity?: number
}

export class OrderUpdateUseCase {
	constructor(private ordersRepository: OrdersRepository) {}

	async execute({id, description, price, quantity}: IRequest) {
		const orderExists = await this.ordersRepository.findById(id)

		if(!orderExists) {
			throw new NotFoundError('Order')
		}
    
		await this.ordersRepository.updateOrder({
			id,
			description,
			price,
			quantity
		})
	}
}