import { ConceptSequenceOperator } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/0_operation-types_🔍/2_concept-operators.js"
import { Node, ConceptExpression, InfixStructure, Structure, ConceptStructure, Value, IGraphNode } 
                            from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { ConceptOperator }  from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/syntax/1_1_0_expression-elements.js"

import { Token, TypedTokenLiteral } from "../../../../01_1_ELEMENT/1_token_💧/2_1_token.js"
import { PrefixConceptExpression } from "../../../../03_0_Structure_🌴/1_ast/1_1_1_expression.js"
import { ConceptStatement } from "../../../../03_0_Structure_🌴/1_ast/1_2_1_statement.js"
import { GraphEdge, GraphNode } from "../../../../03_0_Structure_🌴/1_ast/1_3_0_literal-elements.js"
import { ArrayLiteral, ConceptGraphLiteral, ConceptSequenceLiteral, Identifier, StringLiteral } from "../../../../03_0_Structure_🌴/1_ast/1_3_1_literal.js"
import { Orientation_X } from "../../../0_0_system-structure/1_0_system-structure.js"
import { TokenizerOne } from "../../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one.js"
import { Analyzer } from "../../../2_compiler/0_3_analyzer/1_3_expression-analyzer.js"
import { ConceptAnalyzer } from "../../../2_compiler/0_3_analyzer/2_3_concept-analyzer.js"

import { Precedence }                   from "../../0_0_parser-core/2_1_precedence.js"
import { conceptPrecedences }           from "../../0_0_parser-core/2_2_concept-precedence.js"
import { InfixParseFn, PrefixParseFn }  from "../../0_0_parser-core/3_0_parse-functions.js"

import { AbstractParser } from "../../0_2_abstract-parser/0_0_1_abstract-parser.js"
import { GraphParserOne } from "./0_2_4_graph-parser.one.js"

/**
 * 
 */
export class ConceptParserOne extends AbstractParser<TypedTokenLiteral, Node, ConceptExpression, ConceptOperator, ConceptAnalyzer> {
    
    public analyzer:    ConceptAnalyzer;
    public graphParser: GraphParserOne  <ConceptOperator, ConceptExpression>;

    public curToken:  TypedTokenLiteral;
    public peekToken: TypedTokenLiteral;

    public prefixParseFns = {} as Partial<{ [prefixToken in Token]: PrefixParseFn<ConceptExpression, Node> }>;
    public infixParseFns  = {} as Partial<{ [infixToken  in Token]:  InfixParseFn<ConceptExpression, Node> }>;


    constructor(l: TokenizerOne) {
        super(l, conceptPrecedences);
        this.analyzer = new Analyzer();

        // Init GraphParser:
        this.graphParser = new GraphParserOne<ConceptOperator, ConceptExpression, IGraphNode<StringLiteral, any>>(
            this.nextToken,
            this.curTokenIs,
            this.parseConceptGraphLiteralNode,
            this.parseConceptGraphLiteralEdge
        );

        // Concept Structures:

        // Concept Sequences, Operators and Graphs:
        this.registerPrefix(Token.LBRACKET, this.parseConceptSequenceLiteral);
        this.registerPrefix(Token.LPAREN,   this.parseConceptOperator       );
        this.registerPrefix(Token.LBRACE,   this.parseConceptGraphLiteral   );

        

    }

    // TODO: revisit this: // 
    public parseConceptStatement() {
        var stmt = new ConceptStatement(null, null);
        if (!this.expectPeek(Token.IDENT)) {
            return null;
        }

        stmt.Identity = new Identifier(this.curToken.Literal);
        // TODO: Analyzer should always be handling this:
        this.diagnosticContext.declaredVariables[stmt.Identity.Value] = stmt.Identity.Value;
        this.nextToken();
        stmt.Value = this.parseConceptExpression(Precedence.LOWEST);
        if (this.peekTokenIs(Token.SEMICOLON)) {
            this.nextToken();
        }
        return stmt;
    }


    /**
     * parseConceptExpression
     */
     public parseConceptExpression(precedence: number): ConceptExpression {
        if (this.curTokenIs(Token.POUND_LBRACE)) {
            return this.parseConceptGraphLiteral();

        } else if (this.curTokenIs(Token.POUND_LBRACKET)) {
            return this.parseConceptSequenceLiteral();

        } else {
            return this.parseConceptStructure(precedence);
        }
    }

