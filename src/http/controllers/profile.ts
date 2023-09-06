import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { UserProfileUseCase } from '../../usecases/users/user-profile'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
	const usersRepository = new PrismaUsersRepository()
	const userProfile = new UserProfileUseCase(usersRepository)

	const { user } = await userProfile.execute({userId: request.user.sub})
  
	return reply.status(200).send({
		user: {
			...user,
			document: undefined
		}
	})
}