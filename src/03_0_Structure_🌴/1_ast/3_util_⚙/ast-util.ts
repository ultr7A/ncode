import 
        { FloatLiteral, IntegerLiteral, StringLiteral, BooleanLiteral } 
from "../1_3_1_literal";

import { Node } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";

export function getDataTypeByNodeName(node: Node): string {
    var NodeName = node ? node.NodeName : "";
    switch (NodeName) {
        case "IntegerLiteral":
            return "int";
        case "FloatLiteral":
            return "float";
        case "BooleanLiteral":
            return "boolean";
        case "ArrayLiteral":
            return "array";
        case "HashLiteral":
            return "hash";
        // handle NewExpression
        default:
            return "any";
    }
}

var ZeroFloat = new FloatLiteral(0.0);
var ZeroInt = new IntegerLiteral(0);
var EmptyString = new StringLiteral("");
var FALSE = new BooleanLiteral(false);

export function getDefaultValueNodeForDataType(dataType: string): BooleanLiteral | IntegerLiteral | FloatLiteral | StringLiteral {
    switch (dataType) {
        case "int":
            return ZeroInt;
        case "float":
            return ZeroFloat;
        case "string":
            return EmptyString;
        case "boolean":
            return FALSE;
        default:
            return FALSE;
    }
}
