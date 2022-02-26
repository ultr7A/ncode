import { CodeDataType } from "../../../01_2_Sequence_📘🌊/0_source/source-code";
import { NodeJSObjects } from "../../../4_Frame_⚡/4_io/1_file-system/2_compatibility";
import { Orient } from "../../0_0_system-structure/1_0_system-structure";
import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one";
import { JITCompiler } from "../../2_compiler/1_3_jit/3_3_0_jit-compiler";
import { makeCLIRepl } from "../0_1_nodejs";
import { AbstractShell } from "../2_abstract-shell";

export class LinearShell extends AbstractShell< number, 
                                                CodeDataType.String, 
                                                string, 
                                                Orient.ation.One > 
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
        makeCLIRepl(this.compiler.tokenizer, 
                    this.compiler.parser, 
                    this.compiler.environment, 
                    {}, 
                    this.compiler.evaluator)
    }
}