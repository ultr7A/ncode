import { Module }       from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/module/module.js"
import { ModuleExport } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/module/module-export.js"
import { ModuleImport } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/module/module-import.js"
import { AbstractEnvironment } from "../4_1_0_environment-structure/0_2_0-abstract-environment.js"

/***
 * 
 */
export class ModuleLinkerEnvironment extends AbstractEnvironment {

    
    public moduleExports = {} as { [fromModule: string]: ModuleExport[] }
    public modules =       {} as { [absoluteModulePath: string]: Module<any> } 

    // TODO: Make transpile-friendly
    public bundle: string = "const __module__";

    public registerModuleExport(fromModulePath: string, toName: string, moduleExport: ModuleExport) {
        this.moduleExports[fromModulePath].push(moduleExport);
    }


    public registerModule(modulePath: string, _module_: Module<any>): void {
        this.modules[modulePath]=_module_;
    }

    public reset() {
        this.moduleExports = {};
        this.modules       = {};
        // TODO: Make transpile-friendly
        this.bundle        = "const __module__";
    }   
    
}