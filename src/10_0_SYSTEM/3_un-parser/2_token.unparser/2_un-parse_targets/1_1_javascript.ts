import { ObjectType } from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/object/object-type.enum";
import { NodeName } from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum";
import { CallExpression, IndexExpression, NewExpression } from "../../../../03_0_Structure_🌴/1_ast/1_1_1_expression";
import { ClassStatement, ExpressionStatement, ForStatement, IfStatement, LetStatement, SleepStatement, WhileStatement } from "../../../../03_0_Structure_🌴/1_ast/1_2_1_statement";
import { ArrayLiteral, FunctionLiteral, HashLiteral, Identifier, IntegerLiteral, PureFunctionLiteral, StringLiteral } from "../../../../03_0_Structure_🌴/1_ast/1_3_1_literal";
import { Transpiler } from "../0_abstract-un-parser/abstract-un-parser";

/**
 * Wrapt.org to Javascript Un-parse--r
 */

export class JSTranspiler extends Transpiler {

    public mutantFunctions = ["push", "pop", "splice"];        
    public  isomorphicBuiltins = {
        "Math": true,
        "RegExp": true
    };
        
    protected onRunWithoutPlugins = function () {
        this.injectedHeader += "var print=console.log;";
        this.methodCallPolyfill.terminal.clear = function (node) { return JSTerminalClear(node); };
        this.methodCallPolyfill.terminal.getDimensions = function (node) { return JSGetTerminalSize(); };
    }
    protected builtinFunctionPolyfill = {
        "time": "Date.now",
    }
    protected methodCallPolyfill = {
        "terminal": {
            clear: null,
            getDimensions: null,
            beep: function (node) {
                return node;
            }
        }
    }
    protected callExpressionPolyfill = {
        "push": function (node: CallExpression): CallExpression {
            return this.firstArgumentToObjectTransform(node, "push");
        },
        "pop": function (node: CallExpression): CallExpression {
            return this.firstArgumentToObjectTransform(node, "pop");
        },
        "splice": function (node: CallExpression): CallExpression {
            return this.firstArgumentToObjectTransform(node, "splice");
        },
        "concat": function (node: CallExpression): CallExpression {
            return this.firstArgumentToObjectTransform(node, "concat");
        },
        "join": function (node: CallExpression): CallExpression {
            return this.firstArgumentToObjectTransform(node, "join");
        },
        "split": function (node: CallExpression): CallExpression {
            return this.firstArgumentToObjectTransform(node, "split");
        },
        "len": function (node: CallExpression): IndexExpression {
            return new IndexExpression(node.Values[0], new StringLiteral("length"));
        }
    };

    protected endOfStatementDelimiter = ";";

    protected literalToTypeMapping = {};
    protected typeToTypeMapping = {};

