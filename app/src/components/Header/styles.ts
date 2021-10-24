import styled from 'styled-components/native';
import { COLORS, FONTS } from '../../theme';

export const Container = styled.View`
	width: 100%;
	flex-direction: row;

	justify-content: space-between;
	align-items: center;

	padding: 0 20px;
`;

export const ButtonContainer = styled.View`
	flex-direction: row;
	align-items: center;

	margin-left: 10px;
`;

export const LogoutButton = styled.TouchableOpacity`
	
`;

export const LogoutText = styled.Text`
	font-size: 16px;
	font-family: ${FONTS.REGULAR};
	color: ${COLORS.WHITE};

	margin-right: 10px;
`;