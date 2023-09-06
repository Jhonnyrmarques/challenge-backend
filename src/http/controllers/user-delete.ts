import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'

import { UserDeleteUseCase } from '../../usecases/user-delete'

import { NotFoundError } from '../../usecases/errors/not-found-error'


export async function userDelete(request: FastifyRequest, reply: FastifyReply) {
	
	const userDeleteParamSchema = z.object({
		id: z.string()
	})


	const { id } = userDeleteParamSchema.parse(request.params)

	
	const prismaUsersRepository = new PrismaUsersRepository()
	const userDeleteUseCase = new UserDeleteUseCase(prismaUsersRepository)

	try{
		await userDeleteUseCase.execute({
			userId: id,
		})
	}catch(err) {
		if(err instanceof NotFoundError) {
			return reply.status(404).send({message: err.message})
		}

		throw err
	}

	return reply.status(200).send()
}