    protected delta = {
        NewExpression: (node: NewExpression): string => {
            if (node.Value.NodeName === NodeName.Identifier
                && this.getTypeFromIdentifierName((node.Value as Identifier).Value) == ObjectType.ARRAY) {
                return (node.Value as Identifier).Value + ".concat([])";
            }
            if (node.Value.NodeName === "ArrayLiteral") {
                return this.transpile(node.Value)  + ".concat([])";
            }

            return node.UnParse(this);
        },

        ArrayLiteral: (node: ArrayLiteral): string => {
            return "[" + node.Values.map(function (el) { return this.transpile(el); }).join(",") + "]";
        },

        HashLiteral: (node: HashLiteral): string => {
            var hashBody = "";
            var nPairs = node.Values.length;

            for (var p = 0; p < nPairs; p++) {
                var pair = node.Values[p];
                hashBody += '"' + pair.Left.Value + '": ' + this.transpile(pair.Right) + (p + 1 < nPairs ? "," : "");
            }
            return "{" + hashBody + "}";
        },

        FunctionLiteral: (node: FunctionLiteral): string => {
            var params = node.Values.map(function (param) { return this.transpile(param); }).join(",");
            var body = this.transpileBlock(node.Consequence.Values);
            return "function(" + params + "){" + body + "}";
        },

        PureFunctionLiteral: (node: PureFunctionLiteral): string => {
            var params = node.Values.map(function (param) { return this.transpile(param); }).join(",");
            var body = this.transpileBlock(node.Consequence.Values);
            return "function(" + params + "){" + body + "}";
        },

        ExpressionStatement: (node: ExpressionStatement): string => {
            return this.transpile(node.Operand);
        },

        LetStatement: (node: LetStatement): string => {
            return "let " + this.transpile(node.Identity) + " = " + this.transpile(node.Value) + ";\n";
        },

        ClassStatement: (node: ClassStatement): string => {
            var ecsConstructor = node.Value.Right.Values.find(pair => pair.Left.Value == node.Identity.Value)?.Right.Value; // [node.Name.Value] ? node.Value.Right[node.Name.Value] : null;
            var constructorArgs = ecsConstructor ? ecsConstructor.Values.map(function (param) { return this.unParse(param); }) : [];
            
            var className = node.Identity.Value;
            var proto = "var " + className + " = /** @class */ (function(){\n" +
                "function " + className + "(" + constructorArgs.join(",") + ") { \n"
                + this.transpileBlock(ecsConstructor.Consequence.Values) + "}\n";

            for (let methodIdx in node.Value.Right.Values) {
                const methodPair = node.Value.Right.Values[methodIdx];

                proto += node.Identity.Value + ".prototype." + methodPair.Left.Value + " = " + this.transpile(methodPair.Right.Value) + ";\n";
            }
            proto += "\nreturn " + className + "})()"; // TODO, inheritance via this call exp
            return proto;
        },

        IfStatement: (node: IfStatement): string => {
            return "if (" + this.transpile(node.Operand) + ") {" +
                this.transpileBlock(node.Consequence.Values) +
                "}" +
                (node.Alternative ?
                    (" else {"
                        + this.transpileBlock(node.Alternative.Values) +
                        "}")
                    : "");
        },

        ForStatement: (node: ForStatement): string => {
            var rangeNodeName = node.Operand.NodeName;
            var range, counter = this.transpile(node.Element), numericKeyType = true;
            if (rangeNodeName === "Identifier") {
                var rangeTypeFromIdent = this.getTypeFromIdentifierName((node.Operand as Identifier).Value);
                if (rangeTypeFromIdent === "int") {
                    range = (node.Operand as IntegerLiteral).Value;
                }
                else if (rangeTypeFromIdent === "array") {
                    range = this.transpile(node.Operand) + ".length";
                }
                else if (rangeTypeFromIdent === "object") {
                    numericKeyType = false;
                    range = this.transpile(node.Operand);
                }
                else {
                    range = this.transpile(node.Operand) + ".length";
                }
            } else if (rangeNodeName == "ArrayLiteral") {
                range = this.transpile(node.Operand) + ".length";
            } else if (rangeNodeName === "HashLiteral") {
                numericKeyType = false;
                range = this.transpile(node.Operand);
            } else if (rangeNodeName === "IntegerLiteral") {
                range = (node.Operand as IntegerLiteral).Value;
            } else {
                range = this.transpile(node.Operand) + ".length";
            }

            var theLoop = "";

            if (numericKeyType) {
                theLoop += "for(let " + counter + " = 0, length = "
                    + range + "; " + counter + " < length; " + counter + " ++)";

            } else {
                theLoop = "let " + counter + "_keys = Object.keys(" + range + "), " 
                                 + counter + "_n_keys = " + counter + "_keys.length;\n ";
                                 
                theLoop += "for(let " + counter + "_idx = 0; " + counter + "_idx < " + counter + "_n_keys; " + counter + "_idx ++)";
           
            }

            theLoop += "{ \n";
            
            if (!numericKeyType) {
                theLoop += "let " + counter + ' = ' + counter + '_keys[' + counter + '_idx]; \n';
            }

            theLoop += this.transpileBlock(node.Consequence.Values)
            
            + " }";
            return theLoop;
        },

        WhileStatement: (node: WhileStatement): string => {
            return "while(" + this.transpile(node.Operand) + ") { "
                + this.transpileBlock(node.Consequence.Values)
                + " }";
        },

        SleepStatement: (node: SleepStatement): string => {
            var consequence = new FunctionLiteral("void", [], [], node.Consequence);
            return "setTimeout(" + this.transpile(consequence) + "," + this.transpile(node.Operand) + ");";
        }

        // TODO: add support for Statement types added during reincarnation 
    };

    constructor() {
        super();
    }
}


var IDENT_JS_CONSOLE = new Identifier("console");
function JSTerminalClear(node) {
    // terminal.clear() // console.clear();
    node.Function.Left = IDENT_JS_CONSOLE;
    return node;
}

function JSGetTerminalSize() {
    return new ArrayLiteral([
        new IndexExpression(
            new IndexExpression(
                new Identifier("process"), 
                new StringLiteral("stdout")
            ), 
            new StringLiteral("columns")
        ),
        new IndexExpression(
            new IndexExpression(
                new Identifier("process"), 
                new StringLiteral("stdout")
            ), 
            new StringLiteral("rows")
        ),
    ]);
}

