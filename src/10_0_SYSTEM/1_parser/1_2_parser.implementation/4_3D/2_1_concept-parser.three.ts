import { Node, ConceptExpression } from "../../../../../../wrapt.co_re/src/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";

import { Token } from "../../../../01_1_ELEMENT/1_token_💧/2_1_token";
import { TypedTokenVolume } from "../../../../01_1_ELEMENT/1_token_💧/2_4_token-volume";
import { ConceptOperator } from "../../../../03_0_Structure_🌴/1_ast/1_1_0_expression-elements";
import { StringLiteral } from "../../../../03_0_Structure_🌴/1_ast/1_3_1_literal";
import { TokenizerThree } from "../../../0_tokenizer/1_2_tokenizer.implementation/2_4_1_tokenizer.three";

import { ConceptAnalyzer } from "../../../2_compiler/0_3_analyzer/2_3_concept-analyzer";
import { conceptPrecedences } from "../../0_0_parser-core/2_2_concept-precedence";

import { PrefixParseFn, InfixParseFn } from "../../0_0_parser-core/3_0_parse-functions";
import { AbstractParser } from "../../0_2_abstract-parser/0_0_1_abstract-parser";
import { GraphParserTwo } from "../2_2D/0_2_4_graph-parser.two";

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
}