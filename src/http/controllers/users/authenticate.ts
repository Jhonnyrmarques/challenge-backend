import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../../../usecases/authenticate'

import { InvalidCredentialError } from '../../../usecases/errors/invalid-credential-error'


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

	const authenticateBodySchema = z.object({
		email: z.string().email(),
		document: z.string()
	})

	const {email, document} = authenticateBodySchema.parse(request.body)

	try {
		const usersRepository = new PrismaUsersRepository()
		const authenticateUseCase = new AuthenticateUseCase(usersRepository)

		const { user } =	await authenticateUseCase.execute({
			email,
			document
		})

		const token = await reply.jwtSign({}, {
			sign: {
				sub: user.id
			}
		})

		return reply.status(200).send({
			token
		})
    
	}catch(err) {
		if(err instanceof InvalidCredentialError) {
			return reply.status(400).send({message: err.message})
		}

		throw err
	}


}