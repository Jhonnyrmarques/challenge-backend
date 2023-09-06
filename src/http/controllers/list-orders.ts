import { FastifyReply, FastifyRequest } from 'fastify'

import { ListOrdersUseCase } from '../../usecases/list-orders'
import { PrismaOrdersRepository } from '../../repositories/prisma/prisma-orders-repository'


export async function listOrders(request: FastifyRequest, reply: FastifyReply) {
	
	const prismaOrdersRepository = new PrismaOrdersRepository()
	const listAllOrders = new ListOrdersUseCase(prismaOrdersRepository)


	const orders =	await listAllOrders.execute()
	

	return reply.status(200).send(orders)
}