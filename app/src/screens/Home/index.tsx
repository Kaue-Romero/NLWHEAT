import React from "react";
import Header from "../../components/Header";
import { Container } from "./styles";
import MessageList from "../../components/MessageList";
import SignInBox from "../../components/SignInBox";
import { useAuth } from "../../hooks/auth";
import SendMessageForm from "../../components/SendMessageForm";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function HomeScreen() {
	const { user } = useAuth();

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<Container>
				<Header />
				<MessageList />
				{user ? <SendMessageForm /> : <SignInBox />}
			</Container>
		</KeyboardAvoidingView>
	);
}
