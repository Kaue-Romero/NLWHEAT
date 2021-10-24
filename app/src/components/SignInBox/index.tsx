import React from 'react';
import Button from '../Button';
import { COLORS } from '../../theme';
import { Container } from './styles';
import { useAuth } from "../../hooks/auth"

export default function SignInBox() {
	const { signIn, isSigningIn } = useAuth();

	return <Container>
		<Button title="ENTRAR COM O GITHUB" color={COLORS.BLACK_PRIMARY} backgroundColor={COLORS.YELLOW} icon="github" onPress={signIn} isLoading={isSigningIn}/> 
	</Container>; 
}