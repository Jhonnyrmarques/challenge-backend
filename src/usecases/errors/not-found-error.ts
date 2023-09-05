export class NotFoundError extends Error {
	constructor(name: string) {
		super(`${name} not found`)
	}
}