import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaOrdersRepository } from '../../../repositories/prisma/prisma-orders-repository'
import { OrderDeleteUseCase } from '../../../usecases/orders/order-delete'

import { NotFoundError } from '../../../usecases/errors/not-found-error'


export async function orderDelete(request: FastifyRequest, reply: FastifyReply) {
	
	const orderDeleteParamsSchema = z.object({
		id: z.string()
	})


	const { id } = orderDeleteParamsSchema.parse(request.params)

	
	const prismaOrdersRepository = new PrismaOrdersRepository()
	const orderDeleteUseCase = new OrderDeleteUseCase(prismaOrdersRepository)

	try{
		await orderDeleteUseCase.execute({
			orderId: id,
		})
	}catch(err) {
		if(err instanceof NotFoundError) {
			return reply.status(404).send({message: err.message})
		}

		throw err
	}

	return reply.status(200).send()
}