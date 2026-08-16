import { FastifyReply, FastifyRequest } from "fastify";
import crypto from "node:crypto";

export async function verifyPassword(password: string): Promise<boolean> {
    const envPassword = process.env.PASS;

    if (!envPassword) {
        throw new Error("PASS is not defined");
    }

    const [saltHex, hashHex] = envPassword.split(":");

    if (!saltHex || !hashHex) {
        throw new Error("Invalid PASS format");
    }

    const salt = Buffer.from(saltHex, "hex");
    const storedHash = Buffer.from(hashHex, "hex");

    const hash = await new Promise<Buffer>((resolve, reject) => {
        crypto.scrypt(
            password,
            salt,
            storedHash.length,
            (error, derivedKey) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(derivedKey);
            }
        );
    });

    return (
        hash.length === storedHash.length &&
        crypto.timingSafeEqual(hash, storedHash)
    );
}

export async function authenticateRequest(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<boolean> {
    const authorization = request.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
        await reply.code(401).send({
            success: false,
            message: "Authorization is required"
        });

        return false;
    }

    const password = authorization.slice(7);

    if (!(await verifyPassword(password))) {
        await reply.code(401).send({
            success: false,
            message: "Invalid authorization"
        });

        return false;
    }

    return true;
}