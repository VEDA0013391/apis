import { getRandomSongsDatabase } from ".";

// 難易度
export type TaikoDifficulty =
    | "easy"
    | "normal"
    | "hard"
    | "oni"
    | "edit"
    | "oni-edit";

// ジャンル
export type TaikoGenre =
    | "pops"
    | "anime"
    | "kids"
    | "vocaloid"
    | "variety"
    | "gamemusic"
    | "classic"
    | "namco";

// 太鼓の達人 楽曲データのインターフェース
export interface TaikoSong {
    title: string;
    genre: TaikoGenre;
    difficulties: {
        easy?: number;
        normal?: number;
        hard?: number;
        oni?: number;
        edit?: number;
    };
    __v?: number;
}

export async function getRandomTaikoSongs(
    diff: TaikoDifficulty,
    star: number,
    numberOfSongs: number,
    genre?: TaikoGenre
): Promise<TaikoSong[]> {
    const db = getRandomSongsDatabase();

    // ジャンル指定の有無に応じたフィルタ条件の設定
    const genreMatch = genre
        ? { genre }
        : {};

    //【oni-editの場合の処理
    if (diff === "oni-edit") {
        // 全体の20%を裏に割り当て
        const editCount = Math.ceil(numberOfSongs * 0.2);
        const oniCount = numberOfSongs - editCount;

        // 裏とおにを並列でランダム取得
        const [editSongs, oniSongs] = await Promise.all([
            db
                .collection<TaikoSong>("taikosongs")
                .aggregate<TaikoSong>([
                    {
                        $match: {
                            "difficulties.edit": star,
                            ...genreMatch
                        }
                    },
                    // タイトルでグループ化して重複を削除
                    {
                        $group: {
                            _id: "$title",
                            song: {
                                $first: "$$ROOT"
                            }
                        }
                    },
                    {
                        $replaceRoot: {
                            newRoot: "$song"
                        }
                    },
                    // 指定件数をランダムサンプリング
                    {
                        $sample: {
                            size: editCount
                        }
                    }
                ])
                .toArray(),

            db
                .collection<TaikoSong>("taikosongs")
                .aggregate<TaikoSong>([
                    {
                        $match: {
                            "difficulties.oni": star,
                            ...genreMatch
                        }
                    },
                    // タイトルでグループ化して重複を削除
                    {
                        $group: {
                            _id: "$title",
                            song: {
                                $first: "$$ROOT"
                            }
                        }
                    },
                    {
                        $replaceRoot: {
                            newRoot: "$song"
                        }
                    },
                    // 指定件数をランダムサンプリング
                    {
                        $sample: {
                            size: oniCount
                        }
                    }
                ])
                .toArray()
        ]);

        // 裏で取得済みの曲タイトルを記録
        const usedTitles = new Set(
            editSongs.map(song => song.title)
        );

        // おにで取得した曲から、裏と重複している楽曲を除外
        const uniqueOniSongs = oniSongs.filter(
            song => !usedTitles.has(song.title)
        );

        // 裏おに曲とおに曲を結合して返却
        return [...editSongs, ...uniqueOniSongs];
    }

    // 単一難易度の抽出
    const match: Record<string, unknown> = {
        [`difficulties.${diff}`]: star,
        ...genreMatch
    };

    return db
        .collection<TaikoSong>("taikosongs")
        .aggregate<TaikoSong>([
            // 指定された難易度の星の数、ジャンルでフィルタ
            {
                $match: match
            },
            // タイトルでの重複を排除
            {
                $group: {
                    _id: "$title",
                    song: {
                        $first: "$$ROOT"
                    }
                }
            },
            {
                $replaceRoot: {
                    newRoot: "$song"
                }
            },
            // 指定件数をランダムサンプリング
            {
                $sample: {
                    size: numberOfSongs
                }
            }
        ])
        .toArray();
}