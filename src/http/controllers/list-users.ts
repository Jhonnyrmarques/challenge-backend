import { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'

import { ListUsersUseCase } from '../../usecases/users/list-users'


export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
	
	const prismaUsersRepository = new PrismaUsersRepository()
	const listAllUsers = new ListUsersUseCase(prismaUsersRepository)


	const users =	await listAllUsers.execute()
	

	return reply.status(200).send(users)
}