import { ModuleExport } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/module/module-export";
import { Module }  from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/module/module.js";
import { CodeData } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/source/source-code";
import { IBlockStatement } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { ILinker }                 from "./0_0_1_module-linker-structure.js";
import { ModuleLinkerEnvironment } from "./1_4_0_module-linker-environment.js";

/* ************************************ *
 * ModuleLinker                         *
 *                                      *
 * ************************************ */
export class ModuleLinker implements ILinker<Module<any>> {
    // Linking context:
    private environment: ModuleLinkerEnvironment;

    // Linking operation:
    public link<topology extends CodeData = any>(module: Module<topology>): Module<topology> {
        module.AST = this.transformModuleAST(module.AST, module.Exports); 
        return null;
    }

    transformModuleAST(program: IBlockStatement, moduleExports: ModuleExport[]): IBlockStatement {
        return null;
    }


}