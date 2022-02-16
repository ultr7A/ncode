import { Program } from "../../../../1_Structure_🌴/1_ast/1_0_1_root";
import { Environment } from "../1_4_0_environment";
import { ApplyFunctionFunction } from "./0_3_3_eval-types";

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
