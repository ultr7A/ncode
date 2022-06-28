import { ConceptReceiver }                            from "../../../03_0_Structure_🌴/1_ast_🧩/2_4_1_concept.receiver.js";
import { ConceptProjection }                          from "../../../03_0_Structure_🌴/1_ast_🧩/2_4_2_concept-projection.js";
import { ConceptProjectorSelector }                   from "../../../03_0_Structure_🌴/1_ast_🧩/2_4_3_concept-projector-selector.js";
import { ConceptTransformationExpressionAbstraction } from "../../../03_0_Structure_🌴/1_ast_🧩/2_4_5_concept-expression.abstraction.js";
import { ConceptTransformationStatementAbstraction }  from "../../../03_0_Structure_🌴/1_ast_🧩/2_4_6-concept-statement.abstraction.js";
import { IExpressionParser } from "./0_4_expression.parser.interface.js";

/****
 * 
 * 
 */
export interface ConceptProjectionParser {
 
    setExpressionParser(parser: IExpressionParser): void;

    parseConceptReceiver():          ConceptReceiver;
    parseConceptProjection():        ConceptProjection;
    parseConceptProjectorSelector(): ConceptProjectorSelector;

    parseConceptTransformationExpressionAbstraction(): ConceptTransformationExpressionAbstraction;
    parseConceptTransformationStatementAbstraction(): ConceptTransformationStatementAbstraction;

}