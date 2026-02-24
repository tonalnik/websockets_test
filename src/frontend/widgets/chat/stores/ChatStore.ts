import type { IMessage } from "@/shared/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface ChatState {
	messages: IMessage[];
}

const initialState: ChatState = {
	messages: [],
};

export const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		updateChat: (state, action: PayloadAction<ChatState>) => {
			state.messages = action.payload.messages;
		},
	},
});

export const { updateChat } = chatSlice.actions;

export default chatSlice.reducer;
