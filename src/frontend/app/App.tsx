import ChatPage from "../pages/loginPage/ui/ChatPage";
import CreateUser from "../pages/loginPage/ui/LoginPage";
import ChatContainer from "../widgets/chat/ui/ChatContainer";
import "./index.css";
import { useAppSelector } from "./store/AppStore";

export function App() {
	const user = useAppSelector((state) => state.user);
	const isUserCreated = !!user.email && !!user.name;

	return (
		<div id="app">
			{isUserCreated && <ChatPage />}
			{!isUserCreated && <CreateUser />}
		</div>
	);
}

export default App;
