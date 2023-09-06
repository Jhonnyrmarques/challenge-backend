import { compare } from 'bcryptjs'

import { UsersRepository } from '../../repositories/users-repository'
import { InvalidCredentialError } from '../errors/invalid-credential-error'


interface IRequest {
  email: string
  document: string
} 

export class AuthenticateUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({email, document}: IRequest) {
		const user = await this.usersRepository.findByEmail(email)

		if(!user) {
			throw new InvalidCredentialError()
		}

		const doesDocumentMatches = await compare(document, user.document)

		if(!doesDocumentMatches) {
			throw new InvalidCredentialError()
		}

		return {
			user
		}
	}
}