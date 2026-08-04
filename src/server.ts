import { buildApp } from "./app";
import { initJapaneseConverter } from "./services/converter/japanese.service";

const start = async () => {

    await initJapaneseConverter();

    const app = await buildApp();

    await app.listen({
        port: 3000,
        host: "0.0.0.0"
    });
};

start();