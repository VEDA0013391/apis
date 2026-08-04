import { FastifyInstance } from "fastify";
import { convertRune } from "../../services/converter/rune.service";

export default async function (app: FastifyInstance) {
    app.get("/rune/:text", async (request) => {
        const { text } = request.params as { text: string };

        return convertRune(text);
    });
}