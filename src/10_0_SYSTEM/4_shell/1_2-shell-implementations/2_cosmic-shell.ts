import { CodeData, CodeDataType } from "../../../01_2_Sequence_📘🌊/0_source/source-code";
import { Orient } from "../../0_0_system-structure/1_0_system-structure";
import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one";
import { TokenizerThree } from "../../0_tokenizer/1_2_tokenizer.implementation/2_4_1_tokenizer.three";
import { AbstractShell } from "../2_abstract-shell";

export class CosmicShell  extends AbstractShell
                                <
                                        [number,number,number], 
                                        CodeDataType.Geometry, 
                                        string[][],
                                        Orient.ation.WXYZ
                                > 
{

    constructor(public tokenizer: TokenizerOne) {
        super();
    }

    public initCoordinates() {
        this.coordinates = 0;
    }

    public handleUserInput(): void {
        
    }

    
    public renderOutput(): void {
        
    }
}