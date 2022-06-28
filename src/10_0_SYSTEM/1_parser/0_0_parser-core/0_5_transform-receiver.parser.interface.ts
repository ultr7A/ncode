import { 
    MethodTransformReceiverProcedure, 
    PropertyTransformReceiverExpression, 
    PropertyTransformReceiverFunction, 
    RuntimeTransformReceiverHandler, 
    TransformReceiver 
} from "../../../03_0_Structure_🌴/1_ast_🧩/1_3_2_1_transform.receiver.js";
import { IExpressionParser } from "./0_4_expression.parser.interface.js";


/***
 * 
 * 
 */
export interface TransformReceiverParser {

    setExpressionParser(parser: IExpressionParser): void;

    parseTransformReceiver():                   TransformReceiver;
    parsePropertyTransformReceiverExpression(): PropertyTransformReceiverExpression;
    parsePropertyTransformReceiverFunction():   PropertyTransformReceiverFunction;
    parseMethodTransformReceiverProcedure():    MethodTransformReceiverProcedure;
    parseRuntimeTransformReceiverHandler():     RuntimeTransformReceiverHandler;

}