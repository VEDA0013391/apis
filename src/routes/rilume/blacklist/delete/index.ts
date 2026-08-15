import { FastifyInstance } from "fastify";
import crypto from "node:crypto";

import { getRilumeDatabase } from "../../../../db/rilume";

interface DeleteParams {
    userId: string;
}

export default async function (app: FastifyInstance) {
    app.delete<{ Params: DeleteParams }>("/:userId", async (request, reply) => {
        const authorization = request.headers.authorization;
        const envPassword = process.env.PASSWORD;

        if (!envPassword) {
            throw new Error("PASS is not defined");
        }

        if (!authorization?.startsWith("Bearer ")) {
            return reply.code(401).send({
                success: false,
                message: "Authorization is required"
            });
        }

        const password = authorization.slice(7);

        const [saltHex, hashHex] = envPassword.split(":");

        if (!saltHex || !hashHex) {
            throw new Error("Invalid PASS format");
        }

        const salt = Buffer.from(saltHex, "hex");
        const storedHash = Buffer.from(hashHex, "hex");

        const hash = await new Promise<Buffer>((resolve, reject) => {
            crypto.scrypt(password, salt, storedHash.length, (error, derivedKey) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(derivedKey);
            });
        });

        if (
            hash.length !== storedHash.length ||
            !crypto.timingSafeEqual(hash, storedHash)
        ) {
            return reply.code(401).send({
                success: false,
                message: "Invalid authorization"
            });
        }

        const db = getRilumeDatabase();

        const result = await db
            .collection("blacklistusers")
            .deleteOne({
                userId: request.params.userId
            });

        return {
            success: true,
            data: {
                deleted: result.deletedCount > 0
            }
        };
    });
}