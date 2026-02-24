import userReducer from "@/frontend/pages/loginPage/store/UserStore";
import chatReducer from "@/frontend/widgets/chat/stores/ChatStore";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
	reducer: {
		user: userReducer,
		chat: chatReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
