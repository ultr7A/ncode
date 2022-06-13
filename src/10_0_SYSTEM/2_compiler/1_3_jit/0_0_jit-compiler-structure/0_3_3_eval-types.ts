import { ParseTreeAnalysis }        from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/4_0_0_meta.js"
import { Node }                     from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { ClassifiedObject }         from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js"
import { EObject, FunctionObject }  from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure.js"
import { Environment }              from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js"

import { Program } from "../../../../03_0_Structure_🌴/1_ast_🧩/1_0_1_root.js";


export type EvalFunction = (node: Node, env: Environment, objectContext?: ClassifiedObject, analysis?: ParseTreeAnalysis) => EObject;

export type EvalProgramFunction = (program: Program, env: Environment) => EObject;
export type EvalBodyAndApplyFunctionFn = (fn: FunctionObject, env: Environment, args: EObject[]) => EObject;
export type ApplyFunctionFunction = (
    fn: FunctionObject, 
    env: Environment, 
    args: EObject[], 
    objectContext?: ClassifiedObject
) => EObject;
