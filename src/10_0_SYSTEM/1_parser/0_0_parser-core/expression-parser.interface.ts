import { Node, Statement, Expression, FunctionNode } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js";
import { GraphOperator }                       from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/syntax/1_1_0_expression-elements.js";

import { Token } from "../../../01_1_ELEMENT/1_token_💧/2_1_token.js";
import { ExpressionStatement, IfStatement, ForStatement, WhileStatement, SleepStatement, ExecStatement, AssignmentStatement, LetStatement, ClassStatement } 
                                from "../../../03_0_Structure_🌴/1_ast_🧩/1_2_1_statement.js";
import { GraphNode, GraphEdge } from "../../../03_0_Structure_🌴/1_ast_🧩/1_3_0_literal-elements.js";
import { Identifier, BooleanLiteral, IntegerLiteral, FloatLiteral, PureFunctionLiteral, GraphLiteral, HashLiteral, ClassLiteral, StringLiteral, ArrayLiteral } 
                                    from "../../../03_0_Structure_🌴/1_ast_🧩/1_3_1_literal.js";
import { MethodTransformReceiverProcedure, PropertyTransformReceiverExpression, PropertyTransformReceiverFunction, RuntimeTransformReceiverHandler, TransformReceiver } from "../../../03_0_Structure_🌴/1_ast_🧩/1_3_2_1_transform.receiver.js";
import { InspectionTransform } from "../../../03_0_Structure_🌴/1_ast_🧩/1_3_3_1_inspection.transform.js";
import { InstanceTransform } from "../../../03_0_Structure_🌴/1_ast_🧩/1_3_3_2_instance.transform.js";
import { ConceptReceiver }          from "../../../03_0_Structure_🌴/1_ast_🧩/2_4_1_concept.receiver.js";
import { ConceptProjection }        from "../../../03_0_Structure_🌴/1_ast_🧩/2_4_2_concept-projection";
import { ConceptProjectorSelector } from "../../../03_0_Structure_🌴/1_ast_🧩/2_4_3_concept-projector-selector.js";
import { ConceptTransformationExpressionAbstraction } from "../../../03_0_Structure_🌴/1_ast_🧩/2_4_5_concept-expression.abstraction.js";
import { ConceptTransformationStatementAbstraction } from "../../../03_0_Structure_🌴/1_ast_🧩/2_4_6-concept-statement.abstraction.js";


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
    
    parseReturnStatement(); 
    parseBlockStatement(isPureFunction: boolean);

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

    parseInstanceTransform(): InstanceTransform;
    parseInspectionTransform(): InspectionTransform;

    parseTransformReceiver():                   TransformReceiver;
    parsePropertyTransformReceiverExpression(): PropertyTransformReceiverExpression;
    parsePropertyTransformReceiverFunction():   PropertyTransformReceiverFunction;
    parseMethodTransformReceiverProcedure():    MethodTransformReceiverProcedure;
    parseRuntimeTransformReceiverHandler():     RuntimeTransformReceiverHandler;

    parseConceptReceiver():          ConceptReceiver;
    parseConceptProjection():        ConceptProjection;
    parseConceptProjectorSelector(): ConceptProjectorSelector;

    parseConceptTransformationExpressionAbstraction(): ConceptTransformationExpressionAbstraction;
    parseConceptTransformationStatementAbstraction(): ConceptTransformationStatementAbstraction;
}