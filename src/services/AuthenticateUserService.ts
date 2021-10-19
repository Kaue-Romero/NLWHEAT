import axios from "axios";
import prismaClient from "../prisma"
import { sign } from "jsonwebtoken"

interface IAccessTokenResponse {
	access_token: string;

}

interface IUserResponse {
	avatar_url: string;
	login: string;
	id: number;
	name: string;
}

class AuthenticateUserService {
	async execute(code: string) {
		const url = "https://github.com/login/oauth/access_token";

		const { data: AccessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
			params: {
				client_id: process.env.GITHUB_CLIENT_ID,
				client_secret: process.env.GITHUB_CLIENT_SECRET,
				code,
			},

			headers: {
				Accept: "application/json",
			}
		});

		const response = await axios.get<IUserResponse>("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${AccessTokenResponse.access_token}`,
			}
		})

		const { login, id, name, avatar_url } = response.data;

		let user = await prismaClient.user.findFirst({
			where: {
				github_id: id
			}
		})

		if (!user) {
			await prismaClient.user.create({
				data: {
					github_id: id,
					name,
					login,
					avatar_url
				}
			})
		}

		const token = sign({
			user: {
				id: user.id,
				name: user.name,
				login: user.login,
			}
		}, process.env.JWT_SECRET, {
			subject: user.id.toString(),
			expiresIn: '1d'
		})

		return { token, user }
	}
}

export { AuthenticateUserService };
