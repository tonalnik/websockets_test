import type { WSData, WSErrorData, WSErrorParseJSONData } from "@/shared/types";

type GetWsMessageType =
	| { data: WSData; isError: false }
	| {
			data: WSErrorData;
			isError: true;
	  };

const getWsMessage = (message: string): GetWsMessageType => {
	let parsedMessage: WSData;
	try {
		parsedMessage = JSON.parse(message);
	} catch {
		return {
			isError: true,
			data: {
				type: "error",
				data: { message: "parse-json" },
			} as WSErrorParseJSONData,
		};
	}

	if ("type" in parsedMessage && "data" in parsedMessage) {
		return { isError: false, data: parsedMessage };
	}

	return {
		isError: true,
		data: {
			type: "error",
			data: { message: "invalid message type" },
		},
	};
};

export default getWsMessage;
