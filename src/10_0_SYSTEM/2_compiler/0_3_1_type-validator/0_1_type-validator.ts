import { EObject } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure.js";

export type      TypeValidationResult = string | null;
export interface TypeValidator<Call, Construction, Arguments = EObject[]> {

  //validateDeclaration( declaration:  Declaration):                    TypeValidationResult;
  //validateAssignment(  assignment:   Assignment):                     TypeValidationResult;
    validateCall(        call:         Call,         args?: Arguments): TypeValidationResult;
    validateConstruction(construction: Construction, args?: Arguments): TypeValidationResult;

}