import { ConceptExpression } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { ConceptObject } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object";
import { Evaluator } from "./0_1_evaluator-structure";

/**
 * 
 */
export class ConceptEvaluator implements Evaluator<ConceptExpression, ConceptObject> {
    public Eval(exp: ConceptExpression): ConceptObject {
        return null; //TODO: !
    }
}