import 
        { FloatLiteral, IntegerLiteral, StringLiteral, BooleanLiteral } 
from "../1_3_1_literal";

import { Node }     from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { NodeName } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum.js"
import { DataType } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/primitive/type.enum.js"

export function getDataTypeByNodeName(node: Node): string {
    var NodeName = node ? node.NodeName : "";
    switch (NodeName as NodeName) {
        case "Boolean":
            return DataType.BOOLEAN;
        case "IntegerLiteral":
            return DataType.INT;
        case "FloatLiteral":
            return DataType.FLOAT;
        case "ArrayLiteral":
            return DataType.ARRAY;
        case "HashLiteral":
            return DataType.HASH;
        case "ClassLiteral": 
            return DataType.CLASS_DEFINITION;
            
        //TODO: handle NewExpression
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
