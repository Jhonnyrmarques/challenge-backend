import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


import { ShowOrderUseCase } from '../../../usecases/orders/show-order'
import { PrismaOrdersRepository } from '../../../repositories/prisma/prisma-orders-repository'

import { NotFoundError } from '../../../usecases/errors/not-found-error'


export async function showOrder(request: FastifyRequest, reply: FastifyReply) {
	const showOrderParamsSchema = z.object({
		id: z.string()
	})

	const { id } = showOrderParamsSchema.parse(request.params)

	const ordersRepository = new PrismaOrdersRepository()
	const showOrderUseCase = new ShowOrderUseCase(ordersRepository)

	try{
		const { order } = await showOrderUseCase.execute({orderId: id})

		return reply.status(200).send(order)

	}catch(err) {
		if(err instanceof NotFoundError) {
			return reply.status(404).send({message: err.message})
		}

		throw err
	}

	
}