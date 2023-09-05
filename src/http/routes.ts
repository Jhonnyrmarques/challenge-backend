import { FastifyInstance } from 'fastify'
import { userRegistration } from './controllers/user-registration'

export async function appRoutes(app: FastifyInstance) {
	app.post('/users', userRegistration)
}   