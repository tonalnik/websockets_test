export interface IUser {
	name: string;
	email: string;
}

export interface IMessage {
	id: string;
	content: string;
	timestamp: number;
	author: IUser;
}

export interface WSBaseData {
	type: string;
	data: unknown;
}

export interface WSErrorData extends WSBaseData {
	type: "error";
}

export interface WSErrorParseJSONData extends WSErrorData {
	type: "error";
	data: { message: "parse-json" };
}

export interface WSMessage extends WSBaseData {
	type: "add-message";
	data: IMessage;
}

export interface WSInitMessages extends WSBaseData {
	type: "init-messages";
	data: IMessage[];
}

export interface WSOnlineUsers extends WSBaseData {
	type: "online-users";
	data: IUser[];
}

export type WSData = WSInitMessages | WSMessage | WSOnlineUsers;

// custom utility types
export type Nullable<T> = {
	[key in keyof T]: T[key] | null;
};
