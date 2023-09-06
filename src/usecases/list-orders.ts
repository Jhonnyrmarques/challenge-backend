import { OrdersRepository } from '../repositories/orders-repository'

export class ListOrdersUseCase {
	constructor(private ordersRepository: OrdersRepository) {}

	async execute() {
		const orders = await this.ordersRepository.listAllOrders()

		return orders
	}
}