import { TransformReceiver, PropertyTransformReceiverExpression, PropertyTransformReceiverFunction, MethodTransformReceiverProcedure, RuntimeTransformReceiverHandler } from "../../../../03_0_Structure_🌴/1_ast_🧩/1_3_2_1_transform.receiver.js";
import { IExpressionParser } from "../../0_0_parser-core/0_4_expression.parser.interface.js";
import { TransformReceiverParser } from "../../0_0_parser-core/0_5_transform-receiver.parser.interface.js";

export class TransformReceiverParserOne implements TransformReceiverParser {
    
    
    setExpressionParser(parser: IExpressionParser): void {
        this.parser = parser;
    }

    parseTransformReceiver(): TransformReceiver {
        throw new Error("Method not implemented.");
    }
    parsePropertyTransformReceiverExpression(): PropertyTransformReceiverExpression {
        throw new Error("Method not implemented.");
    }
    parsePropertyTransformReceiverFunction(): PropertyTransformReceiverFunction {
        throw new Error("Method not implemented.");
    }
    parseMethodTransformReceiverProcedure(): MethodTransformReceiverProcedure {
        throw new Error("Method not implemented.");
    }
    parseRuntimeTransformReceiverHandler(): RuntimeTransformReceiverHandler {
        throw new Error("Method not implemented.");
    }

    private parser: IExpressionParser;

}