import styled from 'styled-components/native';
import { COLORS } from '../../theme';
import { LinearGradient } from "expo-linear-gradient";

type AvatarSizeProps = {
	avatarSize: number,
}

type ContainerSizeProps = {
	containerSize: number,
}

export const UserImage = styled.Image<AvatarSizeProps>`
	width: ${props => props.avatarSize}px;
	height: ${props => props.avatarSize}px;
	border-width: 4px;
	border-color: ${COLORS.BLACK_SECONDARY};
	border-radius: ${props => props.avatarSize / 2}px;
`;

export const LinearContainer = styled(LinearGradient)<ContainerSizeProps>`
	width: ${props => props.containerSize}px;
	height: ${props => props.containerSize}px;
	border-radius: ${props => props.containerSize / 2}px;

	justify-content: center;
	align-items: center;
`;	