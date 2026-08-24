import { FastifyInstance } from "fastify";

import { getRilumeDatabase } from "../../../../db/rilume";

interface UpdateBody {
    recordedAt: string;
    guildCount: number;
    memberCount: number;
}

export default async function (app: FastifyInstance) {
    app.post<{ Body: UpdateBody }>("/", async (request) => {
        const { recordedAt, guildCount, memberCount } = request.body;

        const db = getRilumeDatabase();

        await db.collection("status").updateOne(
            {},
            {
                $set: {
                    recordedAt: new Date(recordedAt),
                    guildCount,
                    memberCount
                }
            },
            {
                upsert: true // 更新。なければ新規作成
            }
        );

        return {
            success: true
        };
    });
}