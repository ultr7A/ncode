import { Environment } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js"
import { TokenizerOne } from "../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one.js"
import { ExpressionParserOne } from "../1_parser/1_2_parser.implementation/1_1D/1_1_expression-parser.one.js"
import { ExpressionEvaluator } from "../2_compiler/1_3_jit/2_0_evaluator/2_0_evaluator.js"
import { printParserErrors } from "./3_1-shell-util/3_1-shell-util.js"

export function makeWebRepl(l: TokenizerOne, p: ExpressionParserOne, env: Environment, evaluator: ExpressionEvaluator) {
    console.log("start web REPL");
    var webEvaluate = function (text) {
        if (text[text.length - 1] != ";") {
            text = text + ";";
        }
        l.loadSourceCode(text);
        p.parse();
        var program = p.parseProgram(), evaluated;
        //console.log(JSON.stringify(program));
        if (p.Errors().length != 0) {
            printParserErrors(p.Errors());
            return;
        }
        evaluated = evaluator.Eval(program, env);
        if (evaluated != null) {
            if (evaluated.Inspect) {
                console.log(evaluated.Inspect());
                return evaluated.Inspect();
            }
        }
    };
    var win = 'window';
    var wind = eval(win) != undefined ? eval(win) : undefined;
    var document = wind ? wind.document : null;
    document.addEventListener("DOMContentLoaded", function () {
        var evaluateText = function () {
            document.querySelector("#ecs-output").innerHTML += webEvaluate(document.querySelector("#ecs-input").value.trim()) + "<br/>\n";
            document.querySelector("#ecs-input").value = '';
        };
        document.querySelector("#ecs-button").addEventListener("click", evaluateText, true);
        document.querySelector("#ecs-input").addEventListener("keydown", function (e) {
            if (e.keyCode == 13) {
                evaluateText();
            }
        }, true);
    });
}