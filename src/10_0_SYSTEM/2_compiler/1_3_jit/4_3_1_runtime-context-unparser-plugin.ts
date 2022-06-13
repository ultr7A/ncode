
import { ParseTreeAnalysis }  from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/4_0_0_meta.js"
import { Expression }         from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { NodeName } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum.js"
import { isAbstractDataType } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/1_ubiquitous-util.js"

import { IndexExpression, CallExpression, NewExpression } from "../../../03_0_Structure_🌴/1_ast_🧩/1_1_1_expression.js"
import { LetStatement, AssignmentStatement, IndexedAssignmentStatement, ExpressionStatement } from "../../../03_0_Structure_🌴/1_ast_🧩/1_2_1_statement.js"
import { StringLiteral, Identifier, ArrayLiteral, HashLiteral } from "../../../03_0_Structure_🌴/1_ast_🧩/1_3_1_literal.js"
import { Transpiler } from "../../3_un-parser/2_token.unparser/0_abstract-un-parser/abstract-un-parser.js"
import { UnParserPlugin } from "../../3_un-parser/2_token.unparser/0_abstract-un-parser/un-parser-plugin.js"


/**
 * Context plugin
 * provides access to ecs variables and functions from compiled js code
 */
export class JSECSContextPlugin extends UnParserPlugin {
    
    protected unparser: Transpiler;

    ecsNativeAPIs = {
        "args": { "io": true },
        "keyDown": { "io": true },
        "keyUp": { "io": true },
        "readLine": { "io": true },
        "clear": { "terminal": true },
        "getDimensions": { "terminal": true },
        "makeBuffer": { "gl": true },
        "shadeVertices": { "gl": true },
        "blit": { "gl": true },
        "rasterize": { "gl": true },
        "add": { "Vector": true },
        "sub": { "Vector": true },
        "cross": { "Vector": true },
        "multiply": { "Matrix": true }
    }

    ecsNativeObjects = {
        "gl": ["ASCII", "SHAPE", "Shaders", "SURFACE_TOPOLOGY", "BLEND_MODE", "RASTER_MODE"]
    }

    resolvedIdentifiers = {};
    updateExternalIdentifiers = {};
    dataTypesByIdent = {};
    builtinFunctionPolyfill = [];
    ecsNativeClasses = ["Matrix", "Vector", "Component", "Entity", "Image"];
    ecsNativeFunctions = {
        "print": true, "colorize": true, "Matrix": true, "Vector": true, "Component": true, "Entity": true, "Image": true
    }

    mutatorIdentifiers: string[];

    private callIndex: StringLiteral;
    private callBuiltinIndex: StringLiteral;
    private callMethodIndex: StringLiteral;
    private getBuiltinObjectIndex: StringLiteral;
    private getterIndex: StringLiteral;
    private setterIndex: StringLiteral;
    private isomorphicBuiltins: {
        [builtinClassName: string]: boolean;
    };

