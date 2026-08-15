import dns from "dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);

import "dotenv/config";
import { buildApp } from "./app";
import { initJapaneseConverter } from "./services/converter/japanese.service";
import { initRilumeDatabase } from "./db/rilume";
const port = Number(process.env.PORT) || 3000;

const start = async () => {
    await initJapaneseConverter();
    await initRilumeDatabase(); // 起動時に1回接続

    const app = await buildApp();

    await app.listen({
        port,
        host: "0.0.0.0"
    });
};

start();