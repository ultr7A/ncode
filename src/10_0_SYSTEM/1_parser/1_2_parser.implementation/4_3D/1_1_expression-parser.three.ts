

import { Operator }                      from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/0_operation-types_🔍/1_primitive-operators.js"
import { Node, Expression, ConceptExpression } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { GraphOperator }                 from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/syntax/1_1_0_expression-elements.js"

import { Token } from "../../../../01_1_ELEMENT/1_token_💧/2_1_token.js"
import { TypedTokenVolume } from "../../../../01_1_ELEMENT/1_token_💧/2_4_token-volume.js"
import { StringLiteral } from "../../../../03_0_Structure_🌴/1_ast/1_3_1_literal.js"
import { Directional, Orientation_WXYZ } from "../../../0_0_system-structure/1_0_system-structure.js"
import { TokenizerThree } from "../../../0_tokenizer/1_2_tokenizer.implementation/2_4_1_tokenizer.three.js"

import { Analyzer } from "../../../2_compiler/0_3_0_analyzer/1_3_expression-analyzer.js"
import { parseProgram } from "../../0_0_parser-core/0_3_0_parse-program.js"
import { precedences } from "../../0_0_parser-core/2_1_precedence.js"

import { PrefixParseFn, InfixParseFn } from "../../0_0_parser-core/3_0_parse-functions.js"
import { AbstractParser }              from "../../0_2_abstract-parser/0_0_1_abstract-parser.js"

import { GraphParserThree } from "./0_2_4_graph-parser.three.js"


/**
 * 
 */
export class ExpressionParserThree extends    AbstractParser<TypedTokenVolume, Node, Expression, Operator> 
                                   implements /** IExpressionParser **/ 
                                              Directional<Orientation_WXYZ> {
    
    public analyzer:    Analyzer;
    public graphParser: GraphParserThree  <GraphOperator, StringLiteral, ConceptExpression>;

    public direction:    Orientation_WXYZ = [0, 0, 0, 0];
    
    protected currentToken:  TypedTokenVolume = null;
    protected peekToken: TypedTokenVolume = null;

    public prefixParseFns = {} as Partial<{ [prefixToken in Token]: PrefixParseFn<Expression, Node> }>;
    public infixParseFns  = {} as Partial<{ [infixToken  in Token]:  InfixParseFn<Expression, Node> }>;

    public setCurrentToken(token) {
        this.currentToken = token;
        return token;
    }

    public setPeekToken(token) {
        this.peekToken = token;
        return token;
    }

    constructor(tokenizer: TokenizerThree) {
        super(tokenizer, precedences);
    }

    
    // public parseProgram( ) {
    //     return parseProgram(this);
    // }

    public doParseProgram(): void {
        console.log("TODO: implement")
    }

}