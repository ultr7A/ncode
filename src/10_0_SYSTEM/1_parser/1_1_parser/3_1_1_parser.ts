import { ParseTreeAnalysis } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/4_0_0_meta";

import { TokenizerOne }          from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one";
import { AbstractParser }        from "../0_2_abstract-parser/0_0_1_abstract-parser";
import { ExpressionParserOne }   from "../1_2_parser.implementation/1_1D/1_1_expression-parser.one";

import { AbstractToken }    from "../../../01_1_ELEMENT/1_token_💧/0_1_token-structure";
import { Token }            from "../../../01_1_ELEMENT/1_token_💧/2_1_token";
import { Program } from "../../../03_0_Structure_🌴/1_ast/1_0_1_root";


 
export class Parser { 
                      
    public transition(event: Token): AbstractParser<AbstractToken> {
        return null;
    }

    public get errors() {
        return this.currentState.Errors();
    }

    public parseProgram(): Program {
        return this.currentState.parseProgram();    
    }

    public handleTransition(event: Token): void { 


    }

    public currentState: AbstractParser = new ExpressionParserOne(new TokenizerOne());

    public diagnosticContext: ParseTreeAnalysis;

}