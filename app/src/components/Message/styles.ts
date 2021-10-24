import styled from 'styled-components/native';
import { COLORS, FONTS } from '../../theme';
import { MotiView } from "moti";

export const Container = styled(MotiView)`
	width: 100%;
	padding: 16px;
`;


export const MessageText = styled.Text`
	font-size: 16px;
	font-family: ${FONTS.REGULAR};
	color: ${COLORS.WHITE};
	line-height: 20px;
	margin-bottom: 12px;
`;

export const Footer = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
`;

export const UserName = styled.Text`
	font-size: 16px;
	font-family: ${FONTS.REGULAR};
	color: ${COLORS.WHITE};
	margin-left: 16px;
`;

