import { TypedTokenSurface, TokenSurface } from "../../../01_1_ELEMENT/1_token_💧/2_2_token-surface";
import { AbstractTokenizer } from "../0_1_tokenizer-core/0_2_abstract-tokenizer";

/**
 * 
 */
export class TokenizerTwo extends AbstractTokenizer<
                                        [number, number], string[], 
                                        string, TypedTokenSurface
                                > 
{

    public ch = "";
    public code = [] as string[];
    public lineNumber = [0, 0] as [number, number];

    public  coordinates = {
        readPosition: [0, 0] as [number, number],
        position:     [0, 0] as [number, number]
    };


    loadSourceCode(input: string[]) {
        this.coordinates.position = [0,0];
        this.coordinates.readPosition = [0, 0];
        this.lineNumber = [0, 0];
        this.ch = "";
        this.code = input;
    };

    NextToken(): TypedTokenSurface {
        return null;
    }

    newToken(tokenType: TokenSurface, literal: string[]): TypedTokenSurface {
        return null; //TODO: <--- implement
    }

    readChar():void {
        //TODO: implement:
    }

    readNumber(): [boolean, string] {
        return [false, ""]; //TODO: <--- implement
    }

    readString(): string {
        return ""; //TODO: <--- implement
    }

    isNewLine(): boolean {
        return false;  //TODO: <--- implement
    }
}