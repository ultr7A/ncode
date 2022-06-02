import { CodeData } from "../../01_2_Sequence_📘🌊/0_source/source-code.js"
import { Orientation_One } from "../../10_0_SYSTEM/0_0_system-structure/1_0_system-structure.js"
import { AbstractToken } from "./0_1_token-structure.js"
import { DynamicToken, ITokenPattern }  from "./0_2_dynamic-token.js"


export abstract class LinearDynamicToken 
       extends DynamicToken<TypedTokenLiteral, CodeData, number, Orientation_One> 
{
    searchSpace = {
        direction: "forward" as Orientation_One,
        coordinates: {
            position:     0,
            readPosition: 0
        },
        code: "" as CodeData
    };

    public match(): boolean {
        return false;
    }

    public read(): TypedTokenLiteral {
        return null;
    }

    public render(): string {
        return "";
    }
}



/******************************************************************************************* 
 * Dynamic, linear tokens:
 *
 * TODO:  break this out  into  a separate task:
 * 
 *******************************************************************************************/

/*  export class LinearDynamicIdentifierToken     extends LinearDynamicToken               {
 *     pattern: ITokenPattern<CodeData, number, "forward",  LinearIdentifierTokenMatcher>; } 
 *  
 * export class LinearDynamicStringLiteralToken  extends LinearDynamicToken                {
 *     pattern: ITokenPattern<CodeData, number, "forward",  LinearStringTokenMatcher>;     } 
 *
 * export class LinearDynamicFloatLiteralToken   extends LinearDynamicToken                {
 *     pattern: ITokenPattern<CodeData, number, "forward",  LinearFloatTokenMatcher>;      }
 *
 * export class LinearDynamicIntegerLiteralToken extends LinearDynamicToken                {
 *     pattern: ITokenPattern<CodeData, number, "forward",  LinearIntegerTokenMatcher>;    }
 */


/**
 *  Adjacent characters, given meaning, when grouped:
 */
export enum Token {

    // Non-program tokens:
    ILLEGAL = "ILEGAL",
    EOF     = "EOF",


    // Literals:
    //      Primitive-literals:
    TRUE   = "TRUE",
    FALSE  = "FALSE",
    INT    = "INT",
    FLOAT  = "FLOAT",
    STRING = "STRING",
    //      Abstract-literals:
    FUNCTION = "FUNCTION",


    // Operators:
    ASSIGN = "=",
    DOT    = ".",
    PLUS   =   "+",      // Operator.ADD,
    BANG   =   "!",      // Operator.LOGICAL_NOT,
    MINUS  =   "-",      // Operator.SUBTRACT,
    SLASH  =   "/",      // Operator.DIVIDE,
    ASTERISK = "*",      // Operator.MULTIPLY,
    MOD =      "%",      // Operator.MOD,
    LT =       "<",      // Operator.LESS_THAN,
    GT =       ">",      // Operator.GREATER_THAN,
    EQ =       "==",     // Operator.EQUALITY,
    NOT_EQ =   "!=",     // Operator.NOT_EQUAL,
    AND =      "&&",     // Operator.LOGICAL_CONJUNCTION,
    OR =       "||",     // Operator.LOGICAL_DISJUNCTION,
    TYPEOF =   "typeof", // Operator.TYPEOF,
    
    SOURCE      = "->",     //StreamToken.SOURCE, //"->",
    SINK        = "<-",     //StreamToken.SINK,
    INSERTION   = "<<",     //StreamToken.INSERTION,
    EXTRACTION  = ">>",     //StreamToken.EXTRACTION,


