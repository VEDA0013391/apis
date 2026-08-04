import wanakana from "wanakana";

import gaster from "../../data/converter/gaster.json";
import { convertKanjiToKana } from "./japanese.service";
const table = gaster as Record<string, string>;

// ローマ字変換
function convertToRomajiKeepAlphabet(text: string): string {

    const protectedChars: string[] = [];

    // 英字を一時退避
    const replaced = text.replace(
        /[a-zA-Z]+/g,
        (match) => {
            const index = protectedChars.length;
            protectedChars.push(match.toLowerCase());
            return `__ALPHA_${index}__`;
        }
    );


    // 英字以外をローマ字化
    let romaji = wanakana.toRomaji(replaced);

    protectedChars.forEach((value, index) => {
        romaji = romaji.replace(
            `__ALPHA_${index}__`,
            value
        );
    });

    return romaji;
}

// gaster変換
export function convertGaster(text: string) {
    const kanaText = convertKanjiToKana(text);
    const romajiText = convertToRomajiKeepAlphabet(kanaText);

    let result = "";

    for (const c of romajiText) {
        result += table[c.toLowerCase()] ?? c;
    }


    return {
        originText: text,
        translatedText: result
    };
}