export interface IUser {
	name: string;
	email: string;
}

export interface IMessage {
	id: number;
	content: string;
	timestamp: number;
	author: IUser;
}

// custom utility types
export type Nullable<T> = {
	[key in keyof T]: T[key] | null;
};
