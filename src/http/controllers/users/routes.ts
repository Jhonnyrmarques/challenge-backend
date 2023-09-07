import { FastifyInstance } from 'fastify'

import { userRegistration } from './user-registration'
import { userUpdate } from './user-update'
import { showUser } from './show-user'
import { listUsers } from './list-users'
import { userDelete } from './user-delete'

import { authenticate } from './authenticate'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { profile } from './profile'
import { 
	createUserSchema, 
	deleteUsersSchema, 
	getUsersSchema, 
	profileSchema, 
	sessionSchema, 
	showUsersSchema,
	updateUserSchema
} 
	from '../../schemas/users-schema'


export async function usersRoutes(app: FastifyInstance) {
	app.post('/sessions', {schema: sessionSchema}, authenticate)
	

	app.get('/me', {schema: profileSchema, 'onRequest': verifyJWT}, profile)
	app.get('/users', {schema: getUsersSchema, 'onRequest': verifyJWT}, listUsers)
	app.post('/users', {schema: createUserSchema}, userRegistration)
	app.get('/users/:id', {schema: showUsersSchema, 'onRequest': verifyJWT}, showUser)
	app.put('/users/:id', {schema: updateUserSchema, 'onRequest': verifyJWT}, userUpdate)
	app.delete('/users/:id', {schema: deleteUsersSchema, 'onRequest': verifyJWT}, userDelete)

}   