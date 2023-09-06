import { FastifyInstance } from 'fastify'

import { userRegistration } from './user-registration'
import { userUpdate } from './user-update'
import { showUser } from './show-user'
import { listUsers } from './list-users'
import { userDelete } from './user-delete'

import { authenticate } from './authenticate'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { profile } from './profile'

export async function usersRoutes(app: FastifyInstance) {
	app.post('/sessions', authenticate)
	app.get('/me', {onRequest: [verifyJWT]}, profile)

	app.addHook('onRequest', verifyJWT)

	app.get('/users', listUsers)
	app.post('/users', userRegistration)
	app.get('/users/:id', showUser)
	app.put('/users/:id', userUpdate)
	app.delete('/users/:id', userDelete)

}   