    nodeTransforms = {
        "Identifier": (node: Identifier): [Identifier, string, string] => {
            var nodeValue = node.Value;
            if (this.affectedIdentifiers[nodeValue] &&
                this.builtinFunctionPolyfill.indexOf(nodeValue) == -1 &&
                !this.resolvedIdentifiers[nodeValue] &&
                !this.isomorphicBuiltins[nodeValue]) {

                this.resolvedIdentifiers[node.Value] = true;
                return [node, this.unparser.unParse(this.routeExternalIdentThroughContext(node), { noPlugins: true }) + ";\n", ""];

            } else {
                return [node, "", ""];
            }
        },
        "LetStatement": (node: LetStatement, topScope?: boolean): [LetStatement, string, string] =>  {
            /**
             *  [node: Node, prependedCode: string, appendedCode: string]
             */
            var operations: [LetStatement, string, string] = [node, "", ""];
            if (topScope) {
                    // update external context to existence of this variable
                    operations[2] = operations[2] + this.unparser.unParse(this.routeAssignmentThroughContext(node.Identity), { noPlugins: true }) + "\n";
                
            }
            return operations;
        },
        "AssignmentStatement": (node: AssignmentStatement): [AssignmentStatement, string, string] => {
            /**
             *  [node: Node, prependedCode: string, appendedCode: string]
             */
            var operations: [AssignmentStatement, string, string] = [node, "", ""], identName = node.Subject.Value;
            // if an external identifier is assigned
            if (this.affectedIdentifiers[identName]) {

                // if it hasn't already been resolved
                if (!this.resolvedIdentifiers[identName]) {
                    // resolve it, before the rest of the program
                    this.resolvedIdentifiers[identName] = true;
                    operations[1] = this.unparser.unParse(this.routeExternalIdentThroughContext(node.Subject as Identifier), { noPlugins: true }) + ";\n";
                }
                if (!this.updateExternalIdentifiers[identName]) {
                    this.updateExternalIdentifiers[identName] = true;
                    // update the variable from the external context's point of view, at the end:
                    operations[2] = this.unparser.unParse(this.routeAssignmentThroughContext(node.Subject as Identifier), { noPlugins: true }) + ";\n";
                }

            }
            return operations;
        },
        "IndexExpression": (node: IndexExpression): [CallExpression, string, string] | [IndexExpression, string, string]  => {
            /**
            *  [node: Node, prependedCode: string, appendedCode: string]
            */
            let operations: [CallExpression, string, string] | [IndexExpression, string, string] = [node, "", ""];

            if (node.Left.NodeName === "Identifier") {

                let objName = (node.Left as Identifier).Value;

                if (node.Right.NodeName === "Identifier") {
                    let identName = (node.Right as Identifier).Value;
                    let nativeObjects = this.ecsNativeObjects[objName];

                    if (nativeObjects) {
                        if (nativeObjects.indexOf(identName) > -1) {
                            return this.routeBuiltinObjectFieldThroughContext(objName, identName, node);
                        }
                    }
                }

            }

            return operations;
        },
        "IndexAssignmentExpression": (node: IndexedAssignmentStatement): [IndexedAssignmentStatement, string, string] => {
            /**
             *  [node: Node, prependedCode: string, appendedCode: string]
             */
            var operations: [IndexedAssignmentStatement, string, string] = [node, "", ""];
            if (node.Subject.NodeName === "Identifier") {

                var identName = (node.Subject as Identifier).Value;
                // if an external identifier is assigned
                if (this.affectedIdentifiers[identName]) {
                    // just in case the variable being assigned hasn't been imported into js yet
                    if (!this.resolvedIdentifiers[identName]) {

                        this.resolvedIdentifiers[identName] = true;
                        operations[1] = this.unparser.unParse(// import variable
                            this.routeExternalIdentThroughContext(node.Subject as Identifier), { noPlugins: true }
                        ) + ";\n";

                    }
                    // and it has not been exported to the ecs runtime yet 
                    // update external variable:
                    operations[2] = this.updateExternalObject((node as IndexedAssignmentStatement).Subject as Identifier, identName, operations[2]);
                }

            }
            return operations;
        },
        "CallExpression": (node: CallExpression): [CallExpression, string, string] => {
            const isIdent = node.Function.NodeName === "Identifier";
            let identName;

            if (isIdent) {
                
                identName = (node.Function as Identifier).Value;

                if (this.ecsNativeFunctions[identName]) {
                    return this.routeBuiltinThroughContext(identName, node);
                }
                if (this.mutatorIdentifiers.indexOf(identName) > -1) { // Beware of mutants
                    return [node, "", this.updateExternalObject(node.Values[0] as Identifier, identName, "")];
                } 

            } else if (node.Function.NodeName === "IndexExpression") {
                if ((node.Function as IndexExpression).Right.NodeName === "Identifier") {

                    identName = ((node.Function as IndexExpression).Right as Identifier).Value;
                    var leftIsIdent = (node.Function as IndexExpression).Left.NodeName === "Identifier";
                    // TODO: handle nested static built in methods
                    // if (!indexIsIdent && (node. Function as IndexExpression).Left.NodeName === "IndexExpression") {
                    // } else {
                    // }
                    var objName = leftIsIdent
                        ? ((node.Function as IndexExpression).Left as Identifier).Value
                        : null;
                    var nativeAPI = this.ecsNativeAPIs[identName];

                    if (nativeAPI && nativeAPI[objName]) { // make sure this is a call to the correct object
                        return this.routeBuiltinMethodThroughContext(objName, identName, node);
                    }
                    // figure out if the method calls need to be routed through runtime context by checking the class name
                    var outerType = this.dataTypesByIdent[objName];

                    if (this.ecsNativeClasses.indexOf(outerType) > -1) {
                        return this.routeBuiltinMethodThroughContext(outerType, identName, node, ((node.Function as IndexExpression).Left as HashLiteral));
                    }

                } else {
                    return [node, "", ""];
                }
                
            } else if (node.Function.NodeName === "NewExpression") {

                if ((node.Function as NewExpression).Value.NodeName === NodeName.Identifier) {
                    identName = ((node.Function as NewExpression).Value as Identifier).Value;
                    
                    var externalNewable = this.affectedIdentifiers[identName] && isAbstractDataType(this.dataTypesByIdent[identName]);

                    if (this.ecsNativeFunctions[identName] || externalNewable) {
                        return this.routeBuiltinThroughContext(identName, node);
                    }
                }
                
            }
            // handle external functions
            if (isIdent && this.affectedIdentifiers[identName] &&
                this.builtinFunctionPolyfill.indexOf(identName) == -1 &&
                !this.ecsNativeFunctions[identName] &&
                !this.isomorphicBuiltins[identName]) {
                return [this.routeCallExpressionThroughContext(node), "", ""];

            } else {
                return [node, "", ""];
            }
        },
        "ExpressionStatement": (node: ExpressionStatement) => {

            if (node.Operand) {

                var transformPlugin = this.nodeTransforms[node.Operand.NodeName];

                if (transformPlugin) {
                    return transformPlugin(node.Operand);
                }

            }
            return [node, "", ""];

        }
    };

