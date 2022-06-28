import { ConceptReceiver } from "../../../../03_0_Structure_🌴/1_ast_🧩/2_4_1_concept.receiver.js";
import { ConceptProjection } from "../../../../03_0_Structure_🌴/1_ast_🧩/2_4_2_concept-projection.js";
import { ConceptProjectorSelector } from "../../../../03_0_Structure_🌴/1_ast_🧩/2_4_3_concept-projector-selector.js";
import { ConceptTransformationExpressionAbstraction } from "../../../../03_0_Structure_🌴/1_ast_🧩/2_4_5_concept-expression.abstraction.js";
import { ConceptTransformationStatementAbstraction } from "../../../../03_0_Structure_🌴/1_ast_🧩/2_4_6-concept-statement.abstraction.js";
import { IExpressionParser } from "../../0_0_parser-core/0_4_expression.parser.interface.js";
import { ConceptProjectionParser } from "../../0_0_parser-core/0_6_concept-projection-parser.interface.js";
import { ExpressionParserOne } from "./1_1_expression-parser.one.js";

export class ConceptProjectionParserOne implements ConceptProjectionParser {
   
    private parser: IExpressionParser;
   
    setExpressionParser(parser: IExpressionParser): void {
        this.parser =  parser;
    }
   
   
    parseConceptReceiver(): ConceptReceiver {
        throw new Error("Method not implemented.");
    }
    parseConceptProjection(): ConceptProjection {
        throw new Error("Method not implemented.");
    }
    parseConceptProjectorSelector(): ConceptProjectorSelector {
        throw new Error("Method not implemented.");
    }
    parseConceptTransformationExpressionAbstraction(): ConceptTransformationExpressionAbstraction {
        throw new Error("Method not implemented.");
    }
    parseConceptTransformationStatementAbstraction(): ConceptTransformationStatementAbstraction {
        throw new Error("Method not implemented.");
    }



}