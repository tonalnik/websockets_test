import type { IMessage } from "@/shared/types";

const DEFAULT_MAX_SIZE = 100;

export default class MessageStorage {
	private _messages: IMessage[];
	private _head: number = 0;
	private _count: number = 0;
	private _maxSize: number;

	constructor(maxSize: number = DEFAULT_MAX_SIZE) {
		this._maxSize = maxSize;
		this._messages = new Array(maxSize);
	}

	addMessage(message: IMessage): void {
		this._messages[this._head] = message;
		this._head = (this._head + 1) % this._maxSize;
		if (this._count < this._maxSize) {
			this._count++;
		}
	}

	getMessages(): IMessage[] {
		if (this._count < this._maxSize) {
			return this._messages.slice(0, this._count);
		}

		const tail = this._head;
		return this._messages.slice(tail).concat(this._messages.slice(0, tail));
	}
}
