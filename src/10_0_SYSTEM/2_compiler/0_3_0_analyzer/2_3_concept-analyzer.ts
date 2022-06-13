import { ParseTreeAnalysis } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/4_0_0_meta.js"
import { ConceptExpression } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { AbstractAnalyzer } from "./0_3_abstract-analyzer.js"


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