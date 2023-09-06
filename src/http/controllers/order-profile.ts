import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaOrdersRepository } from '../../repositories/prisma/prisma-orders-repository'
import { OrderProfileUseCase } from '../../usecases/order-profile'

import { NotFoundError } from '../../usecases/errors/not-found-error'


export async function orderProfile(request: FastifyRequest, reply: FastifyReply) {
	const orderProfileParamsSchema = z.object({
		id: z.string()
	})

	const { id } = orderProfileParamsSchema.parse(request.params)

	const ordersRepository = new PrismaOrdersRepository()
	const orderProfileUseCase = new OrderProfileUseCase(ordersRepository)

	try{
		const { order } = await orderProfileUseCase.execute({orderId: id})

		return reply.status(200).send(order)

	}catch(err) {
		if(err instanceof NotFoundError) {
			return reply.status(404).send({message: err.message})
		}

		throw err
	}

	
}