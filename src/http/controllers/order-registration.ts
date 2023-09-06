import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


import { UserAlreadyExistsError } from '../../usecases/errors/user-already-exists-error'

import { PrismaOrdersRepository } from '../../repositories/prisma/prisma-orders-repository'
import { OrdersRegistrationUseCase } from '../../usecases/order-registration'


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

	try{
		await orderRegistrationUseCase.execute({
			description,
			quantity,
			price,
			user_id
		})
	}catch(err) {
		if(err instanceof UserAlreadyExistsError) {
			return reply.status(409).send({message: err.message})
		}

		throw err
	}

	return reply.status(201).send()
}