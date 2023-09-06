import { FastifyInstance } from 'fastify'

import { userRegistration } from './controllers/user-registration'
import { userProfile } from './controllers/user-profile'
import { listUsers } from './controllers/list-users'
import { userUpdate } from './controllers/user-update'
import { userDelete } from './controllers/user-delete'

import { orderRegistration } from './controllers/order-registration'
import { orderUpdate } from './controllers/order-update'
import { listOrders } from './controllers/list-orders'
import { orderProfile } from './controllers/order-profile'
import { orderDelete } from './controllers/order-delete'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'



export async function appRoutes(app: FastifyInstance) {
	app.get('/users', listUsers)
	app.post('/users', userRegistration)
	app.get('/users/:id', userProfile)
	app.put('/users/:id', userUpdate)
	app.delete('/users/:id', userDelete)

	app.post('/orders', orderRegistration)
	app.get('/orders', listOrders)
	app.put('/orders/:id', orderUpdate)
	app.get('/orders/:id', orderProfile)
	app.delete('/orders/:id', orderDelete)

	app.post('/sessions', authenticate)
	app.get('/me', {onRequest: [verifyJWT]}, profile)
}   