import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { ShowUserUseCase } from '../../../usecases/users/show-user'

import { NotFoundError } from '../../../usecases/errors/not-found-error'



export async function showUser(request: FastifyRequest, reply: FastifyReply) {
	const showUserParamsSchema = z.object({
		id: z.string()
	})

	const { id } = showUserParamsSchema.parse(request.params)

	const usersRepository = new PrismaUsersRepository()
	const showUserUseCase = new ShowUserUseCase(usersRepository)

	try{
		const { user } = await showUserUseCase.execute({userId: id})

		return reply.status(200).send(user)

	}catch(err) {
		if(err instanceof NotFoundError) {
			return reply.status(404).send({message: err.message})
		}

		throw err
	}

	
}