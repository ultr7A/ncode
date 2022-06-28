import { Statement } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js";
import { NodeName } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum.js";
import { Token } from "../../../01_1_ELEMENT/1_token_💧/2_1_token.js";
import { Program } from "../../../03_0_Structure_🌴/1_ast_🧩/1_0_1_root.js";
import { ExpressionStatement } from "../../../03_0_Structure_🌴/1_ast_🧩/1_2_1_statement.js";
import { AbstractParser } from "../0_2_abstract-parser/0_0_1_abstract-parser.js";
import { IExpressionParser } from "./0_4_expression.parser.interface.js";


export function parseProgram(parser: IExpressionParser & AbstractParser): Program {
    parser.reset();

    var Statements = [] as Statement[], 
        program = new Program(Statements);
    
    parser.nextToken();
    while (!parser.currentTokenIs(Token.EOF)) {
        var stmt = parser.parseStatement();
        if (stmt != null) {
            if (stmt.NodeName ==  NodeName.ExpressionStatement) {
                if ((stmt as ExpressionStatement).Operand == null) {
                    continue;
                }
            }
            program.Values.push(stmt);
        }
        parser.nextToken();
    }
    // console.log(JSON.stringify(parser.diagnosticContext, null, 2));
    // console.log(JSON.stringify(program, null, 2));
    return program;
}