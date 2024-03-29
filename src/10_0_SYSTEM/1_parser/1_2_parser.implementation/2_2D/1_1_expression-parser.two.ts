import { Operator }      from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/0_operation-types_🔍/1_primitive-operators.js"
import { CodeData }      from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/source/source-code.js"
import { Node, Expression, Statement }    from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { GraphOperator } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/syntax/1_1_0_expression-elements.js"

import { Token } from "../../../../01_1_ELEMENT/1_token_💧/2_1_token.js"
import { TypedTokenSurface } from "../../../../01_1_ELEMENT/1_token_💧/2_2_token-surface.js"
import { Program } from "../../../../03_0_Structure_🌴/1_ast_🧩/1_0_1_root.js"
import { StringLiteral } from "../../../../03_0_Structure_🌴/1_ast_🧩/1_3_1_literal.js"
import { Orientation_XY, Oriented } from "../../../0_0_system-structure/1_0_system-structure.js"
import { AbstractTokenizer, ITokenizer } from "../../../0_tokenizer/0_1_tokenizer-core/0_2_abstract-tokenizer.js"
import { TokenizerOne } from "../../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one.js"

import { TokenizerTwo } from "../../../0_tokenizer/1_2_tokenizer.implementation/2_2_1_tokenizer.two.js"
import { Analyzer } from "../../../2_compiler/0_3_0_analyzer/1_3_expression-analyzer.js"
import { precedences }                 from "../../0_0_parser-core/2_1_precedence.js"
import { InfixParseFn, PrefixParseFn } from "../../0_0_parser-core/3_0_parse-functions.js"
import { IExpressionParser } from "../../0_0_parser-core/expression-parser.interface.js"
import { AbstractParser } from "../../0_2_abstract-parser/0_0_1_abstract-parser.js"
import { GraphParserTwo } from "./0_2_4_graph-parser.two.js"



/**
 * 
 */
export class ExpressionParserTwo extends    AbstractParser<TypedTokenSurface, Node, Expression, Operator, Analyzer> 
                                 implements /** IExpressionParser, **/
                                            Oriented<Orientation_XY> {

    public analyzer:    Analyzer;
    public graphParser: GraphParserTwo  <GraphOperator, StringLiteral, Expression>;

    protected currentToken:  TypedTokenSurface = null;
    protected peekToken: TypedTokenSurface = null;

    direction: number;

    public prefixParseFns = {} as Partial<{ [prefixToken in Token]: PrefixParseFn<Expression, Node> }>;
    public infixParseFns  = {} as Partial<{ [infixToken  in Token]:  InfixParseFn<Expression, Node> }>;
    
    public setCurrentToken(token) {
        this.currentToken = token;
        return token;
    }

    public setPeekToken(token: any) {
        this.peekToken = token;
        return token;
    }

    constructor(tokenizer: TokenizerTwo) {
        super(tokenizer, precedences);
    }

    public loadSourceCode(code: CodeData) {
        (this.tokenizer as unknown as TokenizerTwo).loadSourceCode(code as string[]);
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