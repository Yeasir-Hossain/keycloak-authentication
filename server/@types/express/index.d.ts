import { IUser } from './../../src/config/interfaces';

declare namespace Express {
	interface Request {
		user?: IUser;
	}
}