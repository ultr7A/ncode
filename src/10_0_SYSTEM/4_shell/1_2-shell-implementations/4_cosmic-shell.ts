import { CodeData, CodeDataType } from "../../../01_2_Sequence_📘🌊/0_source/source-code.js"
import { NodeJSObjects } from "../../../4_Frame_⚡/4_io/1_file-system/2_compatibility.js"
import { Orientation_WXYZ } from "../../0_0_system-structure/1_0_system-structure.js"
import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one.js"
import { TokenizerThree } from "../../0_tokenizer/1_2_tokenizer.implementation/2_4_1_tokenizer.three.js"
import { JITCompiler } from "../../2_compiler/1_3_jit/3_3_0_jit-compiler.js"
import { AbstractShell } from "../2_abstract-shell.js"

export class CosmicShell  extends AbstractShell
                                <
                                        [number,number,number], 
                                        CodeDataType.Geometry, 
                                        string[][],
                                        Orientation_WXYZ
                                > 
{

    constructor(public compiler: JITCompiler, private nodeObjects: NodeJSObjects) {
        super();
    }

    public initCoordinates() {
        this.coordinates = 0;
    }

    public handleUserInput(): void {
        
    }

    
    public renderOutput(): void {
        
    }

    
    public listen(): void {
        
    }
}