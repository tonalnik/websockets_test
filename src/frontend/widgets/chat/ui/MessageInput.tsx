import { useAppDispatch, useAppSelector } from "@/frontend/app/store/AppStore";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { sendMessage } from "../stores/ChatStore";
import "./MessageInput.css";

interface MessageInputProps {
	onSend?: () => void;
}

const MessageInput = (props: MessageInputProps) => {
	const { onSend: onSendParent } = props;

	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [isTextEmpty, setIsTextEmpty] = useState(true);
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);

	const onSend = () => {
		if (!textareaRef.current?.value.trim() || !user.email || !user.name) return;
		const content = textareaRef.current.value.trim();

		textareaRef.current.value = "";
		setIsTextEmpty(true);
		dispatch(
			sendMessage({
				author: { email: user.email, name: user.name },
				content,
				id: uuidv4(),
				timestamp: Date.now(),
			}),
		);
		onSendParent?.();
	};

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				onSend();
			}
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, []);

	return (
		<div className="message-input">
			<div className="message-input-container">
				<textarea
					ref={textareaRef}
					placeholder="Type your message..."
					autoFocus
					onChange={(e) => setIsTextEmpty(e.target.value.trim().length === 0)}
				/>
			</div>
			<div className="message-button-container">
				<button onClick={onSend} disabled={isTextEmpty}>
					Send
				</button>
			</div>
		</div>
	);
};

export default MessageInput;
