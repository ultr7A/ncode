import { Token } from "./2_1_token";

export interface AbstractToken {
    Type: string;
}

export interface VectorToken {
    linearTokenAnalog: Token;
    literalValue:      string[] | string[][];
};