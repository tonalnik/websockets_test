import ChatContainer from "@/frontend/widgets/chat/ui/ChatContainer";
import Logout from "@/frontend/widgets/user/ui/Logout";
import "./ChatPage.css";

const ChatPage = () => {
	return (
		<div className="chat-page">
			<div className="chat-page-header">
				<Logout />
			</div>
			<div className="chat-page-content">
				<ChatContainer />
			</div>
		</div>
	);
};

export default ChatPage;
