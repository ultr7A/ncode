import { Module } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/module/module.js";

/**
 * 
 * 
 */
export class AOTBundler {
    private items = [];
    
    public setItems(items: any[]): AOTBundler {
        this.items = items;
        return this;
    }

    public loadModules(modules: {[modulePath: string]: Module<any>}): AOTBundler {
        this.items = Object.values(modules);
        return this;
    }

    public bundle(): string {
        return this.items.join("\n")+"";
    }
}