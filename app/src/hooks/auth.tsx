import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../../../web/src/types";
import * as AuthSessions from "expo-auth-session";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
	user: User | null;
	isSigningIn: boolean;
	signIn(): Promise<void>;
	signOut(): Promise<void>;
};

type AuthProviderProps = {
	children: React.ReactNode;
};

type AuthResponse = {
	token: string;
	user: User;
};

type AuthorizationResponse = {
	params: {
		code?: string;
		error?: string;
	};
	type?: string;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
	const [isSigningIn, setIsSigningIn] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	const signIn = async () => {
		try {
			setIsSigningIn(true);
			const authUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=${process.env.SCOPE}`;
			const authSessionResponse = (await AuthSessions.startAsync({
				authUrl,
			})) as AuthorizationResponse;
			if (
				authSessionResponse.type === "success" &&
				authSessionResponse.params.error !== "access_denied"
			) {
				const authResponse = await api.post<AuthResponse>(
					"/authenticate",
					{
						code: authSessionResponse.params.code,
					}
				);
				api.defaults.headers.common[
					"Authorization"
				] = `Bearer ${authResponse.data.token}`;

				await AsyncStorage.setItem(
					"@nlwheat:user",
					JSON.stringify(authResponse.data.user)
				);
				await AsyncStorage.setItem(
					"@nlwheat:token",
					authResponse.data.token
				);
				setUser(authResponse.data.user);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsSigningIn(false);
		}
	};

	const signOut = async () => {
		setUser(null);
		await AsyncStorage.removeItem("@nlwheat:user");
		await AsyncStorage.removeItem("@nlwheat:token");
	};

	useEffect(() => {
		(async () => {
			const userStorage = await AsyncStorage.getItem("@nlwheat:user");
			const tokenStorage = await AsyncStorage.getItem("@nlwheat:token");

			if (userStorage && tokenStorage) {
				api.defaults.headers.common[
					"Authorization"
				] = `Bearer ${tokenStorage}`;
				setUser(JSON.parse(userStorage));
			}
		})();
		setIsSigningIn(false);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signOut,
				user,
				isSigningIn,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth(): AuthContextData {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}

export { AuthProvider, useAuth };