    public setParserAnalysis(analysis: ParseTreeAnalysis, builtinFunctionPolyfill) {
        this.affectedIdentifiers = analysis.undeclaredVariables || {};
        this.dataTypesByIdent = analysis.declaredVariables || {};
        this.affectedIdentifiers["print"] = null;
        this.builtinFunctionPolyfill = builtinFunctionPolyfill;
        this.resolvedIdentifiers = { "this": true };
        this.updateExternalIdentifiers = { "this": true };
        return this;
    }

    public setUnParser(unparser) {
        this.unparser = unparser;
        this.callIndex = unparser.callIndex;
        this.callBuiltinIndex = unparser.callBuiltinIndex;
        this.callMethodIndex = unparser.callMethodIndex;
        this.getBuiltinObjectIndex = unparser.getBuiltinObjectIndex;
        this.getterIndex = unparser.getterIndex;
        this.setterIndex = unparser.setterIndex;
        this.isomorphicBuiltins = unparser.isomorphicBuiltins;
        this.mutatorIdentifiers = unparser.mutantFunctions;
    }

    public updateExternalObject(ident: Identifier, identName: string, appendOperation) {
        if (!this.updateExternalIdentifiers[identName]) {
            this.updateExternalIdentifiers[identName] = true; // mark it as updated     
            // update the variable from the external context's point of view, at the end:
            return this.unparser.unParse(this.routeAssignmentThroughContext(ident), { noPlugins: true }) + ";\n";
        }
        return appendOperation;
    }

    public routeBuiltinThroughContext(identName: string, node): [CallExpression, string, string] {
        return [this.unparser.routeThroughContext(this.callBuiltinIndex, [
                new StringLiteral(identName),
                new ArrayLiteral(node.Arguments)
            ]), "", ""];
    }

    public routeBuiltinMethodThroughContext(className: string, methodName: string, node: CallExpression, instance?: HashLiteral): [CallExpression, string, string] {
        const contextArgs: Expression[] = [
            new StringLiteral(className),
            new StringLiteral(methodName),
            new ArrayLiteral(node.Values)
        ];
        if (instance) {
            contextArgs.push(instance);
        }
        return [this.unparser.routeThroughContext(this.callMethodIndex, contextArgs), "", ""];
    }

    public routeBuiltinObjectFieldThroughContext(objName: string, fieldName: string, node): [CallExpression, string, string] {
        var contextArgs = [
            new StringLiteral(objName),
            new StringLiteral(fieldName),
        ];
        return [this.unparser.routeThroughContext(this.getBuiltinObjectIndex, contextArgs), "", ""];
    }

    public routeExternalIdentThroughContext(node: Identifier) {
        return new LetStatement(
            "any",
            node, 
            this.unparser.routeThroughContext(this.getterIndex, [new StringLiteral(node.Value)])
        );
    }

    public routeAssignmentThroughContext(name: Identifier) {
        return this.unparser.routeThroughContext(this.setterIndex, [
            new StringLiteral(name.Value),
            name
        ]);
    }

    public routeCallExpressionThroughContext(node: CallExpression) {
        return this.unparser.routeThroughContext(this.callIndex, [node.Function, new ArrayLiteral(node.Values)]);
    }

}
