import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { UserProfileUseCase } from '../../usecases/users/user-profile'

import { NotFoundError } from '../../usecases/errors/not-found-error'


export async function userProfile(request: FastifyRequest, reply: FastifyReply) {
	const userProfileSchema = z.object({
		id: z.string()
	})

	const { id } = userProfileSchema.parse(request.params)

	const usersRepository = new PrismaUsersRepository()
	const userProfileUseCase = new UserProfileUseCase(usersRepository)

	try{
		const { user } = await userProfileUseCase.execute({userId: id})

		return reply.status(200).send(user)

	}catch(err) {
		if(err instanceof NotFoundError) {
			return reply.status(404).send({message: err.message})
		}

		throw err
	}

	
}