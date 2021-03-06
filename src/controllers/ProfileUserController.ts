import { Request, Response } from "express";
import ProfileUserService from "../services/ProfileUserService";

class ProfileUserController {
	async handle(request: Request, response: Response) {
		const { userId } = request.body;

		const service = new ProfileUserService();

		const result = await service.execute(userId);

		return response.json(result);
	}
}

export { ProfileUserController };
