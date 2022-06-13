import { CodeCoordinates, CodeData, SourceCode } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/source/source-code.js";
import { AbstractToken } from "../../../01_1_ELEMENT/1_token_💧/0_1_token-structure.js"
import { Token, TypedTokenLiteral } from "../../../01_1_ELEMENT/1_token_💧/2_1_token.js"

/*
 * /T\__________[=]
 * ----------------                          
 *              [Abstract Tokenizer]
 * 
 * of           : :
 *              /T\          [character sequences] 
 *              
 *              across       [[1 or more] dimensions] ]
 *              ----------------
 * ----------------
 * (+)__________<Z>
 * 
 */
export abstract class AbstractTokenizer<
                            Data             extends CodeData,               //
                            OutputFormat     extends AbstractToken = TypedTokenLiteral
                        >  
{
    lineNumber: number | number[];
   
    abstract NextToken():                               OutputFormat;
    
    protected isDigit(      ch: string): boolean {
        return ('0' <= ch && ch <= '9') || ch == '.';
    }

    protected isWholeDigit( ch: string): boolean {
        return ('0' <= ch && ch <= '9');
    }

    public isLetter(        ch: string): boolean {
        return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' 
                                      ||  ch == '_' || ch && ch.charCodeAt(0) > 200;
    }

    abstract isNewLine():                boolean; 
    
    abstract readChar(): void;

    abstract readNumber():[              boolean, string];

    abstract readString(endChar:string):          string ;

}


export interface ITokenizer<
                    CoordinateSystem extends CodeCoordinates, 
                    Data extends CodeData,
                    ComparisonUnit = string, // (unit could be a vector)
                    OutputFormat     extends AbstractToken = TypedTokenLiteral
                 >
       extends SourceCode<CoordinateSystem, Data> 
{

    coordinates: {
        readPosition: CoordinateSystem,
        position:     CoordinateSystem,
    }
    
    code:        Data;
    ch:          ComparisonUnit;
    lineNumber:  CoordinateSystem;

    newToken(tokenType: unknown, literal: Data): OutputFormat;
}