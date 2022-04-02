import { UnParser } from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/system/un-parser";
import { JSTranspiler } from "../../3_un-parser/2_token.unparser/2_un-parse_targets/1_1_javascript";

export class Translator {

    customUnParsers: { [_: string]: UnParser }

    constructor() {
        this.customUnParsers = {};
    }
    
    public loadTranspiler = function (languageName, t) {
        this.customTranspilers[languageName] = t;
    }

    public getTranspiler = function (languageName) {
        if (languageName === "js") {
            return new JSTranspiler();
        }
        else {
            return this.customTranspilers[languageName];
        }
    }
}