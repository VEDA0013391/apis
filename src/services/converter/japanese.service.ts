import kuromoji from "kuromoji";

let tokenizer: kuromoji.Tokenizer | null = null;

// kuromoji初期化
export async function initJapaneseConverter() {
    tokenizer = await new Promise((resolve, reject) => {
        kuromoji
            .builder({
                dicPath: "node_modules/kuromoji/dict"
            })
            .build((err, builtTokenizer) => {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(builtTokenizer);

            });
    });
}


// 漢字が含まれているか確認
function hasKanji(text: string): boolean {
    return /[\u4E00-\u9FFF]/.test(text);
}


// 漢字を読みへ変換
export function convertKanjiToKana(text: string): string {
    if (!tokenizer) {
        throw new Error(
            "Japanese converter is not initialized."
        );
    }

    // 漢字なしならそのまま返す
    if (!hasKanji(text)) {
        return text;
    }

    const tokens = tokenizer.tokenize(text);

    return tokens
        .map(token => {
            // 漢字を含む単語だけ変換
            if (hasKanji(token.surface_form)) {
                return token.reading ?? token.surface_form;
            }

            return token.surface_form;

        })
        .join("");
}