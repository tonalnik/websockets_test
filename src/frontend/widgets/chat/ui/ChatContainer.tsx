import { useAppDispatch, useAppSelector } from "@/frontend/app/store/AppStore";
import Message from "@/frontend/entities/message/ui/Message";
import { useCallback, useEffect, useRef } from "react";
import { initMessages } from "../stores/ChatStore";
import "./ChatContainer.css";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
	const messages = useAppSelector((state) => state.chat.messages);
	const dispatch = useAppDispatch();
	const chatMessagesRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = (chatMessageElement: HTMLDivElement) => {
		chatMessageElement.scrollTop = chatMessageElement.scrollHeight;
	};

	useEffect(() => {
		dispatch(initMessages());
	}, []);

	useEffect(() => {
		if (!chatMessagesRef.current || !messages) return;
		scrollToBottom(chatMessagesRef.current);
	}, [messages]);

	const onSend = useCallback(() => {
		if (!chatMessagesRef.current) return;
		scrollToBottom(chatMessagesRef.current);
	}, []);

	const userName = useAppSelector((state) => state.user.name);

	return (
		<div className="chat-container">
			<div className="chat-messages" ref={chatMessagesRef}>
				{!messages && <div>Loading messages...</div>}
				{messages &&
					messages.map((message) => {
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
				<MessageInput onSend={onSend} />
			</div>
		</div>
	);
};

export default ChatContainer;
