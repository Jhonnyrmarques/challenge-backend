import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'

import { UserAlreadyExistsError } from '../../usecases/errors/user-already-exists-error'
import { UserRegistrationUseCase } from '../../usecases/users/user-registration'


export async function userRegistration(request: FastifyRequest, reply: FastifyReply) {
	// valida os dados das requisições que estão vindo do body
	const userRegisterBodySchema = z.object({
		first_name: z.string(),
		last_name: z.string(),
		document: z.string(),
		email: z.string().email(),
		phone_number: z.string(),
		birth_date: z.string()
	})

	const {
		first_name, 
		last_name, 
		document, 
		email, 
		phone_number, 
		birth_date
	} = userRegisterBodySchema.parse(request.body)

	const prismaUserRegistrationRepository = new PrismaUsersRepository()
	const userRegistrationUseCase = new UserRegistrationUseCase(prismaUserRegistrationRepository)

	try{
		await userRegistrationUseCase.execute({
			first_name,
			last_name,
			document,
			email,
			phone_number,
			birth_date: new Date(birth_date)
		})
	}catch(err) {
		if(err instanceof UserAlreadyExistsError) {
			return reply.status(409).send({message: err.message})
		}

		throw err
	}

	return reply.status(201).send()
}