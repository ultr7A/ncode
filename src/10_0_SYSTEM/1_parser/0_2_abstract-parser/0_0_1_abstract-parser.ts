import { ParseTreeAnalysis }                          from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/4_0_0_meta";
import { Operator }                                   from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/object/0_operation-types_🔍/1_primitive-operators";
import { Node, Expression, Statement, FunctionNode }  from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { sprintf }           from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/util/1_ubiquitous-util";

import { AbstractToken } from "../../../01_1_ELEMENT/1_token_💧/0_1_token-structure";
import { Token } from "../../../01_1_ELEMENT/1_token_💧/2_1_token";
import { CodeCoordinates, CodeData } from "../../../01_2_Sequence_📘🌊/0_source/source-code";
import { Program } from "../../../03_0_Structure_🌴/1_ast/1_0_1_root";

import { AbstractTokenizer } from "../../0_tokenizer/0_1_tokenizer-core/0_2_abstract-tokenizer";
import { ExpressionAnalysisDiagnosticContext } from "../../2_compiler/0_3_analyzer/0_1_analyzer-structure";
import { AbstractAnalyzer } from "../../2_compiler/0_3_analyzer/0_3_abstract-analyzer";
import { Analyzer } from "../../2_compiler/0_3_analyzer/1_3_expression-analyzer";
import { IPrecedences } from "../0_0_parser-core/0_1_precedence-structure";
import { Precedence } from "../0_0_parser-core/2_1_precedence";
import { InfixParseFn, PrefixParseFn } from "../0_0_parser-core/3_0_parse-functions";



/***
 * AbstractParser 
 * 
 */
export abstract class AbstractParser<
                TokenObject        extends AbstractToken    = AbstractToken, 
                OutputNodeType     extends Node             = Node, 
                ExpressionNodeType extends Node             = Expression,
                OperatorType                                = Operator,
                AnalyzerType       extends AbstractAnalyzer<ExpressionNodeType, ParseTreeAnalysis, any> = Analyzer
             > {

    protected curToken:  TokenObject;
    protected peekToken: TokenObject;
    protected errors = [] as string[];
    //TODO: move analyzer logic out of ParserOne and into AbstractAnalyzer<>:
    protected analyzer?: AnalyzerType;

    abstract prefixParseFns: Partial<{ [key in Token]: PrefixParseFn<ExpressionNodeType, OutputNodeType> }>;
    abstract infixParseFns:  Partial<{ [key in Token]:  InfixParseFn<ExpressionNodeType, OutputNodeType> }>;
                
    abstract doParseProgram(statements: Statement[], program: Program): void;


    diagnosticContext: ParseTreeAnalysis;



    constructor(
            protected tokenizer:  AbstractTokenizer<CodeCoordinates, CodeData, string, TokenObject>, 
            protected precedence: IPrecedences
    ) {
        this.precedence = precedence;
        this.reset();
    }

    public reset(): void {
        this.errors = [];
        this.curToken = null;
        this.peekToken = null;
        this.resetDiagnosticContext();
    }



    public parse() {
        this.reset();
        this.nextToken();
        this.nextToken();
    }


    public parseProgram() {
        var Statements = [], program = new Program(Statements);
        this.doParseProgram(Statements, program);
        // console.log(JSON.stringify(this.diagnosticContext, null, 2));
        // console.log(JSON.stringify(program, null, 2));
        return program;
    }

    protected resetDiagnosticContext() {
        this.diagnosticContext = new ExpressionAnalysisDiagnosticContext();
    }

    // Reading tokens:
    //      No disintegration:
    protected peekTokenIs(t: Token): boolean {
        return this.peekToken.Type == t;
    }
    protected curTokenIs (t: Token): boolean {
        return this.curToken.Type == t;
    }
    protected curTokenIsAnyOf(t: string[]): boolean {
        return t.includes(this.curToken.Type);
    }
    //      Traversing tokens:
    protected nextToken(times = 1): void {
        for (let next = 0; next < times; next++) {
            this.curToken  = this.peekToken;
            this.peekToken = this.tokenizer.NextToken() // as unknown as TokenObject; // TODO: why isn't this statically compatible?
        }   
    }


    // Checking precedence:
    //      Out of curiosity:
    protected peekPrecedence(): number {
        const p = this.precedence[this.peekToken.Type];

        if (typeof p == "number") {
            return p;
        }
        return Precedence.LOWEST;
    }
    protected curPrecedence(): number {
        const p = this.precedence[this.curToken.Type];

        if (typeof p == "number") {
            return p;
        }
        return Precedence.LOWEST;
    }
    //      Stop the show! Something is wrong if this fails:
    protected expectPeek(t: Token): boolean {
        if (this.peekTokenIs(t)) {
            this.nextToken();
            return true;
        }
        else {
            this.peekError(t);
            return false;
        }
    }


    // Parser configuration:
    protected registerPrefix(tokenType: string, fn: PrefixParseFn<ExpressionNodeType>) {
        this.prefixParseFns[tokenType] = fn;
    }

    protected registerInfix(tokenType: string, fn: InfixParseFn<ExpressionNodeType, OutputNodeType>) {
        this.infixParseFns[tokenType] = fn;
    }


    // Error handling:
    public Errors(): string[] {
        return this.errors;
    }
  

    protected peekError(expectedType: string): void {
        var msg = sprintf("expected next token to be %s, got %s instead", expectedType, this.peekToken.Type);

        this.parseError(msg);
    }
    protected noPrefixParseFnError(t: string): void {
        var msg = "no prefix parse function for " + t + " found";

        this.parseError(msg);
    }
    protected parseError(msg) {
        this.errors.push(this.lineNumber() + msg);
    }
    protected lineNumber(): string {
        return "line: " + this.tokenizer.lineNumber + ": ";
    }

}