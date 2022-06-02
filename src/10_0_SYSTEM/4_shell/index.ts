import { nodeObjects } from "../../4_Frame_⚡/4_io/1_file-system/2_compatibility.js";
import { AOTCompiler } from "../2_compiler/1_1_aot/1_1_3_aot-compiler.js";
import { JITCompiler } from "../2_compiler/1_3_jit/3_3_0_jit-compiler.js";
import { SocketShell } from "./1_2-shell-implementations/0_socket-shell.js";
import { LinearShell } from "./1_2-shell-implementations/1_linear-shell.js";
import { CosmicShell } from "./1_2-shell-implementations/4_cosmic-shell.js";

export class Shell {

    public static start(): void {

        const args = process.argv.slice(2);
        let compiler

        if (args.length > 0 && (args[0] as string).match(/[\/\\a-zA-Z\.\-]+/)) {
            console.log("** Using AOTCompiler **");
            compiler = new AOTCompiler();
            

        } else { 
            console.log("** Using JITCompiler **");
            compiler = new JITCompiler();
            let shell;

            if (args.length > 0) {

                if (args[0]) {
                    if (args[0] == "-u" || args[0] == "--unparse" || args[0] == "-t" || args[0] == "--transpile") {
                        if (args.length < 3) {
                            console.log("not enough arguments to transpile: ecs -u js filename.ecs");
                        } else {
                            
                            compiler = new AOTCompiler();
                            compiler.compile(args[1], args[2])
                            
                        }
                    }
                }

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

    }
}

