
import { TokenVolume, TypedTokenVolume } from "../../../01_1_ELEMENT/1_token_💧/2_4_token-volume";
import { AbstractTokenizer } from "../0_1_tokenizer-core/0_2_abstract-tokenizer";

/**
 * 
 */
export class TokenizerThree extends AbstractTokenizer<
                                        [number, number, number], string[][], 
                                        string,                   TypedTokenVolume
                                    >
{

    public ch = "";
    public code = [[]] as string[][];
    public lineNumber = [0, 0, 0] as [number, number, number];

    coordinates = {
        readPosition: [0, 0, 0] as [number, number, number],
        position:     [0, 0, 0] as [number, number, number]
    }


    loadSourceCode(input: string[][]) {
        this.coordinates.position     = [0, 0, 0];
        this.coordinates.readPosition = [0, 0, 0];
        this.lineNumber               = [0, 0, 0];
        this.ch = "";
        this.code = input;
    };

    NextToken(): TypedTokenVolume {
        return null; //TODO: <--- implement
    }

    newToken(tokenType: TokenVolume, literal: string[][]): TypedTokenVolume {
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