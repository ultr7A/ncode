import { CodeCoordinates, CodeData, CodeDataType } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/source/source-code.js";
import { Orientation_Type } from "../0_0_system-structure/1_0_system-structure.js"

export abstract class   AbstractShell<  CoordinateSystem  extends CodeCoordinates, 
                                        CodeType          extends CodeDataType, 
                                        TokenizerCodeType extends CodeData,
                                        Orientation       extends Orientation_Type >  {


    colorizer: null;
    coordinates: CodeCoordinates;

    abstract initCoordinates(): void;

    constructor() { }

    abstract handleUserInput(): void;

    abstract renderOutput(): void;

    abstract listen(args: string[]): void;
}