    /**
     * parseConceptStructure
     */
     private parseConceptStructure(precedence: number): ConceptStructure {
        let curTokenType = this.curToken.Type;
        let prefix = this.prefixParseFns[curTokenType], 
            leftExp: Node;

        leftExp = prefix && prefix();
        
        while (!this.peekTokenIs(Token.SEMICOLON) && precedence < this.peekPrecedence()) {
            let infix = this.infixParseFns[this.peekToken.Type];

            if (!infix) {
                if (!leftExp) {
                    this.noPrefixParseFnError(curTokenType);
                    return null;
                }
                return leftExp as Structure<ConceptOperator, ConceptExpression>;
            }
            this.nextToken();
            leftExp = infix(leftExp as InfixStructure<ConceptOperator,  ConceptExpression>);
        }

        return leftExp as InfixStructure<ConceptOperator, ConceptExpression>;
    }

    private getConceptPrecedence(exp: ConceptExpression): number {
        if (exp.NodeName === "PrefixConceptExpression" || exp.NodeName === "InfixConceptExpression") {
            return (exp as PrefixConceptExpression).Operator.Precedence;

        } else if (exp.NodeName === "ConceptGraph") {
            //TODO: ...how is outer layer defined?


        } else { // Identifier
            const builtinOperatorPrecedence = conceptPrecedences[(exp as Identifier).Value];

            return builtinOperatorPrecedence !== null 
                                                ? builtinOperatorPrecedence 
                                                : null //TODO:  getConceptPrecedence for Identifier
        }
    }

    private parseConceptSequenceLiteral(): ConceptSequenceLiteral {
        const conceptElements = [] as ConceptExpression[];

        this.nextToken();

        while (!this.curTokenIs(Token.RBRACKET_POUND) && !this.curTokenIs(Token.EOF)) {
            conceptElements.push(this.parseConceptExpression(Precedence.LOWEST));
        }

        return new ConceptSequenceLiteral(conceptElements);
    }

    private parseConceptOperator(): ConceptOperator {
        const exp = this.parseConceptExpression(0);

        return new ConceptOperator(exp, this.getConceptPrecedence(exp))
    }

    

    /***
      **     #{ [ [a ConceptSequence] (for) [a Node] ]---(for)---{ Example } }#
       * 
       */
    private parseConceptGraphLiteral(): ConceptGraphLiteral {
        const edges = [] as GraphEdge<ConceptOperator, ConceptExpression, StringLiteral>[],
              nodes = [] as GraphNode<StringLiteral, ConceptExpression>[];
        
        this.graphParser.parseGraph(nodes, edges, "ConceptGraphLiteral");

        return new ConceptGraphLiteral(new ArrayLiteral(edges), new ArrayLiteral(nodes));
    }




    private parseConceptGraphLiteralEdge(
        direction: Orientation_X, 
        edges:     GraphEdge<ConceptOperator, ConceptExpression>[]
    ): GraphEdge<ConceptOperator, ConceptExpression> {

        let operatorExpression: ConceptExpression;
        let operator: ConceptOperator;
        //                        ---#( )#--->
        if (this.curTokenIs(Token.POUND_LPAREN)) {
            this.nextToken();

            operatorExpression = this.parseConceptExpression(0);

            this.nextToken(2);
            this.graphParser.parseDirectionalGraphEdge(direction);
        } else {
            operatorExpression = new Identifier(ConceptSequenceOperator.PROJECT);
            operator = new ConceptOperator(operatorExpression, 0); 
        }

        const edge = new GraphEdge<ConceptOperator, ConceptExpression>(operator, null);

        edges.push(edge);
        return edge;
    }

    
    private parseConceptGraphLiteralNode(nodes: GraphNode<StringLiteral, ConceptExpression>[]): IGraphNode<any, any> {
        const exp = this.parseConceptExpression(Precedence.LOWEST);  
        const nodeId = exp.NodeName + " " + (exp as Value).Value;
        const graphNode = new GraphNode<StringLiteral, ConceptExpression>(new StringLiteral(nodeId), exp);

        nodes.push(graphNode);

        return graphNode;
    }

    public doParseProgram(): void {
        console.log("TODO: implement")
    }
}