import type { WSInitMessages, WSMessage } from "@/shared/types";
import { serve } from "bun";
import index from "../frontend/app/index.html";
import MessageStorage from "./messageStorage/MessageStorage";
import getWsMessage from "./utils/ws/getWsMessage";

const SUBSCRIBE_ID = "chat";

const messageStorage = new MessageStorage();

const server = serve({
	routes: {
		// Serve index.html for all unmatched routes.
		"/": index,

		"/api/hello": {
			async GET(req) {
				return Response.json({
					message: "Hello, world!",
					method: "GET",
				});
			},
			async PUT(req) {
				return Response.json({
					message: "Hello, world!",
					method: "PUT",
				});
			},
		},

		"/api/hello/:name": async (req) => {
			const name = req.params.name;
			return Response.json({
				message: `Hello, ${name}!`,
			});
		},
	},

	development: process.env.NODE_ENV !== "production" && {
		// Enable browser hot reloading in development
		hmr: true,
	},
	fetch: (req, server) => {
		if (req.url === server.url + "ws/chat") {
			if (server.upgrade(req)) {
				return;
			}
		}

		return new Response("Not found", { status: 404 });
	},
	websocket: {
		message: (ws, message) => {
			if (typeof message !== "string") return;

			const { isError, data } = getWsMessage(message);
			if (isError) {
				ws.send(JSON.stringify(data));
				return;
			}

			if (data.type === "init-messages") {
				const messages = messageStorage.getMessages();
				ws.send(
					JSON.stringify({
						type: "init-messages",
						data: messages,
					} as WSInitMessages),
				);
			} else if (data.type === "add-message") {
				messageStorage.addMessage(data.data);
				ws.publish(
					SUBSCRIBE_ID,
					JSON.stringify({
						type: "add-message",
						data: data.data,
					} as WSMessage),
				);
			}
		},
		open: (ws) => {
			ws.subscribe(SUBSCRIBE_ID);
			console.log("[server] WebSocket opened");
		},
		close: (ws) => {
			ws.unsubscribe(SUBSCRIBE_ID);
			console.log("[server] WebSocket closed");
		},
	},
});

console.log(`🚀 Server running at ${server.url}`);
