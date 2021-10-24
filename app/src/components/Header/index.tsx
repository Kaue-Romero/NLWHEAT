import React from "react";
import { Container, LogoutText, LogoutButton, ButtonContainer } from "./styles";
import LogoSvg from "../../assets/logo.svg";
import UserPhoto from "../UserPhoto";
import { useAuth } from "../../hooks/auth";
import Avatar from "../../assets/avatar.png";
import { Image } from "react-native";

export default function Header() {
	
	const { user, signOut } = useAuth();
	const avatarUri = Image.resolveAssetSource(Avatar).uri;

	return (
		<Container>
			<LogoSvg />

			<ButtonContainer>
				<LogoutButton onPress={signOut}>
					<LogoutText>Sair</LogoutText>
				</LogoutButton>
				<UserPhoto imageUri={user?.avatar_url || avatarUri} />
			</ButtonContainer>
		</Container>
	);
}
