import { Order, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'

import { OrdersRepository } from '../orders-repository'


export class InMemoryOrdersRepository implements OrdersRepository {
	public orders: Order[] = []
  
	async create(data: Prisma.OrderUncheckedCreateInput){
		const order = {
			id: randomUUID(),
			description: data.description,
			quantity: new Decimal(data.quantity.toString()),
			price: new Decimal(data.price.toString()),
			user_id: data.user_id,
			created_at: new Date(),
			updated_at: null
		}

		this.orders.push(order)

		return order
	}
  
}