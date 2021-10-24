import React from "react";
import { Alert, Keyboard } from "react-native";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import Button from "../Button";
import { Container, TextInput } from "./styles";


export default function SendMessageForm() {
	const [message, setMessage] = React.useState("");
	const [sendingMessage, setSendingMessage] = React.useState(false);

	async function handleSubmit() {
		setSendingMessage(true);
		const messageFormated = message.trim();
		if (messageFormated.length === 0) {
			return Alert.alert(
				"ERRO",
				"Por favor digite uma mensagem para ser enviada"
			);
		}
		try {
			await api.post("/messages", {
				message: messageFormated,
			});
			setMessage("");
			Keyboard.dismiss();
		} catch (erro) {
			Alert.alert("ERRO", "Não foi possível enviar a mensagem");
		} finally {
			setSendingMessage(false);
		}
	}

	return (
		<Container>
			<TextInput
				placeholder="Digite sua mensagem..."
				keyboardAppearance="dark"
				placeholderTextColor={COLORS.GRAY_PRIMARY}
				multiline
				maxLength={140}
				onChangeText={(text) => setMessage(text)}
				value={message}
				editable={!sendingMessage}
				style={{ textAlignVertical: "top" }}
			/>
			<Button
				title="ENVIAR MENSAGEM"
				backgroundColor={COLORS.PINK}
				color={COLORS.WHITE}
				isLoading={sendingMessage}
				onPress={handleSubmit}
			/>
		</Container>
	);
}
