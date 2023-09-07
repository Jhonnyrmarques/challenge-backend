export const sessionSchema = {
	tags: ['users'],
	description: 'Login route',
	body: {
		type: 'object',
		required: ['email', 'document'],
		properties: {
			email: {type: 'string'},
			document: {type: 'string'}
		}
	},
}

export const profileSchema = {
	description: 'Profile Route',
	tags: ['users'],
	security: [ { bearerAuth: [] } ],
}

export const getUsersSchema = {
	description: 'List All Users Route',
	tags: ['users'],
	security: [ { bearerAuth: [] } ],
}

export const createUserSchema = {
	tags: ['users'],
	description: 'Create User route',
	body: {
		type: 'object',
		properties: {
			first_name: {type: 'string'},
			last_name: {type: 'string'},
			email: {type: 'string'},
			document: {type: 'string'},
			phone_number: {type: 'string'},
			birth_date: {type: 'string'}
		}
	},
}

export const showUsersSchema = {
	description: 'List User Route',
	tags: ['users'],
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'user id'
			}
		}
	},
	security: [ { bearerAuth: [] } ],
}

export const updateUserSchema = {
	tags: ['users'],
	description: 'Update User route',
	body: {
		type: 'object',
		properties: {
			first_name: {type: 'string'},
			last_name: {type: 'string'},
			phone_number: {type: 'string'},
			birth_date: {type: 'string'}
		}
	},
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'user id'
			}
		}
	},
	security: [ { bearerAuth: [] } ],
}

export const deleteUsersSchema = {
	description: 'Delete User Route',
	tags: ['users'],
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'user id'
			}
		}
	},
	security: [ { bearerAuth: [] } ],
}