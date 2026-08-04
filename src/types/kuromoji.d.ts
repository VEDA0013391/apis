declare module "kuromoji" {

    export interface Token {
        surface_form: string;
        pos: string;
        reading?: string;
    }


    export interface Tokenizer {
        tokenize(text: string): Token[];
    }


    interface Builder {
        build(
            callback: (
                err: Error | null,
                tokenizer: Tokenizer
            ) => void
        ): void;
    }


    function builder(options: {
        dicPath: string;
    }): Builder;


    const kuromoji: {
        builder: typeof builder;
    };


    export = kuromoji;
}