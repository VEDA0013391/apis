import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance) {
    app.get("/", async () => {
        return {
            success: true
        };
    });
}