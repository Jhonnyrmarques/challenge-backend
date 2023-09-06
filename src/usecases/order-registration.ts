import { OrdersRepository } from '../repositories/orders-repository'

interface IRequest {
  description: string
  quantity: number
  price: number
  user_id: string,
}

export class OrdersRegistrationUseCase {
	constructor(
    private ordersRepository: OrdersRepository,
	) {}

	async execute({description, quantity, price, user_id}: IRequest) {
		const order = await this.ordersRepository.create({
			description,
			quantity,
			price,
			user_id,
			created_at: new Date()
		})

		return {
			order
		}
	}
}