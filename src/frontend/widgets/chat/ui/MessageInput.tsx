import { useEffect, useRef, useState } from "react";
import "./MessageInput.css";

const MessageInput = () => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [isTextEmpty, setIsTextEmpty] = useState(true);

	const onSend = () => {
		if (!textareaRef.current?.value.trim()) return;

		textareaRef.current.value = "";
		setIsTextEmpty(true);
		
		console.log("Sending message...");
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
