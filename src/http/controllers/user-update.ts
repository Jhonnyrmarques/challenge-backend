import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'

import { UserUpdateUseCase } from '../../usecases/users/user-update'

import { NotFoundError } from '../../usecases/errors/not-found-error'


export async function userUpdate(request: FastifyRequest, reply: FastifyReply) {
	
	const userUpdateBodySchema = z.object({
		first_name: z.string().optional(),
		last_name: z.string().optional(),
		phone_number: z.string().optional(),
		birth_date: z.string().optional()
	})

	const userIdSchema = z.object({
		id: z.string()
	})

	const {
		first_name, 
		last_name, 
		phone_number, 
		birth_date
	} = userUpdateBodySchema.parse(request.body)

	const { id } = userIdSchema.parse(request.params)
	
	const prismaUsersRepository = new PrismaUsersRepository()
	const userUpdateUseCase = new UserUpdateUseCase(prismaUsersRepository)

	try{
		await userUpdateUseCase.execute({
			userId: id,
			first_name,
			last_name,
			phone_number,
			birth_date: birth_date ? new Date(birth_date) : undefined
		})
	}catch(err) {
		if(err instanceof NotFoundError) {
			return reply.status(404).send({message: err.message})
		}

		throw err
	}

	return reply.status(200).send()
}