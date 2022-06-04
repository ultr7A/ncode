import { ParseTreeAnalysis } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/4_0_0_meta.js"

import { TokenizerOne }          from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one.js"
import { AbstractParser }        from "../0_2_abstract-parser/0_0_1_abstract-parser.js"
import { ExpressionParserOne }   from "../1_2_parser.implementation/1_1D/1_1_expression-parser.one.js"

import { AbstractToken }    from "../../../01_1_ELEMENT/1_token_💧/0_1_token-structure.js"
import { Token }            from "../../../01_1_ELEMENT/1_token_💧/2_1_token.js"
import { Program } from "../../../03_0_Structure_🌴/1_ast/1_0_1_root.js"


 
export class Parser { 
 
    public diagnosticContext: ParseTreeAnalysis;
    public currentState: AbstractParser = null;
    

    private tokenizerOne: TokenizerOne = null;


    public setTokenizerOne(tokenizer: TokenizerOne): void {
        this.tokenizerOne = tokenizer;
    }

    public transition(event: Token): AbstractParser<AbstractToken> {
        return null;
    }

    public get errors() {
        return this.currentState.Errors();
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
                })()
            );
    }

}
