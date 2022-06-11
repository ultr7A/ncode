
import { Node, Expression, Statement }  from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { NodeName }                     from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum.js"
import { UnParser }                     from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/system/un-parser.js"
import { ParseTreeAnalysis }            from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/4_0_0_meta.js"

import { Environment }                  from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js"


import { CallExpression, IndexExpression } from "../../../../03_0_Structure_🌴/1_ast_🧩/1_1_1_expression.js"
import { Identifier, StringLiteral }       from "../../../../03_0_Structure_🌴/1_ast_🧩/1_3_1_literal.js"

import { UnParserPlugin }                  from "./un-parser-plugin.js"



export const UNPARSER_TYPES: string[] = ["js", "ts", "c", "go", "rust", "java"]; //TODO: deprecate this list


export class Transpiler implements UnParser {
    protected env?: Environment;
    protected analysis?: ParseTreeAnalysis;
    protected endOfStatementDelimiter: string;
    protected plugin?: UnParserPlugin;
    protected config: {
        noPlugins?: boolean;
    };
    protected delta:    Partial<{                 // TODO: Type safety on `node`
                            [nodeName in NodeName]: (node: any, ctx?: Transpiler) => string 
                        }>;
    
    protected typeToTypeMapping: {
        [typeName: string]: string;
    };
    protected literalToTypeMapping: {
        [literalNodeName: string]: string;
    };
    isomorphicBuiltins: {
        [builtinClassName: string]: boolean;
    };
    protected builtinFunctionPolyfill: {
        [identifierPattern: string]: string;
    };
    protected callExpressionPolyfill: {
        [identifierName: string]: (node: CallExpression) => Expression;
    };
    protected methodCallPolyfill: {
        [builtinObjIdentifier: string]: {
            [methodName: string]: (node: CallExpression) => Expression;
        };
    };
    protected procedureDivision?: {
        conditionalTransforms: {
            [functionName: string]: {
                preProcessorDirectives: string[];
                code: string;
            };
        };
    };

    protected injectedHeader: string;
    mutantFunctions: string[];
    injectedContextUpdate: string;
    protected onRunWithoutPlugins: Function;

    readonly callIndex: StringLiteral;
    readonly callBuiltinIndex: StringLiteral;
    readonly callMethodIndex: StringLiteral;
    readonly getBuiltinObjectIndex: StringLiteral;
    readonly getterIndex: StringLiteral;
    readonly setterIndex: StringLiteral;
    protected left: Identifier;

    constructor() {
        this.config = {};
        // like the procedure divison, except for external identifiers
        this.injectedHeader = "";
        this.injectedContextUpdate = "";
    
        this.callIndex = new StringLiteral("call");
        this.callBuiltinIndex = new StringLiteral("callBuiltin");
        this.callMethodIndex  = new StringLiteral("callMethod");
        this.getBuiltinObjectIndex = new StringLiteral("getBuiltinObject");
        this.getterIndex = new StringLiteral("getVar");
        this.setterIndex = new StringLiteral("setVar");
        this.left = new Identifier("ctx");
    }

    public transpile(node: Node, env?: Environment, analysis?: ParseTreeAnalysis, plugin?: UnParserPlugin, topScope?: boolean): string {
        if (node.NodeName === NodeName.Program) {
            this.env = env;
            this.analysis = analysis;
            this.injectedContextUpdate = "";
            this.injectedHeader = "";
            if (plugin) {
                plugin.setTranspiler(this);
                this.plugin = plugin;
            }
            else {
                this.onRunWithoutPlugins();
            }
        }

        if (!node) {
            console.log("Warning: Node is undefined");
            return "";
        }
        
        if (this.plugin && !this.config.noPlugins) {
            var transformPlugin = this.plugin.nodeTransforms[node.NodeName];
            if (transformPlugin) {
                var nodeAndHeader = transformPlugin(node, topScope);
                node = nodeAndHeader[0];
                this.injectedHeader += nodeAndHeader[1];
                this.injectedContextUpdate += (nodeAndHeader[2] ? nodeAndHeader[2] : "");
            }
        }

        if (node.NodeName === NodeName.Identifier) {
            (node as Identifier).Value = this.replaceBuiltinIdentifiers((node as Identifier).Value);
        }
        if (node.NodeName === NodeName.CallExpression) {
            node = this.transpileCallExpression(node as CallExpression);
        }

        const nodeTransform = this.delta[node.NodeName];
        if (nodeTransform) {
            return nodeTransform(node, this);
        }

        return node.UnParse(this);
    };

