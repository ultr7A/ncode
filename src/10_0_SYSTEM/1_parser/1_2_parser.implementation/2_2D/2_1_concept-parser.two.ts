
import { Node, ConceptExpression }  from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { ConceptOperator }          from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/syntax/1_1_0_expression-elements.js"

import { Token } from "../../../../01_1_ELEMENT/1_token_💧/2_1_token.js"

import { TypedTokenSurface } from "../../../../01_1_ELEMENT/1_token_💧/2_2_token-surface.js"
import { StringLiteral } from "../../../../03_0_Structure_🌴/1_ast/1_3_1_literal.js"
import { Orientation_XY, Oriented } from "../../../0_0_system-structure/1_0_system-structure.js"
import { TokenizerTwo } from "../../../0_tokenizer/1_2_tokenizer.implementation/2_2_1_tokenizer.two.js"

import { ConceptAnalyzer } from "../../../2_compiler/0_3_analyzer/2_3_concept-analyzer.js"
import { conceptPrecedences } from "../../0_0_parser-core/2_2_concept-precedence.js"

import { InfixParseFn, PrefixParseFn }     from "../../0_0_parser-core/3_0_parse-functions.js"
import { AbstractParser } from "../../0_2_abstract-parser/0_0_1_abstract-parser.js"

import { GraphParserTwo } from "./0_2_4_graph-parser.two.js"


/**
 * 
 * */
export class ConceptParserTwo extends AbstractParser<TypedTokenSurface, Node, ConceptExpression, ConceptOperator, ConceptAnalyzer>
                              implements Oriented<Orientation_XY> {
    
    public analyzer:    ConceptAnalyzer;
    public graphParser: GraphParserTwo  <ConceptOperator, StringLiteral, ConceptExpression>;

    public direction:   Orientation_XY = 0;
    
    protected currentToken:  TypedTokenSurface = null;
    protected peekToken: TypedTokenSurface = null;

    public prefixParseFns = {} as Partial<{ [prefixToken in Token]: PrefixParseFn<ConceptExpression, Node> }>;
    public infixParseFns  = {} as Partial<{ [infixToken  in Token]:  InfixParseFn<ConceptExpression, Node> }>;

    constructor(tokenizer: TokenizerTwo) {
        super(tokenizer, conceptPrecedences);
        this.analyzer = new ConceptAnalyzer();
    }

    public setCurrentToken(token) {
        this.currentToken = token;
        return token;
    }

    public setPeekToken(token) {
        this.peekToken = token;
        return token;
    }

    public doParseProgram(): void {
        console.log("TODO: implement")
    }

}