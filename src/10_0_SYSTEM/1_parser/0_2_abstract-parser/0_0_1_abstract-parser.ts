import { ParseTreeAnalysis }                          from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/4_0_0_meta.js"
import { Operator }                                   from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/0_operation-types_🔍/1_primitive-operators.js"
import { Node, Expression, Statement, FunctionNode }  from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { sprintf }           from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/1_ubiquitous-util.js"

import { AbstractToken } from "../../../01_1_ELEMENT/1_token_💧/0_1_token-structure.js"
import { Token } from "../../../01_1_ELEMENT/1_token_💧/2_1_token.js"
import { CodeCoordinates, CodeData } from "../../../01_2_Sequence_📘🌊/0_source/source-code.js"
import { Program } from "../../../03_0_Structure_🌴/1_ast/1_0_1_root.js"

import { AbstractTokenizer, ITokenizer } from "../../0_tokenizer/0_1_tokenizer-core/0_2_abstract-tokenizer.js"
import { ExpressionAnalysisDiagnosticContext } from "../../2_compiler/0_3_analyzer/0_1_analyzer-structure.js"
import { AbstractAnalyzer } from "../../2_compiler/0_3_analyzer/0_3_abstract-analyzer.js"
import { Analyzer } from "../../2_compiler/0_3_analyzer/1_3_expression-analyzer.js"
import { IPrecedences } from "../0_0_parser-core/0_1_precedence-structure.js"
import { Precedence } from "../0_0_parser-core/2_1_precedence.js"
import { InfixParseFn, PrefixParseFn } from "../0_0_parser-core/3_0_parse-functions.js"
import { ExpressionParserOne } from "../1_2_parser.implementation/1_1D/1_1_expression-parser.one.js"
import { ExpressionParserTwo } from "../1_2_parser.implementation/2_2D/1_1_expression-parser.two.js"
import { ExpressionParserThree } from "../1_2_parser.implementation/4_3D/1_1_expression-parser.three.js"



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

    protected subClass: ExpressionParserOne | ExpressionParserTwo | ExpressionParserThree;

    protected currentToken:  TokenObject;
    protected peekToken: TokenObject;
    protected errors = [] as string[];

    abstract prefixParseFns: Partial<{ [key in Token]: PrefixParseFn<ExpressionNodeType, OutputNodeType> }>;
    abstract infixParseFns:  Partial<{ [key in Token]:  InfixParseFn<ExpressionNodeType, OutputNodeType> }>;
                
    abstract doParseProgram(statements: Statement[], program: Program): void;
    abstract setCurrentToken(token);
    abstract setPeekToken(token);

    diagnosticContext: ParseTreeAnalysis;



    constructor(
            protected tokenizer:  AbstractTokenizer<CodeData,TokenObject>, // & ITokenizer<CodeCoordinates, CodeData>, 
            protected precedence: IPrecedences,
    ) {
        this.precedence = precedence;
        this.reset();
    }

    public setSubClass(parser: any) {
        this.subClass = parser;
    }

    public reset(): void {
        this.errors = [];
        this.currentToken = this.setCurrentToken(null);
        this.peekToken = this.setPeekToken(null);
        this.resetDiagnosticContext();
    }



    public parse() {
        console.log("AbstractParser :: parse()")
        this.reset();
        // this.nextToken();
        // this.nextToken();
    }


    public parseProgram() {
        console.log("AbstractParser :: parseProgram()")
        var Statements = [], program = new Program(Statements);
        
        this.peekToken = null; // this.tokenizer.peekToken;)
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
    public peekTokenIs(t: Token): boolean {
        return this.peekToken.Type == t;
    }
    /** Idea:
     * 
     * What if there were channels, or  'class selectors',
     *         instead of access modifiers.. ?
     */
    public currentTokenIs (t: Token): boolean {
        return this.currentToken.Type == t;
    }
    protected currentTokenIsAnyOf(t: string[]): boolean {
        return t.includes(this.currentToken.Type);
    }
    //      Traversing tokens:
    public nextToken(times = 1): void {
        for (let next = 0; next < times; next++) {
            
            while (this.peekToken == null) {
                console.log("try reading peekToken");
                this.peekToken = this.setPeekToken(this.tokenizer.NextToken());
 
                console.log("AbstractParser::peekToken is "+this.peekToken);
            }

            this.currentToken  = this.setCurrentToken(this.peekToken);
            this.peekToken = this.setPeekToken(this.tokenizer.NextToken()) // as unknown as TokenObject; // TODO: why isn't this statically compatible?
        
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
        const p = this.precedence[this.currentToken.Type];

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
        this.prefixParseFns[tokenType] = fn.bind(this.subClass);
    }

    protected registerInfix(tokenType: string, fn: InfixParseFn<ExpressionNodeType, OutputNodeType>) {
        this.infixParseFns[tokenType] = fn.bind(this.subClass);
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