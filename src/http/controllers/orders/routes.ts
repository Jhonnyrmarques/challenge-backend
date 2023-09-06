import { FastifyInstance } from 'fastify'

import { listOrders } from './list-orders'
import { orderDelete } from './order-delete'
import { orderRegistration } from './order-registration'
import { orderUpdate } from './order-update'
import { showOrder } from './show-order'

export async function ordersRoutes(app: FastifyInstance) {
	app.post('/orders', orderRegistration)
	app.get('/orders', listOrders)
	app.put('/orders/:id', orderUpdate)
	app.get('/orders/:id', showOrder)
	app.delete('/orders/:id', orderDelete)

}   