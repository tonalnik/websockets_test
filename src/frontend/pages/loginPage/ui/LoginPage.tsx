import Login from "@/frontend/widgets/user/ui/Login";
import { type ComponentProps, useCallback } from "react";
import { useAppDispatch } from "../../../app/store/AppStore";
import { logIn } from "../store/UserStore";

const LoginPage = () => {
	const dispatch = useAppDispatch();

	const createUser = useCallback<ComponentProps<typeof Login>["onCreateUser"]>(
		(user) => dispatch(logIn(user)),
		[dispatch],
	);

	return (
		<div className="user-creator">
			<h1>Welcome! Please create a user</h1>
			<Login onCreateUser={createUser} />
		</div>
	);
};

export default LoginPage;
