import { ReactNode } from "react"

export type User = {
    id: number;
    name: string;
    login: string;
    github_id: number;
    avatar_url: string;
}

export type Message = {
    id: number;
    text: string;
    user: User;
    created_at: string;
    user_id: string;
}

export type AuthResponse = {
    token: string;
    user: User;
}

export type AuthContextType = {
    children: ReactNode;
    value?: any;
}

export type AuthContextData = {
    user: User | null;
    signInUrl: string;
    signOut: () => void;
}
