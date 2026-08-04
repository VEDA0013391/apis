import { FastifyInstance } from "fastify";

import rune from "./rune";
import gaster from "./gaster";

export default async function (app: FastifyInstance) {
    app.register(rune);
    app.register(gaster);
}