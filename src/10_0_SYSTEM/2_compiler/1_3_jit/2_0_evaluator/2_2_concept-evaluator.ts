import { ConceptExpression } from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { ConceptObject } from "wrapt.co_re/lib/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_object";
import { Evaluator } from "./0_1_evaluator-structure";

/**
 * 
 */
export class ConceptEvaluator implements Evaluator<ConceptExpression, ConceptObject> {
    public Eval(exp: ConceptExpression): ConceptObject {
        return null; //TODO: !
    }
}