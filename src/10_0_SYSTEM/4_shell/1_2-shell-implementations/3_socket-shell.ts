import { WebSocketRemoteShellServer } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/system/remote-shell-server";

import { CodeDataType } from "../../../01_2_Sequence_📘🌊/0_source/source-code";
import { Orient } from "../../0_0_system-structure/1_0_system-structure";
import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one";
import { AbstractShell } from "../2_abstract-shell";

export class SocketShell extends AbstractShell<number, CodeDataType.String, string, Orient.ation.One> {
    
    constructor(public tokenizer: TokenizerOne, public server: WebSocketRemoteShellServer) {
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