import { Module } from "../../../02_1_LINK/1_module_🗃/1_0_module.js"
import { ILinker }                 from "./0_0_1_module-linker-structure.js"
import { ModuleLinkerEnvironment } from "./1_4_0_module-linker-environment.js"

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