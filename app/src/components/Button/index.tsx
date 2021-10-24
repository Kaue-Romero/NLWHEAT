import React from "react";
import { TouchableOpacityProps, ActivityIndicator } from "react-native";
import { ButtonElement, Title, Icon } from "./styles";
import { AntDesign } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
	title: string;
	color: string;
	backgroundColor: string;
	icon?: React.ComponentProps<typeof AntDesign>["name"];
	isLoading?: boolean;
};

export default function Button({
	title,
	color,
	backgroundColor,
	icon,
	isLoading = false,
	...rest
}: Props) {
	return (
		<ButtonElement
			backgroundColor={backgroundColor}
			{...rest}
			activeOpacity={0.7}
			disabled={isLoading}
		>
			{isLoading ? (
				<ActivityIndicator color={color} />
			) : (
				<>
					<Icon name={icon} size={24} color={color} />
					<Title color={color}>{title}</Title>
				</>
			)}
		</ButtonElement>
	);
}
