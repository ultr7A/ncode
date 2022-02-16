import { AbstractToken, VectorToken } from "./0_1_token-structure";
import { Token } from "./2_1_token";

/**
 * 
 */
export class TokenVolume {
    // TODO, match pattern across one or more axis:
    constructor() {}
}

export  interface TypedTokenVolume extends AbstractToken, VectorToken {
    Type:         Token
    literalValue: string[][];
}

export const modifierVolumes = [];
export const KeyVolumes = {

}


export function LookupSurfaceIdent(ident: string[][]): TokenVolume {
    //TODO: implement matching string[][] against known key-voumes
    return null;
}