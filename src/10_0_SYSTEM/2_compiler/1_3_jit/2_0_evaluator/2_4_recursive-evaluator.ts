import { InspectionType } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure.js"
import { Environment } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js"
import { forceSingleLine } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/1_ubiquitous-util.js"
import { Program } from "../../../../03_0_Structure_🌴/1_ast/1_0_1_root.js"

import { Parser }       from "../../../1_parser/1_1_parser/3_1_1_parser.js"
import { EvalFunction, EvalProgramFunction } from "../0_0_jit-compiler-structure/0_3_3_eval-types.js"
import { ExpressionEvaluator } from "./2_0_evaluator.js"



export class RecursiveEvaluator {
    private evalProgram: EvalProgramFunction;
    private eval: Function;

    private parser: Parser;

    constructor (_parser, evaluator: ExpressionEvaluator) {
        this.parser = _parser;
        this.eval = evaluator.Eval;
        this.evalProgram = evaluator.evalProgram;
    }

    public makeEnvironment(outer: Environment) { 
        return new Environment(outer); 
    }

    public parse(code: string, onError: (errors: string[]) => void): Program {
        code = /\n/.test(code) ? forceSingleLine(code) : code;
        
        // if ((this.tokenizer as TokenizerOne).loadSourceCode) {
        //     (this.tokenizer as TokenizerOne).loadSourceCode(code);
        // }

        const program = (this.parser as Parser).parseProgram();

        if (this.parser.errors.length != 0) {
            onError && onError(this.parser.errors);
            return;
        }

        return program;
    }

    public evaluateProgram(program: Program, env: Environment, onErrors?: Function): InspectionType | null {
        if (program == undefined || program.Values == undefined) {
            return null;
        }

        const evaluated = this.evalProgram(program, env);
        if (evaluated != null) {
            if (evaluated.Inspect) {
                return evaluated.Inspect();
            } else {
                return null;
            }
        }
    }

    public parseAndEvaluate(text: string, env: Environment, onErrors: (errors: string[]) => void, joinNewLines = true): InspectionType | null {
       
        // if ((this.tokenizer as TokenizerOne).loadSourceCode) {
        //     text = joinNewLines ? forceSingleLine(text) : text;
        //     (this.tokenizer as TokenizerOne).loadSourceCode(text);
        // }
        
        let program = this.parser.parseProgram();

        if (this.parser.errors.length != 0) {
            onErrors && onErrors(this.parser.errors);
            return;
        }

        const evaluated = this.eval(program, env, null, this.parser.diagnosticContext);

        if (evaluated != null) {
            if (evaluated.Inspect) {
                return evaluated.Inspect();
            } else {
                return null;
            }
        }
    }
}


export function makeRuntimeEnvironment(evaluator: ExpressionEvaluator, parser: Parser) { //evalFunction: EvalFunction, evalProgram: EvalProgramFunction) {
    return new RecursiveEvaluator(parser, evaluator);
};