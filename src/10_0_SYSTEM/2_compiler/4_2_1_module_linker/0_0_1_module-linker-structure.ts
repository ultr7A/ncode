import { Module } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/module/module.js";

export interface ILinker<M> {
    
    link(module: Module<any>): M; 
    
}