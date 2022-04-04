

import { Operator }                      from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/object/0_operation-types_🔍/1_primitive-operators";
import { Node, Expression, ConceptExpression } from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { GraphOperator }                 from "wrapt.co_re/lib/Model [╍⬡╍ꙮ╍▦╍]/syntax/1_1_0_expression-elements";

import { Token } from "../../../../01_1_ELEMENT/1_token_💧/2_1_token";
import { TypedTokenVolume } from "../../../../01_1_ELEMENT/1_token_💧/2_4_token-volume";
import { StringLiteral } from "../../../../03_0_Structure_🌴/1_ast/1_3_1_literal";
import { Directional, Orientation_WXYZ } from "../../../0_0_system-structure/1_0_system-structure";
import { TokenizerThree } from "../../../0_tokenizer/1_2_tokenizer.implementation/2_4_1_tokenizer.three";

import { Analyzer } from "../../../2_compiler/0_3_analyzer/1_3_expression-analyzer";
import { precedences } from "../../0_0_parser-core/2_1_precedence";

import { PrefixParseFn, InfixParseFn } from "../../0_0_parser-core/3_0_parse-functions";
import { AbstractParser }              from "../../0_2_abstract-parser/0_0_1_abstract-parser";

import { GraphParserThree } from "./0_2_4_graph-parser.three";


/**
 * 
 */
export class ExpressionParserThree extends AbstractParser<TypedTokenVolume, Node, Expression, Operator> 
                                   implements Directional<Orientation_WXYZ> {
    
    public analyzer:    Analyzer;
    public graphParser: GraphParserThree  <GraphOperator, StringLiteral, ConceptExpression>;

    public direction:    Orientation_WXYZ = [0, 0, 0, 0];
    
    protected curToken:  TypedTokenVolume;
    protected peekToken: TypedTokenVolume;

    public prefixParseFns = {} as Partial<{ [prefixToken in Token]: PrefixParseFn<Expression, Node> }>;
    public infixParseFns  = {} as Partial<{ [infixToken  in Token]:  InfixParseFn<Expression, Node> }>;

    constructor(l: TokenizerThree) {
        super(l, precedences);
    }

    
    public doParseProgram(): void {
        console.log("TODO: implement")
    }

}