import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import * as types from "../types";

export const AuthContext = createContext({} as types.AuthContextData);

export function AuthProvider(props: types.AuthContextType) {
    const [user, setUser] = useState<types.User | null>(null);

    const signInUrl = `https:github.com/login/oauth/authorize?scope=user&client_id=${
        import.meta.env.VITE_GITHUB_CLIENT_ID
    }`;

    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes("?code=");

        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split("?code=");
            window.history.pushState({}, "", urlWithoutCode);
            signIn(githubCode);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("@dowhile:token");

        if (token) {
            api.defaults.headers.common.authorization = `Bearer ${token}`;

            api.get<types.User>("profile").then((res) => {
                setUser(res.data);
            });
        }
    }, []);

    async function signIn(githubCode: string) {
        const response = await api.post<types.AuthResponse>("authenticate", {
            code: githubCode,
        });
        const { token, user } = response.data;

        localStorage.setItem("@dowhile:token", token);
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        setUser(user);
    }

    async function signOut() {
        localStorage.removeItem("@dowhile:token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signInUrl, user, signOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}
