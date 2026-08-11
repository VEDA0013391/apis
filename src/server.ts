import dns from "dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);

import "dotenv/config";
import { buildApp } from "./app";
import { initJapaneseConverter } from "./services/converter/japanese.service";
import { initStatusDatabase } from "./db/status";

const start = async () => {
    await initJapaneseConverter();
    await initStatusDatabase(); // 起動時に1回接続

    const app = await buildApp();

    await app.listen({
        port: 3000,
        host: "0.0.0.0"
    });
};

start();