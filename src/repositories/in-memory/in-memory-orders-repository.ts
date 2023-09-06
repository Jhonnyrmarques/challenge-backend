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

	async	updateOrder(data: Prisma.OrderUncheckedUpdateInput) {
		const index = this.orders.findIndex(order => order.id === data.id)
		
		if(index >= 0) {

			if(data.description){
				this.orders[index].description = data.description.toString()
			}

			if(data.price) {
				this.orders[index].price = new Decimal(data.price.toString())
			}

			if(data.quantity){
				this.orders[index].quantity = new Decimal(data.quantity.toString())
			}
		}
	}

	async findById(id: string) {
		const order = this.orders.find(order => order.id === id)

		if(!order) {
			return null
		}

		return order
	}

	async listAllOrders(){
		return this.orders
	}

	async deleteOrder(id: string) {
		const index = this.orders.findIndex(order => order.id === id)
		delete this.orders[index]
	}
  
}