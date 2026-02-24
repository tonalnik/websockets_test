import { useAppSelector } from "@/frontend/app/store/AppStore";
import Message from "@/frontend/entities/message/ui/Message";
import { useLayoutEffect, useRef } from "react";
import "./ChatContainer.css";
import MessageInput from "./MessageInput";
import messages from "./messages";

const ChatContainer = () => {
	// const messages = useAppSelector((state) => state.chat.messages);
	const chatMessagesRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!chatMessagesRef.current) return;
		chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
	}, []);

	const userName = useAppSelector((state) => state.user.name);

	return (
		<div className="chat-container">
			<div className="chat-messages" ref={chatMessagesRef}>
				{messages.map((message) => {
					const isMine = message.author.name === userName;
					return (
						<div
							key={message.id}
							className={"chat-message-container" + (isMine ? " my" : "")}
						>
							<Message message={message} isMine={isMine} />
						</div>
					);
				})}
			</div>
			<div className="chat-input">
				<MessageInput />
			</div>
		</div>
	);
};

export default ChatContainer;
