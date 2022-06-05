

import { ParseTreeAnalysis } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/4_0_0_meta.js"
import { IBlockStatement } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { Optimizer } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/system/optimizer.js"
import { DynamicFunction } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure.js"
import { ClassifiedObject } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js"
import { Environment }      from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js"

import { Transpiler } from "../../3_un-parser/2_token.unparser/0_abstract-un-parser/abstract-un-parser.js"
import { Analyzer } from "../0_3_analyzer/1_3_expression-analyzer.js"
import { ApplyFunctionFunction, EvalFunction } from "./0_0_jit-compiler-structure/0_3_3_eval-types"
import { ExpressionEvaluator } from "./2_0_evaluator/2_0_evaluator.js"

import { JSECSContextPlugin } from "./4_3_1_runtime-context-unparser-plugin.js"
import { JSECSEvaluatorContext } from "./4_3_2_hybrid-runtime-context.js"

/**
 * Optimizer reads complexity metrics from Parser
 * and is used by Evaluator where it transpiles complex code.
 *
 * If code is deemed complex, it is transpiled and run as a JS function.
 * A context is created from the Environment which is passed to the Transpiler.
 * After running the code, the return value is de-serialized back into ecs.
 */
export class RuntimeOptimizer implements Optimizer {

    private unparser: Transpiler;
    private unParserPlugin: JSECSContextPlugin;
    private analyzer: Analyzer;

    // ** DEPRECATED **
    private jsECSContext: JSECSEvaluatorContext;

    constructor(unparser: Transpiler, applyFunction: ApplyFunctionFunction, evaluator: ExpressionEvaluator) {
        this.unparser = unparser;
        this.unParserPlugin = new JSECSContextPlugin();
        this.analyzer = new Analyzer();

        // ** DEPRECATED **
        this.jsECSContext = new JSECSEvaluatorContext(applyFunction, evaluator.Eval);
        this.unParserPlugin.setUnParser(this.unparser);
    }

    public optimizedEvaluate(analysis: ParseTreeAnalysis, program: IBlockStatement, env: Environment, fallback: Function) {
        if (analysis && (analysis.hasLoops || analysis.hasRecursion)) {
            return this.runAsJS(
                program, 
                env, 
                this.unparser.transpile(
                    program, 
                    env, 
                    analysis, 
                    this.unParserPlugin.setParserAnalysis(
                        analysis, 
                        this.unparser.getBuiltinFunctionList()
                    )
                )
            );
        }
        
        return fallback();
    }

    public compileFunction(obj: DynamicFunction, env: Environment) {
        var auxParams = obj.Parameters.map(function (p) { return p.Value; });
        var analysis = this.analyzer.analyzeParseTree(obj.Body);
        var program = this.unparser.transpile(
            obj.Body, 
            env, 
            analysis, 
            this.unParserPlugin.setParserAnalysis(
                analysis, 
                this.unparser.getBuiltinFunctionList()
            )
        );

        const hotFunction = new Function(["ctx"].concat(auxParams) as unknown as string, program);
        const opt = this;
        return function () {
            //TODO: only pass context if function is impure
            return hotFunction.apply(null, Array.prototype.concat([
                // ** DEPRECATED **
                opt.jsECSContext
                    .setProgram(obj.Body)
                    .setEnv(env)
                // ^^^^^^^^^^^^^^^^^^^^^^
                // Something may need to replace this, parameter, however.

            ], arguments));
        };
    }

    public compileClass(obj: ClassifiedObject, env: Environment) {
        // TODO: implement
    }

    public runAsJS(parseTree: IBlockStatement, env: Environment, jsProgram: string) {
        var hotFunction = new Function(["ctx"] as unknown as string, jsProgram);
        //TODO: memoize
        return hotFunction(
            // ** DEPRECATED **
            this.jsECSContext
                .setProgram(parseTree)
                .setEnv(env)
        );
    }
}

