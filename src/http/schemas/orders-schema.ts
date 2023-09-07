export const getOrdersSchema = {
	description: 'List All Orders Route',
	tags: ['orders'],
	security: [ { bearerAuth: [] } ],
}

export const createOrderSchema = {
	tags: ['orders'],
	description: 'Create Order route',
	body: {
		type: 'object',
		properties: {
			description: {type: 'string'},
			quantity: {type: 'number'},
			price: {type: 'number'},
			user_id: {type: 'string'},
		}
	},
	security: [ { bearerAuth: [] } ],
}

export const showOrderSchema = {
	description: 'Show Order Route',
	tags: ['orders'],
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'order id'
			}
		}
	},
	security: [ { bearerAuth: [] } ],
}

export const updateOrderSchema = {
	tags: ['orders'],
	description: 'Update Order route',
	body: {
		type: 'object',
		properties: {
			description: {type: 'string'},
			quantity: {type: 'number'},
			price: {type: 'number'},
		}
	},
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'order id'
			}
		}
	},
	security: [ { bearerAuth: [] } ],
}

export const deleteOrderSchema = {
	description: 'Delete Order Route',
	tags: ['orders'],
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'order id'
			}
		}
	},
	security: [ { bearerAuth: [] } ],
}