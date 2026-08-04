export interface ConverterResponse {
    originText: string;
    translatedText: string;
}

export type ConverterTable = Record<string, string>;