import { ParseResult, ParseTreeAnalysis } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/4_0_0_meta.js"
import { CodeData }          from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/source/source-code.js"

import { TokenizerOne }          from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one.js"
import { AbstractParser }        from "../0_2_abstract-parser/0_0_1_abstract-parser.js"
import { ExpressionParserOne }   from "../1_2_parser.implementation/1_1D/1_1_expression-parser.one.js"

import { AbstractToken }    from "../../../01_1_ELEMENT/1_token_💧/0_1_token-structure.js"
import { Token }            from "../../../01_1_ELEMENT/1_token_💧/2_1_token.js"
import { Program } from "../../../03_0_Structure_🌴/1_ast_🧩/1_0_1_root.js"
import { ModuleLinker } from "../../2_compiler/4_2_1_module-linker/1_1_0_module-linker.js"


 
export class Parser { 
 
    constructor(public linker: ModuleLinker, private workingPath = "") {}

    public diagnosticContext: ParseTreeAnalysis;
    public currentState: AbstractParser = null;
    

    private tokenizerOne: TokenizerOne = null;


    public setTokenizerOne(tokenizer: TokenizerOne): Parser {
        this.tokenizerOne = tokenizer;
        return this;
    }

    public transition(event: Token): AbstractParser<AbstractToken> {
        return null;
    }

    public get errors() {
        return this.currentState.Errors();
    }

    public loadSourceCode(data: CodeData): void {
        //if(this.currentState["loadSourceCode"]) {
            (this.currentState as ExpressionParserOne).loadSourceCode(data);
        //}
    }

    public getParseResult(): ParseResult {
        // if (this.currentState["getParseResult"]) {
            return (this.currentState as ExpressionParserOne).getParseResult()
        // }
    }


    public parseProgram(): Program {
        this.initializeCurrentState();
        return this.currentState.parseProgram();    
    }

    public handleTransition(event: Token): void { 


    }

    
    private initializeCurrentState() {
        this.currentState = this.currentState 
                            || 
            new ExpressionParserOne(
                this.tokenizerOne
                ||
                (() => {
                    console.log("Initializing new TokenizerOne");
                    return new TokenizerOne()
                })(),
                this.workingPath
            )
            .setModuleLinker(this.linker);
    }

}
