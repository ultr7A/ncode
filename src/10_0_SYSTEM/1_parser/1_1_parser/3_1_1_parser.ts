import { IBlockStatement, Node } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";

import { ModularLattice, StateMachine } from "../../0_0_system-structure/1_0_system-structure";

import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one";
import { AbstractParser } from "../0_2_abstract-parser/0_2_1_abstract-parser";

import { ConceptParserOne }   from "../1_2_parser.implementation/1_1D/2_1_concept-parser.one";
import { ConceptParserTwo }   from "../1_2_parser.implementation/2_2D/2_1_concept-parser.two";
import { ConceptParserThree } from "../1_2_parser.implementation/4_3D/2_1_concept-parser.three";

import { ExpressionParserOne }   from "../1_2_parser.implementation/1_1D/1_1_expression-parser.one";
import { ExpressionParserTwo }   from "../1_2_parser.implementation/2_2D/1_1_expression-parser.two";
import { ExpressionParserThree } from "../1_2_parser.implementation/4_3D/1_1_expression-parser.three";

import { TokenizerTwo }     from "../../0_tokenizer/1_2_tokenizer.implementation/2_2_1_tokenizer.two";
import { TokenizerThree }   from "../../0_tokenizer/1_2_tokenizer.implementation/2_4_1_tokenizer.three";
import { AbstractAnalyzer } from "../../2_compiler/0_3_analyzer/0_3_abstract-analyzer";
import { AbstractToken } from "../../../01_1_ELEMENT/1_token_💧/0_1_token-structure";
import { Token } from "../../../01_1_ELEMENT/1_token_💧/2_1_token";
import { ParseTreeAnalysis } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/4_0_0_meta";


export class Parser implements StateMachine  <AbstractParser<AbstractToken>, 
                               ModularLattice<AbstractParser<AbstractToken, Node, any, any, AbstractAnalyzer<Node, any, any> >, Token>> {
    
    public transition(event: Token): AbstractParser<AbstractToken> {
        return null;
    }

    public get errors() {
        return this.currentState.Errors();
    }

    public parseProgram() {
        return this.currentState.parseProgram();    
    }

    public handleTransition(event: Token): void { }

    public currentState: AbstractParser<AbstractToken, Node, any, any>;


    public diagnosticContext: ParseTreeAnalysis;

    public states = {
        modules: [
            { modules: 
                [                                                     //  todo: <      Key needs to be AbstractToken.     >
                    { module: new ExpressionParserOne(new TokenizerOne()),      key: "" as Token },
                    { module: new ConceptParserOne(new TokenizerOne()),         key: "" as Token }
                ]
            },
            { modules: 
                [
                    { module: new ExpressionParserTwo(new TokenizerTwo()),      key: "" as Token },
                    { module: new ConceptParserTwo(new TokenizerTwo()),         key: "" as Token }
                ]
            },
            { modules: 
                [
                    { module: new ExpressionParserThree(new TokenizerThree()),  key: "" as Token },
                    { module: new ConceptParserThree(new TokenizerThree()),     key: "" as Token }
                ]
            }
        ]
    };


}