import { FastifyReply, FastifyRequest } from 'fastify'


import { PrismaOrdersRepository } from '../../repositories/prisma/prisma-orders-repository'
import { ListOrdersUseCase } from '../../usecases/orders/list-orders'


export async function listOrders(request: FastifyRequest, reply: FastifyReply) {
	
	const prismaOrdersRepository = new PrismaOrdersRepository()
	const listAllOrders = new ListOrdersUseCase(prismaOrdersRepository)


	const orders =	await listAllOrders.execute()
	

	return reply.status(200).send(orders)
}