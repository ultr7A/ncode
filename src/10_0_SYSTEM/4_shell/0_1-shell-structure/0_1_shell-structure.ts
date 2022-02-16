import { CodeCoordinates, CodeData } from "../../../2_Sequence_📘🌊/0_source/source-code";
import { AbstractTokenizer } from "../../0_tokenizer/0_1_tokenizer-core/0_2_abstract-tokenizer";

export interface IShell<
                    Coordinates extends CodeCoordinates, 
                    Code extends CodeData, 
                    TokenizerType extends AbstractTokenizer<Coordinates, Code>
                > {

    colorizer: any;

    tokenizer: TokenizerType;

}