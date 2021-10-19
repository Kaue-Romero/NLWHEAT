import { Request, Response } from "express";
import CreateMessageService from "../services/CreateMessageService";

class CreateMessageController {
	async handle(request: Request, response: Response) {
		const { message } = request.body;
		const { user_id } = request;
		const service = new CreateMessageService();
		const messageCreated = await service.execute(message, user_id);

		return response.json(messageCreated);
	}
}

export { CreateMessageController };
