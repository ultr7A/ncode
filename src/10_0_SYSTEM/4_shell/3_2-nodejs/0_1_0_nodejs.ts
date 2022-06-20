import { Environment } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js"
import { Node } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one.js"
import { Parser } from "../../1_parser/1_1_parser/3_1_1_parser.js"
import { ExpressionEvaluator } from "../../2_compiler/1_3_jit/2_0_evaluator/2_0_evaluator.js"
import { printParserErrors } from "../3_1-shell-util/3_1-shell-util.js"
import { Translator } from "./0_4_translator.js"


var lang = new Translator();


function done() {
    console.log('Exiting..');
    process.exit();
}


export const makeHandleInput = function (
    onInput,

    tokenizer: TokenizerOne, 
    p: Parser, 
    env: Environment, 
    replPlugins, 
    evaluator: ExpressionEvaluator,
    unparseTarget = ""
) {
    return function (text) {
        if (text === 'quit\n' || text === 'exit\n') {
            done();
        }
        text = (text.search(/\n/) > -1 ? text.replace(/\n/g, "") : text);
        if (text[text.length - 2] != ";") {
            text = text + ";";
        }
        onInput(text, unparseTarget, tokenizer, p, env, replPlugins, evaluator);
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
    console.log("** localEvaluate **", text, unparseTarget);
    tokenizer.loadSourceCode(text);

    p.setTokenizerOne(tokenizer);
    
    let program = p.parseProgram(), evaluated;
    
    if (p.errors.length != 0) {
        printParserErrors(p.errors);
        return;
    }
    if (unparseTarget) {
        unparseWithConfig(program, p, unparseTarget, replPlugins);
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

export function unparseWithConfig(
    program:       Node, 
    parser:        Parser, 
    unparseTarget: string = "js",    
    replPlugins:   any
) {
    if (replPlugins && replPlugins.transpilers) {
        let unparsers = replPlugins.transpilers;

        for (let tPlugin in unparsers) {
            lang.loadTranspiler(tPlugin, unparsers[tPlugin]);
        }
    }
    let unparser = lang.getTranspiler(unparseTarget);

    if (unparser) {
        return unparser.transpile(program, null, parser.diagnosticContext);
    }
    else {
        console.error("Missing compiler language support plugin: " + unparseTarget);
    }
}