import { Node    }           from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { ParseTreeAnalysis } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/4_0_0_meta";

import { EObject }          from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure";
import { Environment }      from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment";
import { ClassifiedObject } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_object";


/* *****************************
 * 
 *                                                                           */
export interface Evaluator<INPUT extends Node, OUTPUT extends EObject> {
    Eval(node: INPUT, env: Environment, objectContext?: ClassifiedObject, analysis?: ParseTreeAnalysis): OUTPUT;
}