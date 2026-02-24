import type { IUser, Nullable } from "@/shared/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type UserState = Nullable<IUser>;

const LOCAL_STORAGE_KEY = "user";

const getInitialState = (): UserState => {
	if (typeof window === "undefined") return { name: null, email: null };
	const user = window?.localStorage.getItem(LOCAL_STORAGE_KEY);
	if (!user) return { name: null, email: null };

	let parsedUser: UserState;

	try {
		parsedUser = JSON.parse(user) as UserState;
	} catch {
		return { name: null, email: null };
	}

	if (!parsedUser?.name || !parsedUser?.email) {
		return { name: null, email: null };
	}

	return parsedUser;
};

export const userSlice = createSlice({
	name: "user",
	initialState: getInitialState(),
	reducers: {
		logIn: (state, action: PayloadAction<UserState>) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
			window.localStorage.setItem("user", JSON.stringify(state));
		},
		logOut: (state) => {
			state.name = null;
			state.email = null;
			window.localStorage.removeItem(LOCAL_STORAGE_KEY);
		}
	},
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
