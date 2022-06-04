import { Node, Statement, Expression, FunctionNode } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js";
import { GraphOperator }                       from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/syntax/1_1_0_expression-elements";

import { Token } from "../../../01_1_ELEMENT/1_token_💧/2_1_token";
import { ExpressionStatement, IfStatement, ForStatement, WhileStatement, SleepStatement, ExecStatement, AssignmentStatement, LetStatement, ClassStatement } 
                                from "../../../03_0_Structure_🌴/1_ast/1_2_1_statement";
import { GraphNode, GraphEdge } from "../../../03_0_Structure_🌴/1_ast/1_3_0_literal-elements";
import { Identifier, BooleanLiteral, IntegerLiteral, FloatLiteral, PureFunctionLiteral, GraphLiteral, HashLiteral, ClassLiteral, StringLiteral, ArrayLiteral } 
                                from "../../../03_0_Structure_🌴/1_ast/1_3_1_literal";


export interface IExpressionParser {
    parseStatement():   Statement;
    parseExpression(precedence: number, declaration: boolean): Expression;
    parsePrefixExpression(): Node 
    parseInfixExpression(left: Expression): Node;
    
    parseExpressionStatement(): ExpressionStatement;
    parseIfStatement(): IfStatement;
    parseForStatement(): ForStatement; 
    parseWhileStatement(): WhileStatement; 
    parseSleepStatement(): SleepStatement; 
    parseExecStatement(): ExecStatement; 
    parseAssignmentStatement(): AssignmentStatement; 
    parseLetStatement(pure: boolean): LetStatement;
    parseClassStatement(): ClassStatement;                 
    
    parseIndexExpression(left: Expression): Node; 
    parseDotIndexExpression(left: Expression): Node; 
    
    parseReturnStatement() 
    parseBlockStatement(isPureFunction: boolean) 
    parseIdentifier(): Identifier 
    parseBoolean(): BooleanLiteral 
    parseIntegerLiteral(): IntegerLiteral 
    parseFloatLiteral(): FloatLiteral 
    parseFunctionLiteral(_, returnType, pure): FunctionNode 
    parsePureFunctionLiteral(_, returnType: string): PureFunctionLiteral 
    parseGraphLiteral(): GraphLiteral 
    parseGraphLiteralNode(nodes: GraphNode<Expression>[]): string 
    parseGraphLiteralEdge(direction: "left" | "right", edges: GraphEdge<GraphOperator>[]): GraphEdge<GraphOperator> 
    parseHashLiteral(): HashLiteral 
    parseClassLiteral(): ClassLiteral 
    parseFunctionParameters(): [Identifier[], string[]] 
    parseStringLiteral(): StringLiteral 
    parseArrayLiteral(): ArrayLiteral 
    parseExpressionList(end: Token, delimiter: unknown): Expression[] 
    parseCommentBlock(); 
    
    parseModifiers(): number[];
    
    isDataType(peek: boolean);
    isCustomDataType();
    parseDataType(peek: boolean);
}