import rune from "../../data/converter/rune.json";
import { ConverterResponse } from "../../types/converter";
import { convertKanjiToKana } from "./japanese.service";

const table = rune as Record<string, string>;

export function convertRune(text: string): ConverterResponse {
    const convertedText = convertKanjiToKana(text);

    let result = "";

    for (const c of convertedText) {
        result += table[c.toLowerCase()] ?? c;
    }

    return {
        originText: text,
        translatedText: result
    };
}