    // Delimiters:
    //     Value-separators:
    COMMA     = ",",
    COLON     = ":",
    SEMICOLON = ";",
    //     Sets:
    LBRACE = "{",
    RBRACE = "}",
    LBRACKET = "[",
    RBRACKET = "]",
    //     Expressions:
    LPAREN = "(",
    RPAREN = ")",
    //     Graphs and abstract expressions:
    //           Operators:
    //                  Concept Operator expression boundaries:
    POUND_LPAREN = "#(",
    RPAREN_POUND = ")#",
    //                  Graph Operator expression boundaries:
    ASTERISK_LPAREN = "*(",
    RPAREN_ASTERISK = ")*",
    //           Graph Expression boundaries:
    ASTERISK_LBRACE = "*{",
    RBRACE_ASTERISK = "}*",
    ASTERISK_LBRACKET = "*[", // TODO: is  ["graph sequence" a thing]?
    RBRACKET_ASTERISK = "]*", // TODO            ^^^
    //           Concept Expression boundaries:
    POUND_LBRACE = "#{",
    RBRACE_POUND = "}#",
    POUND_LBRACKET  = "#[",
    RBRACKET_POUND  = "]#",

    // Comments:
    LCOMMENT = "/*",
    RCOMMENT = "*/",

    // Keywords:
    //     Declaring Identifiers:
    LET_BOOL     = "boolean",
    LET_INT      = "int",
    LET_FLOAT    = "float",
    LET_STRING   = "String",
    LET_ARRAY    = "Array",
    LET_OBJECT   = "Object",
    LET_FUNCTION = "Function",
    LET          = "let",
    CONST        = "const",
    //     Control-structure invocations:
    IF     = "if",
    ELSE   = "else",
    FOR    = "for",
    SLEEP  = "sleep",
    WHILE  = "while",
    //     Data-operation invocations:
    RETURN = "return",
    EXEC   = "exec",
    IMPORT = "import",
    NEW    = "new",
    //     Data-structure declarations:
    CONCEPT   = "concept",
    INTERFACE = "interface",
    CLASS     = "class",
    STREAM    = "stream",


    // Modifiers
    EXTERNAL  = "external",
    PUBLIC    = "public",
    PROTECTED = "protected",
    PRIVATE   = "private",
    STATIC    = "static",
    FINAL     = "final",
    PURE      = "pure",


    // Identifiers:
    IDENT = "IDENT",

    // Tokenizer-mode switching:
    //      ~TokenizerOne:
    ENTER_2D     = "ENTER_2D",

    //      ~TokenizerTwo:
    RETURN_TO_1D = "RETURN_TO_1D",
    //              {Nested within ~ParserThree}
    ENTER_3D     = "ENTER_3D",

    //      ~TokenizerThree:
    DROP_TO_2D   = "DROP_TO_2D" 
}

export interface TypedTokenLiteral extends AbstractToken {
    Type:    Token;
    Literal: string;
};

export const modifierNames = [Token.EXTERNAL, Token.PUBLIC, Token.PROTECTED, Token.PRIVATE, Token.STATIC, Token.FINAL, Token.PURE];
export enum Modifier {
    EXTERNAL  = 0,
    PUBLIC    = 1,
    PROTECTED = 2,
    PRIVATE   = 3,
    STATIC    = 4,
    FINAL     = 5,
    PURE      = 6
};

export const keywords = {
    "pure":   Token.PURE,
    "fn":     Token.FUNCTION,
    "let":    Token.LET,
    "const":  Token.CONST,
    "if":     Token.IF,
    "else":   Token.ELSE,
    "return": Token.RETURN,
    "true":   Token.TRUE,
    "false":  Token.FALSE,
    "for":    Token.FOR,
    "sleep":  Token.SLEEP,
    "exec":   Token.EXEC,
    "import": Token.IMPORT,
    "while":  Token.WHILE,
    "typeof": Token.TYPEOF,
    "new":    Token.NEW,
    "class":     Token.CLASS,
    "concept":   Token.CONCEPT,
    "interface": Token.INTERFACE,
    "private": Token.PRIVATE,
    "static":  Token.STATIC,
    "final":   Token.FINAL,
    "boolean":  Token.LET_BOOL,
    "int":      Token.LET_INT,
    "float":    Token.LET_FLOAT,
    "string":   Token.LET_STRING,
    "array":    Token.LET_ARRAY,
    "object":   Token.LET_OBJECT,
    "function": Token.LET_FUNCTION,
    "stream":   Token.STREAM
};


export function LookupIdent(ident: string) {
    const tokenType = keywords[ident];

    if (tokenType != null) {
        return tokenType;
    }
    return Token.IDENT;
}