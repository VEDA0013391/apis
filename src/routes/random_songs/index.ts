import { FastifyInstance } from "fastify";

import taiko_no_tatsujin from "./taiko_no_tatsujin";
import project_sekai from "./project_sekai";

export default async function (app: FastifyInstance) {

    
    app.register(taiko_no_tatsujin, {
        prefix: "/taiko_no_tatsujin"
    });

    app.register(project_sekai, {
        prefix: "/project_sekai"
    });
}