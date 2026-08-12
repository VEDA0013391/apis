import { FastifyInstance } from "fastify";

import status from "./status";
import blacklist from "./blacklist";
import webhook from "./webhook";
import impersonate_log from "./impersonate_log";
import giveaway from "./giveaway";
import settings from "./settings";

export default async function (app: FastifyInstance) {
    app.register(status, {
        prefix: "/status"
    });

    app.register(blacklist, {
        prefix: "/blacklist"
    });

    app.register(webhook, {
        prefix: "/webhook"
    });

    app.register(impersonate_log, {
        prefix: "/impersonateLog"
    });

    app.register(giveaway, {
        prefix: "/giveaway"
    });

    app.register(settings, {
        prefix: "/settings"
    });
}