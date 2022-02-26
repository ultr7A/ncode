import { WebSocketRemoteShellServer } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/system/remote-shell-server";

import { CodeDataType } from "../../../01_2_Sequence_📘🌊/0_source/source-code";
import { NodeJSObjects } from "../../../4_Frame_⚡/4_io/1_file-system/2_compatibility";
import { Orient } from "../../0_0_system-structure/1_0_system-structure";
import { JITCompiler } from "../../2_compiler/1_3_jit/3_3_0_jit-compiler";
import { AbstractShell } from "../2_abstract-shell";

export class SocketShell extends AbstractShell<number, CodeDataType.String, string, Orient.ation.One> {
    
    constructor(public compiler: JITCompiler, public server: WebSocketRemoteShellServer, private nodeObjects: NodeJSObjects) {
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