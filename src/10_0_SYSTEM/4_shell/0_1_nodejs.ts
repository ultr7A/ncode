import { Environment } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment";
import { forceSingleLine } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/util/1_ubiquitous-util";
import { getSourceFile, readWholeFile } from "../../3_Operation_☀/3_util_(🔥)/4_0_io-util";
import { nodeObjects } from "../../4_Frame_⚡/4_io/1_file-system/2_compatibility";
import { TokenizerOne } from "../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one";
import { Parser } from "../1_parser/1_1_parser/3_1_1_parser";
import { ExpressionParserOne } from "../1_parser/1_2_parser.implementation/1_1D/1_1_expression-parser.one";
import { ExpressionEvaluator } from "../2_compiler/1_3_jit/2_0_evaluator/2_0_evaluator";
import { Translator } from "./0_4_translator";
import { printParserErrors, introMessage } from "./3_1-shell-util/3_1-shell-util";

var fs = require("fs");

function done() {
    console.log('Exiting..');
    process.exit();
}

var lang = new Translator();

export function makeCLIRepl(tokenizer: TokenizerOne, p: Parser, env: Environment, replPlugins, evaluator: ExpressionEvaluator) {
    nodeObjects.fs = fs;
    nodeObjects.Buffer = Buffer;
    nodeObjects.process = process;
    var makeHandleInput = function (onInput) {
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

    var localEvaluate = function (text, transpile) {
        tokenizer.loadSourceCode(text);
        p.parseProgram();
        var program = p.parseProgram(), evaluated;
        if (p.errors.length != 0) {
            printParserErrors(p.errors);
            return;
        }
        if (transpile) {
            if (replPlugins && replPlugins.transpilers) {
                var unparsers = replPlugins.transpilers;
                for (var tPlugin in unparsers) {
                    lang.loadTranspiler(tPlugin, unparsers[tPlugin]);
                }
            }
            var unparser = lang.getTranspiler(transpile);
            if (unparser) {
                console.log(unparser.transpile(program, null, p.diagnosticContext));
            }
            else {
                console.error("Missing compiler language support plugin: " + transpile);
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

    return function (args) {
        var transpile;
        if (args && args.length >= 1 && args[0]) {
            if (args[0] == "-u" || args[0] == "--unparse" || args[0] == "-t" || args[0] == "--transpile") {
                if (args.length < 3) {
                    console.log("not enough arguments to transpile: ecs -u js filename.ecs");
                }
                transpile = args[1];
                args = args.slice(2);
            }
            getSourceFile(args[0], readWholeFile, fs).then(function (data) {
                localEvaluate(forceSingleLine(data), transpile);
            }).catch(function (err) { console.log(err); });
        }
        else {
            introMessage();
            process.stdin.resume();
            process.stdin.setEncoding('utf8');
            process.stdin.on('data', makeHandleInput(localEvaluate));
        }
    };
}
