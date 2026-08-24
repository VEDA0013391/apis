import { FastifyInstance } from "fastify";

import {
    getRandomTaikoSongs,
    type TaikoDifficulty,
    type TaikoGenre
} from "../../../db/random_songs/taiko";
import addRoute from "./add";
import deleteRoute from "./delete";
import updateRoute from "./update";

interface RandomSongsQuery {
    diff?: string;
    star?: string;
    number_of_songs?: string;
    genre?: string;
}

// 難易度の一覧
const difficulties: TaikoDifficulty[] = [
    "easy",
    "normal",
    "hard",
    "oni",
    "edit",
    "oni-edit"
];

// ジャンルの一覧
const genres: TaikoGenre[] = [
    "pops",
    "anime",
    "kids",
    "vocaloid",
    "variety",
    "gamemusic",
    "classic",
    "namco"
];

export default async function (app: FastifyInstance) {
    app.get<{ Querystring: RandomSongsQuery }>(
        "/",
        async (request, reply) => {
            // クエリパラメータの取得。デフォ値あり
            const {
                diff = "oni-edit",
                star = "10",
                number_of_songs = "3",
                genre
            } = request.query;

            // 難易度のバリデーション
            if (!difficulties.includes(diff as TaikoDifficulty)) {
                return reply.status(400).send({
                    success: false,
                    error: "Invalid difficulty."
                });
            }

            // 星の数のバリデーション。1以上
            const starNumber = Number(star);

            if (!Number.isInteger(starNumber) || starNumber < 1) {
                return reply.status(400).send({
                    success: false,
                    error: "Invalid star."
                });
            }

            // 曲数のバリデーション。1~10の範囲
            const numberOfSongs = Number(number_of_songs);

            if (
                !Number.isInteger(numberOfSongs) ||
                numberOfSongs < 1 ||
                numberOfSongs > 10
            ) {
                return reply.status(400).send({
                    success: false,
                    error: "number_of_songs must be between 1 and 10."
                });
            }

            // ジャンルのバリデーション
            if (
                genre !== undefined &&
                !genres.includes(genre as TaikoGenre)
            ) {
                return reply.status(400).send({
                    success: false,
                    error: "Invalid genre."
                });
            }

            // 条件に合う楽曲をDBからランダムに取得
            const songs = await getRandomTaikoSongs(
                diff as TaikoDifficulty,
                starNumber,
                numberOfSongs,
                genre as TaikoGenre | undefined
            );

            return {
                success: true,
                data: songs
            };
        }
    );

    app.register(addRoute, {
        prefix: "/add"
    });

    app.register(deleteRoute, {
        prefix: "/delete"
    });

    app.register(updateRoute, {
        prefix: "/update"
    });
}