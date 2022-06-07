
export type TypeValidationResult = string | null;

export interface TypeValidator<Declaration, Assignment, Call, Construction> {

    validateDeclaration( declaration:  Declaration):    TypeValidationResult;
    validateAssignment(  assignment:   Assignment):     TypeValidationResult;
    validateCall(        call:         Call):           TypeValidationResult;
    validateConstruction(construction: Construction):   TypeValidationResult;
    
}