import { nodeObjects } from "../../4_Frame_⚡/4_io/1_file-system/2_compatibility";
import { JITCompiler } from "../2_compiler/1_3_jit/3_3_0_jit-compiler";
import { LinearShell } from "./1_2-shell-implementations/1_linear-shell";

const args = process.argv.slice(2);


const compiler = new JITCompiler();
const shell    = new LinearShell();