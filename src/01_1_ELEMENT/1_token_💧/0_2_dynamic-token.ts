import { CodeData, CodeCoordinates, SourceCode } from "../../01_2_Sequence_📘🌊/0_source/source-code.js"
import { Orientation_Type, Oriented } from "../../10_0_SYSTEM/0_0_system-structure/1_0_system-structure.js"
import { AbstractToken } from "./0_1_token-structure.js"

export  type  TokenMatcher  =           TokenMatcherConstant |
                                        TokenMatcherRegExp   |
                                        TokenMatcherFunction;
                                        
export  type  TokenMatcherConstant =    CodeData;
export  type  TokenMatcherRegExp   =    RegExp;  
export  type  TokenMatcherFunction =    (charSequence: string ) => string;  


export  interface ITokenPattern
        <
            CodeDataType   extends CodeData, 
            CoordinateType extends CodeCoordinates, 
            Orientation    extends Orientation_Type,
            Matcher        extends TokenMatcher
        >   {};

export      interface SearchSpace
        <
            CodeDataType   extends CodeData, 
            CoordinateType extends CodeCoordinates, 
            Orientation    extends Orientation_Type
        >   extends Oriented<Orientation>, SourceCode<CoordinateType, CodeDataType> {};

export  abstract class DynamicToken
        <
            TokenLiteralType extends AbstractToken,
            CodeDataType     extends CodeData, 
            CoordinateSystem extends CodeCoordinates,
            OrientationType  extends Orientation_Type
        > 
{
    abstract searchSpace: SearchSpace       <CodeDataType, CoordinateSystem, OrientationType>;
    abstract pattern    : ITokenPattern     <CodeDataType, CoordinateSystem, OrientationType, TokenMatcher>; 

    abstract match()    : boolean;
    abstract read()     : TokenLiteralType;

    abstract render()   : CodeDataType; 
};

