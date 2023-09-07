import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import { usersRoutes } from './http/controllers/users/routes'
import { ordersRoutes } from './http/controllers/orders/routes'

import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'


export const app = fastify()

//Open API Config
app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'API REST FullStack Challenge TechSocial',
			description: 'CRUDs using Swagger, Fastify and Prisma',
			version: '0.1.9'
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer'
				}
			}
		}
	}
})

app.register(fastifySwaggerUi, {
	routePrefix: '/doc'
})

app.register(fastifyJwt, {
	secret: env.JWT_SECRET
})

app.register(usersRoutes)
app.register(ordersRoutes)

app.setErrorHandler((error, _, reply) => {
	if(error instanceof ZodError) {
		return reply
			.status(400)
			.send({message: 'Validation error.', issues: error.format()})
	}

	if(env.NODE_ENV != 'prod') {
		console.error(error)
	}

	reply.status(500).send({message: 'Internal server error.'})
})
 