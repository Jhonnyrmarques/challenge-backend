import { FastifyReply, FastifyRequest } from 'fastify'

import { ShowUserUseCase } from '../../../usecases/users/show-user'
import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'


export async function profile(request: FastifyRequest, reply: FastifyReply) {
	const usersRepository = new PrismaUsersRepository()
	const showUserUseCase = new ShowUserUseCase(usersRepository)

	const { user } = await showUserUseCase.execute({userId: request.user.sub})
  
	return reply.status(200).send({
		user: {
			...user,
			document: undefined
		}
	})
}