export interface IText {
	id: string
	text: string
	longestWords: string[]
	wordCount: number
	characterCount: number
	sentenceCount: number
	paragraphCount: number
}

export interface IUser {
	username: string
	email: string
	firstName: string
	lastName: string
}


export interface IAuthState {
	user?: IUser | undefined;
}
