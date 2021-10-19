import dotenv from "dotenv";
import { serverHttp } from "./app";

dotenv.config();
const port = process.env.PORT || 3000;

serverHttp.listen(port, () => {
	console.log(`Server started on port ${port}`);
})
