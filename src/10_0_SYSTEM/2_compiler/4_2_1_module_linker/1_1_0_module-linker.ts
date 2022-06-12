import { Module }  from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/module/module.js";
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
    public link(): Module<any> {
        return null;
    }

}