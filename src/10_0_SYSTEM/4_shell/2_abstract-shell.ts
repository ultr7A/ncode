import { CodeCoordinates, CodeData, CodeDataType } from "../../01_2_Sequence_📘🌊/0_source/source-code";
import { Orientation_Type } from "../0_0_system-structure/1_0_system-structure";

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

    abstract listen(): void;
}