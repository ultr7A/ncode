
                            
// If you can't see the [Forrest] for the [{Tree}(s)]', then obsessively line everything up into grids.
import { ParseTreeAnalysis }                   from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/4_0_0_meta";
import { DataType } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/primitive/type.enum";
import { Node, Expression, FunctionNode, Statement } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { NodeName } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum";

import { Program, BlockStatement } from "../../../03_0_Structure_🌴/1_ast/1_0_1_root";
import { InfixExpression, PrefixExpression, CallExpression, IndexExpression } from "../../../03_0_Structure_🌴/1_ast/1_1_1_expression";
import { ExpressionStatement, LetStatement, AssignmentStatement, ForStatement, WhileStatement, IndexedAssignmentStatement, ReturnStatement } from "../../../03_0_Structure_🌴/1_ast/1_2_1_statement";
import { Identifier, FunctionLiteral } from "../../../03_0_Structure_🌴/1_ast/1_3_1_literal";
import { getDataTypeByNodeName } from "../../../03_0_Structure_🌴/1_ast/3_util_⚙/ast-util";
import { ExpressionAnalysisDiagnosticContext } from "./0_1_analyzer-structure";
import { AbstractAnalyzer } from "./0_3_abstract-analyzer";


/**
 * Analyzer creates a ParseTreeAnalysis from
 * a pre-parsed Program AST node, much like the parser would.
 *
 * The use-case is that a program may already be parsed either from:
 * - compiling hot functions,
 * - or importing a Program from an AST editor.
 */
export class Analyzer extends AbstractAnalyzer<Expression, ParseTreeAnalysis, ExpressionAnalysisDiagnosticContext> {
    
    constructor () { super(ExpressionAnalysisDiagnosticContext); }

    public analyzeParseTree(program: Program) {
        return this.analyzeNode(program, this.initAnalysis());
    }

    public analyzeNode(node: Node, analysis: ParseTreeAnalysis) {
        var isLoop = this.isLoop(node);
        analysis.hasLoops = analysis.hasLoops || isLoop;
        switch (node.NodeName) {
            case "Program":
            case "BlockStatement":
                this.analyzeBlockStatement(node as BlockStatement, analysis);
                break;
            case "ExpressionStatement":
                this.analyzeNode((node as ExpressionStatement).Operand, analysis);
                break;
            case "InfixExpression":
                this.analyzeNode((node as InfixExpression).Left,   analysis);
                this.analyzeNode((node as InfixExpression).Right,  analysis);
                break;
            case "PrefixExpression":
                this.analyzeNode((node as PrefixExpression).Right, analysis);
                break;
            case "CallExpression":
                this.analyzeCallExpression(node as CallExpression, analysis);
            case "Identifier":
                this.analyzeExternalVars(node   as Identifier,     analysis);
                break;
            case "LetStatement":
                this.analyzeLetStatement(node   as LetStatement,   analysis);
                break;
            case "AssignmentStatement":
                this.analyzeNode((node as AssignmentStatement).Subject, analysis);
                this.analyzeNode((node as AssignmentStatement).Operand, analysis);
                break;
            case "Function":
            case "FunctionLiteral":
                this.analyzeFunction((node as FunctionNode), analysis);
                break;
            case "ForStatement":
                analysis.declaredVariables[(node as ForStatement).Element.Value] =
                    getDataTypeByNodeName((node as ForStatement).Operand) === DataType.HASH
                        ? "string"
                        : "int";

                this.analyzeNode((node as ForStatement).Operand,     analysis);
                this.analyzeNode((node as ForStatement).Consequence, analysis);

                break;
            case "WhileStatement":
                this.analyzeNode((node as WhileStatement).Operand,   analysis);
                this.analyzeNode((node as ForStatement).Consequence, analysis);
                break;
        }
        return analysis;
    };

    public analyzeReturnStatement(stmt: Statement, pure: boolean): [boolean, string[]] {
        let   hasReturnStatement = false;
        const errors             = [] as string[];
            // scenarios, : 
            /**
             * - call expression
             * - any expression containing this.... 
             * - needs to be a better way to detect this
             */
            // if (stmt.Token && stmt.Token.Literal == "this") {
            //     this.errors.push("use of this / object-context not allowed in pure functions");
            //     return null;

            // } else
        if (pure) {
            if ((stmt.NodeName == "IndexedAssignmentStatement")
                    && (stmt as IndexedAssignmentStatement).Subject.NodeName === "Identifier"
                    && ((stmt as IndexedAssignmentStatement).Subject as Identifier).Value === "this"
                ) {
                    errors.push("use of this / object-context not allowed in pure functions");
                    return null;

            }

            if (stmt.NodeName === "ReturnStatement") {
                // TODO: Move this block to Analyzer
                switch ((stmt as ReturnStatement).Operand.NodeName) {
                    case "InfixExpression":
                        //TODO: check if the return statement has side-effects
                        break;
                    case "IndexExpression":
                        //TODO: check if the return statement has side-effects
                        break;
                    case "IndexedAssignmentStatement":
                        //TODO: check if the return statement has side-effects
                        break;
                }
                hasReturnStatement = true;
            }
        }

        return [hasReturnStatement, errors];
    }

    private isLoop(node: Node): boolean {
       return node.NodeName === "ForStatement" || node.NodeName === "WhileStatement";
    };

    private analyzeCallExpression(node: CallExpression, analysis: ParseTreeAnalysis): void {
        for (var x = 0; x < node.Values.length; x++) {
            this.analyzeNode(node.Values[x], analysis);
        }

        if (node.Function.NodeName == "FunctionLiteral") {
            this.analyzeBlockStatement((node.Function as FunctionLiteral).Consequence, analysis);

        } else { 
            let funcIdent: string;

            if (node.Function.NodeName === "Identifier") {
                funcIdent = (node.Function as Identifier).Value;

            } else if (node.Function.NodeName === "IndexExpression") {
                const dataStructure = (node.Function as IndexExpression).Left;

                if (dataStructure.NodeName === "Identifier") {
                    funcIdent = (dataStructure as Identifier).Value;
                }
            }

            if (funcIdent && !analysis.declaredVariables[funcIdent]) {
                analysis.undeclaredVariables[funcIdent] = true;
            }
        }
    };

    private analyzeFunction(node: FunctionNode, analysis: ParseTreeAnalysis): void {
        const signature = node.ParameterTypes;

        for (var p = 0, params = node.Values, l = params.length; p < l; p++) {
            analysis.declaredVariables[params[p].Value] = signature[p] || "any";
        }
        this.analyzeBlockStatement(node.Consequence as BlockStatement, analysis);
    }

    private analyzeBlockStatement(node: BlockStatement, analysis: ParseTreeAnalysis): void {
        for (var s in node.Values) {
            this.analyzeNode(node.Values[s], analysis);
        }
    }

    private analyzeLetStatement(node: LetStatement, analysis: ParseTreeAnalysis): void {
            // TODO: Add unit test for edge-case where node has no dataType and getDataTypeByNodeName returns void;
            analysis.declaredVariables[node.Identity.Value] = node.DataType
                || getDataTypeByNodeName(node.Value) || "NULL";
    }

    private analyzeExternalVars(node: Identifier, analysis: ParseTreeAnalysis): void {
        if (!analysis.declaredVariables[node.Value]) {
            analysis.undeclaredVariables[node.Value] = true;
        }
    }
    
    public initAnalysis(): ParseTreeAnalysis {
        return {
            declaredVariables: {},
            undeclaredVariables: {},
            hasLoops: false,
            hasRecursion: false
        };
    }
    
}
