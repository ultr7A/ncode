import { Node, Statement, Expression, FunctionNode } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { NodeName }                                  from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum.js";

import { AbstractToken } from "../../../01_1_ELEMENT/1_token_💧/0_1_token-structure.js"
import { Token }         from "../../../01_1_ELEMENT/1_token_💧/2_1_token.js"
import { Program }       from "../../../03_0_Structure_🌴/1_ast/1_0_1_root.js"
import { GraphOperator } from "../../../03_0_Structure_🌴/1_ast/1_1_0_expression-elements.js"
import { ExpressionStatement, IfStatement, ForStatement, WhileStatement, SleepStatement, ExecStatement, AssignmentStatement, LetStatement, ClassStatement } from "../../../03_0_Structure_🌴/1_ast/1_2_1_statement.js"
import { GraphNode, GraphEdge } from "../../../03_0_Structure_🌴/1_ast/1_3_0_literal-elements.js"
import { Identifier, BooleanLiteral, IntegerLiteral, FloatLiteral, PureFunctionLiteral, GraphLiteral, HashLiteral, ClassLiteral, StringLiteral, ArrayLiteral } from "../../../03_0_Structure_🌴/1_ast/1_3_1_literal.js"
import { AbstractParser } from "./0_0_1_abstract-parser.js"

export  abstract class AbstractExpressionParser
        <
            TokenObject extends AbstractToken
        >
        extends AbstractParser<TokenObject> {


    abstract parseStatement():   Statement;
    abstract parseExpression(precedence: number, declaration: boolean): Expression;
    abstract parsePrefixExpression(): Node 
    abstract parseInfixExpression(left: Expression): Node;

    abstract parseExpressionStatement(): ExpressionStatement;
    abstract parseIfStatement(): IfStatement;
    abstract parseForStatement(): ForStatement; 
    abstract parseWhileStatement(): WhileStatement; 
    abstract parseSleepStatement(): SleepStatement; 
    abstract parseExecStatement(): ExecStatement; 
    abstract parseAssignmentStatement(): AssignmentStatement; 
    abstract parseLetStatement(pure: boolean): LetStatement;
    abstract parseClassStatement(): ClassStatement;                 

    abstract parseIndexExpression(left: Expression): Node; 
    abstract parseDotIndexExpression(left: Expression): Node; 

    abstract parseReturnStatement() 
    abstract parseBlockStatement(isPureFunction: boolean) 
    abstract parseIdentifier(): Identifier 
    abstract parseBoolean(): BooleanLiteral 
    abstract parseIntegerLiteral(): IntegerLiteral 
    abstract parseFloatLiteral(): FloatLiteral 
    abstract parseFunctionLiteral(_, returnType, pure): FunctionNode 
    abstract parsePureFunctionLiteral(_, returnType: string): PureFunctionLiteral 
    abstract parseGraphLiteral(): GraphLiteral 
    abstract parseGraphLiteralNode(nodes: GraphNode<Expression>[]): string 
    abstract parseGraphLiteralEdge(direction: "left" | "right", edges: GraphEdge<GraphOperator>[]): GraphEdge<GraphOperator> 
    abstract parseHashLiteral(): HashLiteral 
    abstract parseClassLiteral(): ClassLiteral 
    abstract parseFunctionParameters(): [Identifier[], string[]] 
    abstract parseStringLiteral(): StringLiteral 
    abstract parseArrayLiteral(): ArrayLiteral 
    abstract parseExpressionList(end: Token, delimiter: unknown): Expression[] 
    abstract parseCommentBlock(); 

    abstract parseModifiers(): number[];

    abstract isDataType(peek: boolean);
    abstract isCustomDataType();
    abstract parseDataType(peek: boolean);

    public parseProgram(): Program {
        this.reset();

        var Statements = [] as Statement[], 
            program = new Program(Statements);

        this.nextToken();
        while (!this.curTokenIs(Token.EOF)) {
            var stmt = this.parseStatement();
            if (stmt != null) {
                if (stmt.NodeName ==  NodeName.ExpressionStatement) {
                    if ((stmt as ExpressionStatement).Operand == null) {
                        continue;
                    }
                }
                program.Values.push(stmt);
            }
            this.nextToken();
        }
        // console.log(JSON.stringify(this.diagnosticContext, null, 2));
        // console.log(JSON.stringify(program, null, 2));
        return program;
    }

}