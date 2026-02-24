import { useAppDispatch, useAppSelector } from "@/frontend/app/store/AppStore";
import { logOut } from "@/frontend/pages/loginPage/store/UserStore";

const Logout = () => {
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const onLogout = () => dispatch(logOut());

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<label>Name: {user.name}</label>
			<label>Email: {user.email}</label>
			<button style={{ width: "fit-content" }} onClick={onLogout}>
				Logout
			</button>
		</div>
	);
};

export default Logout;
