import { Prisma } from '@prisma/client'

import { OrdersRepository } from '../orders-repository'
import { prisma } from '../../lib/prisma'

export class PrismaOrdersRepository implements OrdersRepository {
	async create(data: Prisma.OrderUncheckedCreateInput) {
		const order = await prisma.order.create({
			data
		})

		return order
	}

	async updateOrder(data: Prisma.OrderUncheckedUpdateInput) {
		await prisma.order.update({
			where: {
				id: data.id?.toString()
			},
			data: {
				description: data.description,
				quantity: data.quantity,
				price: data.price
			}
		})
	}

	async findById(id: string) {
		const order = await prisma.order.findUnique({
			where: {
				id
			}
		})

		return order
	}

	async listAllOrders() {
		const orders = await prisma.order.findMany()

		return orders
	}
  
}