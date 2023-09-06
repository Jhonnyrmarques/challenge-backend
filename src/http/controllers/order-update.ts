import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaOrdersRepository } from '../../repositories/prisma/prisma-orders-repository'

import { OrderUpdateUseCase } from '../../usecases/order-update'

import { NotFoundError } from '../../usecases/errors/not-found-error'


export async function orderUpdate(request: FastifyRequest, reply: FastifyReply) {

	const orderUpdateBodySchema = z.object({
		description: z.string(),
		quantity: z.number(),
		price: z.number(),
	})

	const ordeIdParamSchema = z.object({
		id: z.string()
	})

	const { id } = ordeIdParamSchema.parse(request.params)

	const {
		description,
		quantity,
		price
	} = orderUpdateBodySchema.parse(request.body)

	const prismaOrdersRepository = new PrismaOrdersRepository()
	const orderUpdateUseCase = new OrderUpdateUseCase(prismaOrdersRepository)

	try{
		await orderUpdateUseCase.execute({
			id,
			description,
			quantity,
			price,
		})
	}catch(err) {
		if(err instanceof NotFoundError) {
			return reply.status(404).send({message: err.message})
		}

		throw err
	}

	return reply.status(201).send()
}