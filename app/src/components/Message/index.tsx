import React from "react";
import { Container, MessageText, Footer, UserName } from "./styles";
import UserPhoto from "../UserPhoto";
import { Message } from "../../../../web/src/types";

type MessageResponse = {
	data: Message;
};

export default function MessageComponent({ data }: MessageResponse) {
	return (
		<Container
			key={data.id}
			from={{ opacity: 0, translateY: -50 }}
			animate={{ opacity: 1, translateY: 0 }}
			transition={{ type: "timing", duration: 700 }}
		>
			<MessageText>{data.text}</MessageText>
			<Footer>
				<UserPhoto size="SMALL" imageUri={data.user.avatar_url} />
				<UserName>{data.user.name}</UserName>
			</Footer>
		</Container>
	);
}
