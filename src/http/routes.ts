import { FastifyInstance } from 'fastify'

import { userRegistration } from './controllers/user-registration'
import { userProfile } from './controllers/user-profile'
import { listUsers } from './controllers/list-users'
import { userUpdate } from './controllers/user-update'
import { userDelete } from './controllers/user-delete'

import { orderRegistration } from './controllers/order-registration'
import { orderUpdate } from './controllers/order-update'


export async function appRoutes(app: FastifyInstance) {
	app.get('/users', listUsers)
	app.post('/users', userRegistration)
	app.get('/users/:id', userProfile)
	app.put('/users/:id', userUpdate)
	app.delete('/users/:id', userDelete)

	app.post('/orders', orderRegistration)
	app.put('/orders/:id', orderUpdate)
}   