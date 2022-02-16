import { Token } from "../../../01_1_ELEMENT/1_token_💧/2_1_token";

export enum Precedence {
    LOWEST = 0, 
    LOGICAL = 1, 
    EQUALS = 2,
    LESSGREATER = 3,
    SUM = 4,
    PRODUCT = 5,
    PREFIX = 6,
    CALL = 7,
    STREAM = 8,
    INDEX = 9
};

export const precedences: Partial<{[key in Token]: Precedence}> = {
    [Token.EQ    ]: Precedence.EQUALS,
    [Token.NOT_EQ]: Precedence.EQUALS,
    
    [Token.AND]: Precedence.LOGICAL,
    [Token.OR ]: Precedence.LOGICAL,

    [Token.TYPEOF]:  Precedence.LESSGREATER,
    [Token.LT    ]:  Precedence.LESSGREATER,
    [Token.GT    ]:  Precedence.LESSGREATER,

    [Token.PLUS ]: Precedence.SUM,
    [Token.MINUS]: Precedence.SUM,

    [Token.SLASH   ]: Precedence.PRODUCT,
    [Token.ASTERISK]: Precedence.PRODUCT,
    [Token.MOD     ]: Precedence.PRODUCT,

    [Token.DOT     ]:   Precedence.INDEX,
    [Token.LBRACKET]:   Precedence.INDEX,
    [Token.LPAREN]: Precedence.CALL,
    // _a[token.SOURCE] = precedenceLevel.STREAM,
    // _a[token.SINK] = precedenceLevel.STREAM,
};