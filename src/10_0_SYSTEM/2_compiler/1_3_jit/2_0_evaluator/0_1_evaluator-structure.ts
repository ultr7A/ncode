import { Node    }           from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { ParseTreeAnalysis } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/4_0_0_meta";

import { EObject }          from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure";
import { Environment }      from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment";
import { ClassifiedObject } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object";


/* *****************************
 * 
 *                                                                           */
export interface Evaluator<INPUT extends Node, OUTPUT extends EObject> {
    Eval(node: INPUT, env: Environment, objectContext?: ClassifiedObject, analysis?: ParseTreeAnalysis): OUTPUT;
}