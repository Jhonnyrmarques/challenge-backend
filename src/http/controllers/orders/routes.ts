import { FastifyInstance } from 'fastify'

import { listOrders } from './list-orders'
import { orderDelete } from './order-delete'
import { orderRegistration } from './order-registration'
import { orderUpdate } from './order-update'
import { showOrder } from './show-order'

import { 
	createOrderSchema, 
	deleteOrderSchema, 
	getOrdersSchema, 
	showOrderSchema, 
	updateOrderSchema 
} 
	from '../../schemas/orders-schema'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function ordersRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)
	
	app.post('/orders', {schema: createOrderSchema}, orderRegistration)
	app.get('/orders', {schema: getOrdersSchema}, listOrders)
	app.put('/orders/:id', {schema: updateOrderSchema}, orderUpdate)
	app.get('/orders/:id', {schema: showOrderSchema}, showOrder)
	app.delete('/orders/:id', {schema: deleteOrderSchema}, orderDelete)

}   