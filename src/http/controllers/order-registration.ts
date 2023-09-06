import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaOrdersRepository } from '../../repositories/prisma/prisma-orders-repository'
import { OrdersRegistrationUseCase } from '../../usecases/orders/order-registration'


export async function orderRegistration(request: FastifyRequest, reply: FastifyReply) {

	const orderRegisterBodySchema = z.object({
		description: z.string(),
		quantity: z.number(),
		price: z.number(),
		user_id: z.string(),
	})

	const {
		description,
		quantity,
		price,
		user_id
	} = orderRegisterBodySchema.parse(request.body)

	const prismaOrdersRepository = new PrismaOrdersRepository()
	const orderRegistrationUseCase = new OrdersRegistrationUseCase(prismaOrdersRepository)


	await orderRegistrationUseCase.execute({
		description,
		quantity,
		price,
		user_id
	})
	

	return reply.status(201).send()
}