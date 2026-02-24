import type { IMessage } from "@/shared/types";
import { useMemo } from "react";
import "./Message.css";

interface MessageProps {
	message: IMessage;
	isMine: boolean;
}
const Message = (props: MessageProps) => {
	const { message, isMine } = props;
	const { content, author, timestamp } = message;

	const getTime = useMemo(() => {
		const date = new Date(timestamp);
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const seconds = date.getSeconds().toString().padStart(2, "0");
		return `${hours}:${minutes}:${seconds}`;
	}, [timestamp]);

	return (
		<div className={isMine ? "message my" : "message"}>
			<div className="message-header">
				<span className="message-author">{author.name}</span>
				<span className="message-time">{getTime}</span>
			</div>
			<div className="message-content">{content}</div>
		</div>
	);
};

export default Message;
