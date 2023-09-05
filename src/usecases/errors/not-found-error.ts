export class NotFoundError extends Error {
	constructor() {
		super('resource not found.')
	}
}