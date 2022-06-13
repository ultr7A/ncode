import { Token } from "./2_1_token.js"

export interface AbstractToken {
    Type: string;
}

export interface VectorToken {
    linearTokenAnalog: Token;
    literalValue:      string[] | string[][];
};