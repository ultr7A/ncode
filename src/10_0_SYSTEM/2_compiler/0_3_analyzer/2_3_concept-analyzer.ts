import { ConceptExpression } from "../../../1_Structure_🌴/1_ast/0_1_0_structure-concept";
import { ParseTreeAnalysis } from "../../../1_Structure_🌴/1_ast/4_0_0_meta";
import { AbstractAnalyzer } from "./0_3_abstract-analyzer";


export class ConceptDiagnosticContext {
    constructor() {

    }
}


/***
 * ConceptAnalyzer
 * 
 * TODO: explain this, even though the name says a great deal.
 */
export class ConceptAnalyzer extends AbstractAnalyzer<ConceptExpression, ParseTreeAnalysis, ConceptDiagnosticContext> {
   
    constructor() {
        super(ConceptDiagnosticContext);
    }

    analyzeNode(node: ConceptExpression, analysis: ParseTreeAnalysis): ParseTreeAnalysis {
   
        //TODO: Give this block /["some"-"a lot"]/+ of  /^[love]+/

        switch(node.NodeName) {
            case "":

            break;


            case "":

            break;


            case "":

            break;


            case "":

            break;
        }

        
        // TODO: (Do not... \/ \/ \/)
        throw new Error("Method not implemented.");
    }

}