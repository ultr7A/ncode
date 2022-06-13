import { ParseTreeAnalysis } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/4_0_0_meta";
import { NodeName_To_DataType } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/primitive/type.enum.js";
import { sprintf }              from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/1_ubiquitous-util";
import { CallExpression, NewExpression }     from "../../../03_0_Structure_🌴/1_ast_🧩/1_1_1_expression.js";
import { AssignmentStatement, LetStatement } from "../../../03_0_Structure_🌴/1_ast_🧩/1_2_1_statement.js";
import { getDataTypeByNodeName }             from "../../../03_0_Structure_🌴/1_ast_🧩/3_util_⚙/ast-util.js";
import { TypeValidator } from "./0_1_type-validator.js";

export class   ASTTypeValidator implements  TypeValidator
                                            <
                                                CallExpression,
                                                NewExpression
                                            > 
{

    public validateDeclaration(declaration: LetStatement): string {
        if (!declaration.Value || !declaration.DataType) {
            return null;
        }

        const expected = declaration.DataType;

        if (NodeName_To_DataType[declaration.Value.NodeName] !== expected) {
            return sprintf("TypeError: Invalid DataType assigned: %s\n" +
                               "       Expected type:             %s",
                                getDataTypeByNodeName(declaration.Value), expected);
        }
    }

    public validateAssignment(assignment: AssignmentStatement, analysis: ParseTreeAnalysis): string {
        
        const expected = analysis.declaredVariables[assignment.Subject.Value];

        if (NodeName_To_DataType[assignment.Operand.NodeName] !== expected) {
            return sprintf("TypeError: Invalid DataType assigned: %s\n" +
                               "       Expected type:             %s",
                               NodeName_To_DataType[assignment.Operand.NodeName], expected);
        }
    }

    public validateCall(call: CallExpression): string {
        //TODO: implement
        return null;
    }

    public validateConstruction(construction: NewExpression): string {
        //TODO: implement
        return null;
    }

}