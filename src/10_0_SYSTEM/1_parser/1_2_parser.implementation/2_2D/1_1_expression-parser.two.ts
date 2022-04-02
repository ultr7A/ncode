import { Operator }      from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/object/0_operation-types_🔍/1_primitive-operators";
import { Node, Expression, Statement }    from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { GraphOperator } from "wrapt.co_re/lib/Model [╍⬡╍ꙮ╍▦╍]/syntax/1_1_0_expression-elements";

import { Token } from "../../../../01_1_ELEMENT/1_token_💧/2_1_token";
import { TypedTokenSurface } from "../../../../01_1_ELEMENT/1_token_💧/2_2_token-surface";
import { CodeData } from "../../../../01_2_Sequence_📘🌊/0_source/source-code";
import { Program } from "../../../../03_0_Structure_🌴/1_ast/1_0_1_root";
import { StringLiteral } from "../../../../03_0_Structure_🌴/1_ast/1_3_1_literal";
import { Orient } from "../../../0_0_system-structure/1_0_system-structure";
import { TokenizerOne } from "../../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one";

import { TokenizerTwo } from "../../../0_tokenizer/1_2_tokenizer.implementation/2_2_1_tokenizer.two";
import { Analyzer } from "../../../2_compiler/0_3_analyzer/1_3_expression-analyzer";
import { precedences }                 from "../../0_0_parser-core/2_1_precedence";
import { InfixParseFn, PrefixParseFn } from "../../0_0_parser-core/3_0_parse-functions";
import { AbstractParser } from "../../0_2_abstract-parser/0_0_1_abstract-parser";
import { GraphParserTwo } from "./0_2_4_graph-parser.two";



/**
 * 
 */
export class ExpressionParserTwo extends AbstractParser<TypedTokenSurface, Node, Expression, Operator, Analyzer> 
                                 implements Orient.ed<Orient.ation.XY> {

    public analyzer:    Analyzer;
    public graphParser: GraphParserTwo  <GraphOperator, StringLiteral, Expression>;

    protected curToken:  TypedTokenSurface;
    protected peekToken: TypedTokenSurface;

    direction: number;

    public prefixParseFns = {} as Partial<{ [prefixToken in Token]: PrefixParseFn<Expression, Node> }>;
    public infixParseFns  = {} as Partial<{ [infixToken  in Token]:  InfixParseFn<Expression, Node> }>;

    constructor(tokenizer: TokenizerTwo) {
        super(tokenizer, precedences);
    }

    public loadSourceCode(code: CodeData) {
        (this.tokenizer as TokenizerTwo).loadSourceCode(code as string[]);
    }

    parseStatement(): Statement {    
        throw new Error("Method not implemented");
        return null;
    }

    parseModifiers(): number[] {
        throw new Error("Method not implemented");
        return [];
    }

    
    public doParseProgram(): void {
        console.log("TODO: implement")
    }
    
}