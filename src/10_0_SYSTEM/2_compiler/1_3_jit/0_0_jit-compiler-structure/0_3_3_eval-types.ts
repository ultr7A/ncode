import { Node } from "../../../../1_Structure_🌴/1_ast/0_1_0_structure-concept";

import { Program }           from "../../../../1_Structure_🌴/1_ast/1_0_1_root";
import { ParseTreeAnalysis } from "../../../../1_Structure_🌴/1_ast/4_0_0_meta";

import { EObject, FunctionObject } from "../../../../3_Operation_⏰/1_object_[⭕]/0_1_object-structure";
import { ClassifiedObject }        from "../../../../3_Operation_⏰/1_object_[⭕]/1_0_object";

import { Environment } from "../1_4_0_environment";


export type EvalFunction = (node: Node, env: Environment, objectContext?: ClassifiedObject, analysis?: ParseTreeAnalysis) => EObject;
export type EvalProgramFunction = (program: Program, env: Environment) => EObject;
export type EvalBodyAndApplyFunctionFn = (fn: FunctionObject, env: Environment, args: EObject[]) => EObject;
export type ApplyFunctionFunction = (fn: FunctionObject, env: Environment, args: EObject[], objectContext?: ClassifiedObject) => EObject;
