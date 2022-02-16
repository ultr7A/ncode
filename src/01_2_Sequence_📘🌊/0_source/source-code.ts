
export type CodeCoordinates = number | [number, number] | [number, number, number];
export type CodeData        = string | string[] | string[][];

export interface SourceContext<CoordinateSystem extends CodeCoordinates> { 
    position:     CoordinateSystem,
    readPosition: CoordinateSystem, 
}

/**
 *  📘🔢
 *  Source code, represented across 1 or more dimensions:
 */
export interface SourceCode<CoordinateSystem extends CodeCoordinates, Data extends CodeData> {
    coordinates: SourceContext<CoordinateSystem>,
    code: Data;
}