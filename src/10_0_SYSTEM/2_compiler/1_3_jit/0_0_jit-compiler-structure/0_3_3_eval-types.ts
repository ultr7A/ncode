import { ParseTreeAnalysis }        from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/4_0_0_meta";
import { Node }                     from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { ClassifiedObject }         from "wrapt.co_re/lib/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_object";
import { EObject, FunctionObject }  from "wrapt.co_re/lib/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure";
import { Environment }              from "wrapt.co_re/lib/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment";

import { Program } from "../../../../03_0_Structure_🌴/1_ast/1_0_1_root";


export type EvalFunction = (node: Node, env: Environment, objectContext?: ClassifiedObject, analysis?: ParseTreeAnalysis) => EObject;

export type EvalProgramFunction = (program: Program, env: Environment) => EObject;
export type EvalBodyAndApplyFunctionFn = (fn: FunctionObject, env: Environment, args: EObject[]) => EObject;
export type ApplyFunctionFunction = (fn: FunctionObject, env: Environment, args: EObject[], objectContext?: ClassifiedObject) => EObject;
