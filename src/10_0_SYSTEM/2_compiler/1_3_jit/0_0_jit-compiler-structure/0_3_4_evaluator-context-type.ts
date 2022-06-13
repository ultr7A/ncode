
import { Environment } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js"

import { Program } from "../../../../03_0_Structure_🌴/1_ast_🧩/1_0_1_root.js"
import { ApplyFunctionFunction } from "./0_3_3_eval-types.js"

export interface EvaluatorContext {
    applyFunction: ApplyFunctionFunction;
    setProgram: (program: Program) => EvaluatorContext;
    setEnv:     (env: Environment) => EvaluatorContext;
    getVar:     (identName: string) => any;
    setVar:     (identName: string, value: any) => any;
    call:       (identName: string, args: any[]) => any;
    callMethod  (className: string, methodName: string, args: any[], instance?: Record<string, unknown>): any;
    callBuiltin (identName: string, args: any[]): any;
}
