
import styled from "styled-components/native";
import { TextProps, TouchableOpacityProps } from "react-native";
import { FONTS } from "../../theme";
import { AntDesign } from "@expo/vector-icons"

type TitleProps = TextProps & {
	color: string;
}

type ButtonProps =  TouchableOpacityProps & {
	backgroundColor: string;
}

export const ButtonElement = styled.TouchableOpacity<ButtonProps>`

	width: 100%;
	height: 50px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.backgroundColor};
`;

export const Title = styled.Text<TitleProps>`
	color: ${props => props.color};
	font-size: 16px;
	font-family: ${FONTS.BOLD};
`;

export const Icon = styled(AntDesign)`
	margin-right: 12px;
`;
