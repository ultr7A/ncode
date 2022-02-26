import { nodeObjects } from "../../4_Frame_⚡/4_io/1_file-system/2_compatibility";
import { AOTCompiler } from "../2_compiler/1_1_aot/1_1_3_aot-compiler";
import { JITCompiler } from "../2_compiler/1_3_jit/3_3_0_jit-compiler";
import { LinearShell } from "./1_2-shell-implementations/1_linear-shell";
import { CosmicShell } from "./1_2-shell-implementations/2_cosmic-shell";
import { SocketShell } from "./1_2-shell-implementations/3_socket-shell";

const args = process.argv.slice(2);
let compiler

if (args.length > 0 && (args[0] as string).match(/[\/\\a-zA-Z\.\-]+/)) {
    compiler = new AOTCompiler();
    

}  else { 
    compiler = new JITCompiler();
    let shell;

    if (args.length > 0) {
        if (args[0] == "--cosmic") {
            shell = new CosmicShell(compiler, nodeObjects);
        } else if (args[0] == "--remote") {
            let server;

            shell = new SocketShell(compiler, server, nodeObjects)
        } else {
            console.log("Invalid option specified.");
        }
    } else {
        shell = new LinearShell(compiler, nodeObjects);
    }

    shell.listen();
}



