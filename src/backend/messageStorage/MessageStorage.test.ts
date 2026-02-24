import type { IMessage } from "@/shared/types";
import { beforeEach, describe, expect, it } from "bun:test";
import MessageStorage from "./MessageStorage";

const makeMessage = (id: number): IMessage => ({
	id: "" + id,
	content: `Message ${id}`,
	timestamp: 1000 + id,
	author: { name: "Test User", email: "test@test.com" },
});

describe("MessageStorage", () => {
	let storage: MessageStorage;

	beforeEach(() => {
		storage = new MessageStorage(10);
	});

	describe("initial state", () => {
		it("should return empty array when no messages added", () => {
			expect(storage.getMessages()).toEqual([]);
		});
	});

	describe("addMessage / getMessages", () => {
		it("should store a single message", () => {
			storage.addMessage(makeMessage(1));
			const messages = storage.getMessages();
			expect(messages).toHaveLength(1);
			expect(messages[0]!.id).toBe("1");
		});

		it("should store multiple messages in insertion order", () => {
			for (let i = 1; i <= 5; i++) {
				storage.addMessage(makeMessage(i));
			}
			const messages = storage.getMessages();
			expect(messages).toHaveLength(5);
			expect(messages.map((m) => m.id)).toEqual(["1", "2", "3", "4", "5"]);
		});

		it("should store exactly maxSize messages without overflow", () => {
			for (let i = 1; i <= 10; i++) {
				storage.addMessage(makeMessage(i));
			}
			const messages = storage.getMessages();
			expect(messages).toHaveLength(10);
			expect(messages.map((m) => m.id)).toEqual([
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
			]);
		});
	});

	describe("circular buffer behaviour", () => {
		it("should not exceed maxSize when more messages are added", () => {
			for (let i = 1; i <= 15; i++) {
				storage.addMessage(makeMessage(i));
			}
			expect(storage.getMessages()).toHaveLength(10);
		});

		it("should overwrite oldest messages when buffer is full", () => {
			for (let i = 1; i <= 12; i++) {
				storage.addMessage(makeMessage(i));
			}
			const messages = storage.getMessages();
			// oldest 2 messages (id 1, 2) should be overwritten
			expect(messages.map((m) => m.id)).toEqual([
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12",
			]);
		});

		it("should return messages in chronological order after wrap-around", () => {
			for (let i = 1; i <= 15; i++) {
				storage.addMessage(makeMessage(i));
			}
			const messages = storage.getMessages();
			const ids = messages.map((m) => m.id);
			// should be sorted ascending (oldest → newest)
			expect(ids).toEqual([...ids].sort((a, b) => Number(a) - Number(b)));
		});

		it("should correctly handle wrap-around at exact multiple of maxSize", () => {
			for (let i = 1; i <= 20; i++) {
				storage.addMessage(makeMessage(i));
			}
			const messages = storage.getMessages();
			expect(messages).toHaveLength(10);
			expect(messages.map((m) => m.id)).toEqual([
				"11",
				"12",
				"13",
				"14",
				"15",
				"16",
				"17",
				"18",
				"19",
				"20",
			]);
		});

		it("should correctly handle multiple full wrap-arounds", () => {
			for (let i = 1; i <= 35; i++) {
				storage.addMessage(makeMessage(i));
			}
			const messages = storage.getMessages();
			expect(messages).toHaveLength(10);
			expect(messages.map((m) => m.id)).toEqual([
				"26",
				"27",
				"28",
				"29",
				"30",
				"31",
				"32",
				"33",
				"34",
				"35",
			]);
		});

		it("head should point to the oldest message when buffer is full", () => {
			for (let i = 1; i <= 13; i++) {
				storage.addMessage(makeMessage(i));
			}
			const messages = storage.getMessages();
			// oldest surviving message is id 4 (13 - 10 + 1)
			expect(messages[0]!.id).toBe("4");
		});

		it("last message returned should always be the most recently added", () => {
			for (let i = 1; i <= 25; i++) {
				storage.addMessage(makeMessage(i));
			}
			const messages = storage.getMessages();
			expect(messages[messages.length - 1]!.id).toBe("25");
		});
	});

	describe("default maxSize", () => {
		it("should default to 100 when no maxSize is provided", () => {
			const defaultStorage = new MessageStorage();
			for (let i = 1; i <= 105; i++) {
				defaultStorage.addMessage(makeMessage(i));
			}
			expect(defaultStorage.getMessages()).toHaveLength(100);
			const messages = defaultStorage.getMessages();
			expect(messages[0]!.id).toBe("6");
			expect(messages[99]!.id).toBe("105");
		});
	});
});
