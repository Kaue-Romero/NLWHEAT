import React from "react";
import { UserImage, LinearContainer } from "./styles";
import DefaultAvatar from "../../assets/avatar.png";
import { Image } from "react-native";
import { COLORS } from "../../theme";

const SIZES = {
	SMALL: {
		containerSize: 32,
		avatarSize: 28,
	},
	NORMAL: {
		containerSize: 48,
		avatarSize: 42,
	},
};

type Props = {
	imageUri: string | undefined;
	size?: "SMALL" | "NORMAL";
};

const avatarDefault = Image.resolveAssetSource(DefaultAvatar).uri;

const UserPhoto = ({ imageUri, size = "NORMAL" }: Props) => {
	const { containerSize, avatarSize } = SIZES[size];

	return (
		<LinearContainer
			colors={[COLORS.PINK, COLORS.YELLOW]}
			containerSize={containerSize}
			start={{x: 0, y: 0.8}}
			end={{x: 0.9, y: 1}}
		>
			<UserImage
				source={{ uri: imageUri || avatarDefault }}
				avatarSize={avatarSize}
			/>
		</LinearContainer>
	);
};

export default UserPhoto;
