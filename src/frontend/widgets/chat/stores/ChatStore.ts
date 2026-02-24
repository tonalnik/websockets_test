import type { AppDispatch } from "@/frontend/app/store/AppStore";
import type { IMessage, WSInitMessages, WSMessage } from "@/shared/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ChatState {
	messages: IMessage[] | null;
}

const initialState: ChatState = {
	messages: null,
};

let ws: WebSocket;

export const initMessages = createAsyncThunk<
	IMessage[],
	void,
	{ dispatch: AppDispatch }
>("chat/initMessages", async (_, { dispatch }) => {
	return new Promise<IMessage[]>((resolve, reject) => {
		const socket = new WebSocket("ws://localhost:3000/ws/chat");
		ws = socket;

		socket.onopen = () => {
			const data: WSInitMessages = { type: "init-messages", data: [] };
			socket.send(JSON.stringify(data));
		};

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);

			if (data.type === "init-messages") {
				resolve(data.data as IMessage[]);
			} else if (data.type === "add-message") {
				dispatch(chatSlice.actions.addNewMessage(data.data as IMessage));
			}
		};

		socket.onerror = () => reject(new Error("WebSocket error"));
	});
});

export const sendMessage = createAsyncThunk<
	void,
	IMessage,
	{ dispatch: AppDispatch }
>("chat/sendMessage", async (message, { dispatch }) => {
	ws.send(
		JSON.stringify({
			type: "add-message",
			data: message,
		} as WSMessage),
	);
	dispatch(chatSlice.actions.addNewMessage(message));
});

export const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		addNewMessage: (state, action: PayloadAction<IMessage>) => {
			if (!state.messages) return;
			state.messages.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(initMessages.fulfilled, (state, action) => {
			state.messages = action.payload;
		});
	},
});

export default chatSlice.reducer;
