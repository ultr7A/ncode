import { DynamicFunction, EObject } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure";
import { ClassifiedObject }         from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object";
import { sprintf }                  from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/1_ubiquitous-util";

import { TypeValidator } from "./0_1_type-validator";

export class   ObjectTypeValidator implements  TypeValidator
                                            <
                                                DynamicFunction,
                                                ClassifiedObject,
                                                EObject[]
                                            > 
{

    public validateCall(        call: DynamicFunction,       args: EObject[]): string {
        const   params = call.Parameters;

        for (const idx in params) {
            const param = params[idx];

            if (args[idx].Type() !== call.ParameterTypes[idx]) {
                return sprintf("TypeError: Invalid argument passed: %s\n" +
                               "           Expected parameter type: %s",
                                args[idx].Type(), call.ParameterTypes[idx]);

            }
        }
    }

    public validateConstruction(construction: ClassifiedObject, args: EObject[]): string {
        //TODO:
        return null; // Not implemeneted
    }

}