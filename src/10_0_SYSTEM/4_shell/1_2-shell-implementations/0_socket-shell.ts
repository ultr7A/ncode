import { WebSocketRemoteShellServer } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/system/remote-shell-server.js"

import { CodeDataType} from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/source/source-code.js"
import { NodeJSObjects } from "../../../4_Frame_⚡/4_io/1_file-system/2_compatibility.js"
import { Orientation_One } from "../../0_0_system-structure/1_0_system-structure.js"
import { JITCompiler } from "../../2_compiler/1_3_jit/3_3_0_jit-compiler.js"
import { AbstractShell } from "../2_abstract-shell.js"

export class SocketShell extends AbstractShell<number, CodeDataType.String, string, Orientation_One> {
    
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