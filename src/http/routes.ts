import { FastifyInstance } from 'fastify'
import { userRegistration } from './controllers/user-registration'
import { userProfile } from './controllers/user-profile'
import { userUpdate } from './controllers/user-update'
import { userDelete } from './controllers/user-delete'

export async function appRoutes(app: FastifyInstance) {
	app.post('/users', userRegistration)
	app.get('/users/:id', userProfile)
	app.put('/users/:id', userUpdate)
	app.delete('/users/:id', userDelete)
}   