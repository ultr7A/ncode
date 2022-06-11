import { Node } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { DynamicFunction } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure";
import { ClassLiteral } from "./1_3_1_literal";

export class ConceptProjectorSelector {

    constructor(private pattern: string) { }

    public execute(node: ClassLiteral | DynamicFunction): ClassLiteral | DynamicFunction {
        const criteria = this.parsePattern(this.pattern);

        //TODO:

        return node;
    }


    private match(node: Node): Node[] {
        return [];
    }

    private parsePattern(pattern: string): unknown[] {
        return [];
    }

}