import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserRegistrationUseCase } from '../../usecases/user-registration'
import { PrismaUserRegistrationRepository } from '../../repositories/prisma/prisma-user-registration-repository'
import { UserAlreadyExistsError } from '../../usecases/errors/user-already-exists-error'

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

	const prismaUserRegistrationRepository = new PrismaUserRegistrationRepository()
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