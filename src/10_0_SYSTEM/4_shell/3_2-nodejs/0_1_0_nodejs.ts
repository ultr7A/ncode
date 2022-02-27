import { Environment } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment";

import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one";
import { Parser } from "../../1_parser/1_1_parser/3_1_1_parser";
import { ExpressionEvaluator } from "../../2_compiler/1_3_jit/2_0_evaluator/2_0_evaluator";
import { printParserErrors } from "../3_1-shell-util/3_1-shell-util";
import { Translator } from "./0_4_translator";


var lang = new Translator();


function done() {
    console.log('Exiting..');
    process.exit();
}


export const makeHandleInput = function (onInput) {
    return function (text) {
        if (text === 'quit\n' || text === 'exit\n') {
            done();
        }
        text = (text.search(/\n/) > -1 ? text.replace(/\n/g, "") : text);
        if (text[text.length - 2] != ";") {
            text = text + ";";
        }
        onInput(text);
    };
};

export const localEvaluate = function (
    text, 
    unparseTarget, 
    tokenizer: TokenizerOne, 
    p: Parser, 
    env: Environment, 
    replPlugins, 
    evaluator: ExpressionEvaluator
) {
    tokenizer.loadSourceCode(text);
    p.parseProgram();
    var program = p.parseProgram(), evaluated;
    if (p.errors.length != 0) {
        printParserErrors(p.errors);
        return;
    }
    if (unparseTarget) {
        if (replPlugins && replPlugins.transpilers) {
            var unparsers = replPlugins.transpilers;
            for (var tPlugin in unparsers) {
                lang.loadTranspiler(tPlugin, unparsers[tPlugin]);
            }
        }
        var unparser = lang.getTranspiler(unparseTarget);
        if (unparser) {
            console.log(unparser.transpile(program, null, p.diagnosticContext));
        }
        else {
            console.error("Missing compiler language support plugin: " + unparseTarget);
        }
    }
    else {
        evaluated = evaluator.Eval(program, env, null, p.diagnosticContext);
        if (evaluated != null) {
            if (evaluated.Inspect) {
                console.log(evaluated.Inspect());
                console.log("");
            }
        }
    }
};