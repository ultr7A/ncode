import { AbstractTokenizer } from "../0_tokenizer/0_1_tokenizer-core/0_2_abstract-tokenizer";
import { CodeData, CodeCoordinates }  
                             from "../../01_2_Sequence_📘🌊/0_source/source-code";

export interface IShell<
                    Coordinates extends CodeCoordinates, 
                    Code extends CodeData, 
                    TokenizerType extends AbstractTokenizer<Coordinates, Code>
                > {

    colorizer: any;

    tokenizer: TokenizerType;

}