import { ConceptExpression } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { ConceptObject } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js"
import { Evaluator } from "./0_1_evaluator-structure.js"

/**
 * 
 */
export class ConceptEvaluator implements Evaluator<ConceptExpression, ConceptObject> {
    public Eval(exp: ConceptExpression): ConceptObject {
        return null; //TODO: !
    }
}