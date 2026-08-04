import { FastifyInstance } from "fastify";
import { convertGaster } from "../../services/converter/gaster.service";

export default async function (app: FastifyInstance) {
    app.get("/gaster/:text", async (request) => {
        const { text } = request.params as { text: string };

        return convertGaster(text);
    });
}