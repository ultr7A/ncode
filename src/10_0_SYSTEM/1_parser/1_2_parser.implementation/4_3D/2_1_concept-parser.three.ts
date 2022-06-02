import { Node, ConceptExpression } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"

import { Token } from "../../../../01_1_ELEMENT/1_token_💧/2_1_token.js"
import { TypedTokenVolume } from "../../../../01_1_ELEMENT/1_token_💧/2_4_token-volume.js"
import { ConceptOperator } from "../../../../03_0_Structure_🌴/1_ast/1_1_0_expression-elements.js"
import { StringLiteral } from "../../../../03_0_Structure_🌴/1_ast/1_3_1_literal.js"
import { TokenizerThree } from "../../../0_tokenizer/1_2_tokenizer.implementation/2_4_1_tokenizer.three.js"

import { ConceptAnalyzer } from "../../../2_compiler/0_3_analyzer/2_3_concept-analyzer.js"
import { conceptPrecedences } from "../../0_0_parser-core/2_2_concept-precedence.js"

import { PrefixParseFn, InfixParseFn } from "../../0_0_parser-core/3_0_parse-functions.js"
import { AbstractParser } from "../../0_2_abstract-parser/0_0_1_abstract-parser.js"
import { GraphParserTwo } from "../2_2D/0_2_4_graph-parser.two.js"

/**
 * 
 */
export class ConceptParserThree extends AbstractParser<TypedTokenVolume, Node, ConceptExpression, ConceptOperator, ConceptAnalyzer> {

    public analyzer:    ConceptAnalyzer;
    public graphParser: GraphParserTwo  <ConceptOperator, StringLiteral, ConceptExpression>;

    
    protected curToken:  TypedTokenVolume;
    protected peekToken: TypedTokenVolume;

    public prefixParseFns = {} as Partial<{ [prefixToken in Token]: PrefixParseFn<ConceptExpression, Node> }>;
    public infixParseFns  = {} as Partial<{ [infixToken  in Token]:  InfixParseFn<ConceptExpression, Node> }>;

    constructor(l: TokenizerThree) {
        super(l, conceptPrecedences);
        this.analyzer = new ConceptAnalyzer();
    }

    
    public doParseProgram(): void {
        console.log("TODO: implement")
    }
}