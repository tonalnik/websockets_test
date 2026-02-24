import type { IUser } from "@/shared/types";
import { useState } from "react";

interface LoginProps {
	onCreateUser: (user: IUser) => void;
}

const Login = (props: LoginProps) => {
	const { onCreateUser } = props;

	const [userName, setUserName] = useState<string>("");
	const [userEmail, setUserEmail] = useState<string>("");

	return (
		<div className="user-creator">
			<input
				type="text"
				placeholder="Username"
				onChange={(e) => setUserName(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Email"
				onChange={(e) => setUserEmail(e.target.value)}
			/>
			<button
				disabled={!userName || !userEmail}
				onClick={() => onCreateUser({ name: userName, email: userEmail })}
			>
				Create User
			</button>
		</div>
	);
};

export default Login;
