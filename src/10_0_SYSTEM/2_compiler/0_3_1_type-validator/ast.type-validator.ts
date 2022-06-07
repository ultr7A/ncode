import { NodeName_To_DataType } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/primitive/type.enum.js";
import { sprintf }              from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/1_ubiquitous-util";
import { CallExpression, NewExpression }     from "../../../03_0_Structure_🌴/1_ast/1_1_1_expression.js";
import { AssignmentStatement, LetStatement } from "../../../03_0_Structure_🌴/1_ast/1_2_1_statement.js";
import { getDataTypeByNodeName }             from "../../../03_0_Structure_🌴/1_ast/3_util_⚙/ast-util.js";
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

        const dataType = declaration.DataType;

        if (NodeName_To_DataType[declaration.Value.NodeName] !== dataType) {
            return sprintf("TypeError: Invalid DataType assigned: %s\n" +
                               "       Expected type:             %s",
                                dataType, getDataTypeByNodeName(declaration.Value));
        }
    }

    public validateAssignment(assignment: AssignmentStatement): string {
        //TODO: implement
        return null;
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