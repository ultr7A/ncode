import { printNativeString } from "../../../3_Operation_☀/3_util_(🔥)/4_2_browser-io-util.js"

export function printParserErrors(errors) {
    //console.error(MONKEY_FACE)
    printNativeString(null, "💢  You have invoked the wrath of\n");
    printNativeString(null, "❌  parser errors:\n");
    errors.forEach(function (msg) {
        printNativeString(null, "\t" + msg + "\n");
    });
}

export function introMessage() {
    //printNativeString(null, null, convolvrLogo);
    printNativeString(null, "╔═════╗");
    printNativeString(null, '║ ECS ║ Type help(); for documentation. ');
    printNativeString(null, "╚═════╝");
}