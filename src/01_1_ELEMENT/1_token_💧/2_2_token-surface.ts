import { AbstractToken, VectorToken } from "./0_1_token-structure";
import { Token } from "./2_1_token";

/**
 * 
 */
export class TokenSurface {
    // TODO, match pattern across one or more axis:
    constructor() {}
}

export  interface TypedTokenSurface extends AbstractToken, VectorToken {
    Type:         Token;
    literalValue: string[];
}

export const modifierSurfaces = []; 
export const keySurfaces = {

}


export function LookupSurfaceIdent(ident: string[]): TokenSurface {
    //TODO: implement matching string[] against known keywords
    return null;
}