    public transpileBlock(statements: Statement[], topScope = false) {
        var result = "";

        for (let s = 0, l = statements.length; s < l; s++) {
            var stmt = statements[s];
            result += this.transpile(stmt, null, null, null, topScope) + this.endOfStatementDelimiter;
        }

        return result;
    }

    public unParse(node: Node, config?: { noPlugins?: boolean; }): string {
        if (config && config.noPlugins) {
            var out = void 0;
            this.config.noPlugins = true;
            out = node.UnParse(this);
            this.config.noPlugins = false;
            return out;
        }

        return node.UnParse(this);
    }

    public getProgramHeader() {
        return this.injectedHeader ? this.injectedHeader : "";
    }

    public transpileCallExpression(node: CallExpression): CallExpression | IndexExpression {
        const callFunction = node.Function
            ? (node.Function)
            : null;
        
        // console.log("transpiled call expression ", node)
        if (!callFunction) {
            return node;
        }
        
        if (callFunction.NodeName == NodeName.Identifier) {
            let methodName = (callFunction as Identifier).Value;

            if (this.callExpressionPolyfill[methodName]) {
                return this.callExpressionPolyfill[methodName](node) as CallExpression | IndexExpression;

            } else if (node.Function.NodeName === NodeName.Identifier) {
                (node.Function as Identifier).Value
                    = this.replaceBuiltinIdentifiers((node.Function as Identifier).Value);
            }
        }

        if (callFunction.NodeName === NodeName.IndexExpression) {
            if ((callFunction as IndexExpression).Left.NodeName === NodeName.Identifier) {
                const polyfillAPI = this.methodCallPolyfill[((callFunction as IndexExpression).Left as Identifier).Value];

                if (polyfillAPI) {
                    if ((callFunction as IndexExpression).Right.NodeName == NodeName.Identifier) {
                        const  polyfillMethodTransformer = polyfillAPI[((callFunction as IndexExpression).Right as Identifier).Value];
                        
                        if (polyfillMethodTransformer) {
                            return polyfillMethodTransformer(node) as CallExpression;
                        }
                    }
                }
            }
        }

       
        return node;
    };

    public getBuiltinFunctionList() {
        return Object.keys(this.builtinFunctionPolyfill).concat(Object.keys(this.callExpressionPolyfill));
    };

    public routeThroughContext(indexIdent: Identifier, args: Expression[]) {
        const routed = new CallExpression(new IndexExpression(this.left, new StringLiteral(indexIdent.Value)), args);
        
        return routed;
    };

    public replaceBuiltinIdentifiers(identName: string) {
        const polyfill = this.builtinFunctionPolyfill[identName];

        if (polyfill) {
            return polyfill;
        }

        return identName;
    };

    public getTypeFromIdentifierName(identName: string): string {
        const declaredInProgram = this.analysis.declaredVariables[identName];
        
        if (declaredInProgram) {
            return declaredInProgram;
       
        } else {
            var preExistingIdentValue = this.env.get(identName);
            if (preExistingIdentValue) {
                return preExistingIdentValue.Type();
            }
        }

        return "any";
    };

    public inferTypeFromLiteral(node: Node) {
        const theType = this.literalToTypeMapping[node.NodeName];

        if (theType) {
            return theType;
        }
    };

    public getTypeFromECSType(typeName: string, defaultType = "any") {
        if (this.typeToTypeMapping[typeName]) {
            typeName = this.typeToTypeMapping[typeName];
        }

        return typeName || defaultType;
    };

    public firstArgumentToObjectTransform(node: CallExpression, callName: string): CallExpression {
        const indexExpr = new IndexExpression(node.Values[0], new StringLiteral(callName)),
              expr      = new CallExpression(indexExpr, [node.Values[1]]);

        return expr;
    }
}

