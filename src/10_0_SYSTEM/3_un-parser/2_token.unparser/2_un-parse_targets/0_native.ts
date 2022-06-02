import { Node } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { NewExpression } from "../../../../03_0_Structure_🌴/1_ast/1_1_1_expression.js"
import { ClassStatement, ExpressionStatement, ForStatement, IfStatement, LetStatement, SleepStatement, WhileStatement } from "../../../../03_0_Structure_🌴/1_ast/1_2_1_statement.js"
import { ArrayLiteral, FunctionLiteral, HashLiteral, PureFunctionLiteral } from "../../../../03_0_Structure_🌴/1_ast/1_3_1_literal.js"
import { Transpiler } from "../0_abstract-un-parser/abstract-un-parser.js"

export class NativeTranspiler extends Transpiler {

    
    protected endOfStatementDelimiter = ";";

    protected delta = {
        NewExpression: (node: NewExpression): string => {
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
            return "fn(" + params + "){" + body + "}";
        },

        PureFunctionLiteral: (node: PureFunctionLiteral): string => {
            var params = node.Values.map(function (param) { return this.transpile(param); }).join(",");
            var body = this.transpileBlock(node.Consequence.Values);
            return "pure fn(" + params + "){" + body + "}";
        },

        ExpressionStatement: (node: ExpressionStatement): string => {
            return this.transpile(node.Operand);
        },

        LetStatement: (node: LetStatement): string => {
            return node.DataType + " " + this.transpile(node.Identity) + " = " + this.transpile(node.Value) + ";\n";
        },

        ClassStatement: (node: ClassStatement): string => {
            var ecsConstructor = node.Value.Right.Values.find(pair => pair.Left.Value == node.Identity.Value)?.Right.Value; // [node.Name.Value] ? node.Value.Right[node.Name.Value] : null;
            var constructorArgs = ecsConstructor ? ecsConstructor.Values.map(function (param) { return this.unParse(param); }) : [];
            
            var className = node.Identity.Value;
            var proto = "class " + className + " {\n" +
                "public " + className + "(" + constructorArgs.join(",") + ") { \n"
                + this.transpileBlock(ecsConstructor.Consequence.Values) + "}\n";

            for (let methodIdx in node.Value.Left.Values) {
                const attributePair = node.Value.Left.Values[methodIdx];
    
                proto += attributePair.Right.Modifiers + " " + attributePair.Left.Value + " = " + this.transpile(attributePair.Right.Value) + ";\n";
            }

            for (let methodIdx in node.Value.Right.Values) {
                const methodPair = node.Value.Right.Values[methodIdx];

                proto += methodPair.Right.Modifiers + " " + methodPair.Left.Value + this.transpile(methodPair.Right.Value) + ";\n";
            }

            proto += "}";
            return proto;
        },

        IfStatement: (node: IfStatement): string => {
            return "if (" + this.transpile(node.Operand) + ") {\n" +
                        this.transpileBlock(node.Consequence.Values) +
                 "\n}" +
                 (node.Alternative ? 
                  ( " else {\n" + this.transpileBlock(node.Alternative.Values) + "\n}")
                  : ""
                );
        },

        ForStatement: (node: ForStatement): string => {
            var range = this.transpile(node.Operand), 
                counter = this.transpile(node.Element);

            return "for ("+counter+", "+range+") { " + this.transpileBlock(node.Consequence.Values) + "}"
             
        },

        WhileStatement: (node: WhileStatement): string => {
            return "while(" + this.transpile(node.Operand) + ") { "
                + this.transpileBlock(node.Consequence.Values)
                + " }";
        },

        SleepStatement: (node: SleepStatement): string => {
            var consequence = new FunctionLiteral("void", [], [], node.Consequence);
            return "sleep(" + this.transpile(node.Operand) + ") { "+this.transpile(consequence) + "}";
        },
    
        PretendNode: (node: Node): string => ""
        // TODO: add support for Statement types added during reincarnation 
    }

    constructor() {
        super();
    }
}