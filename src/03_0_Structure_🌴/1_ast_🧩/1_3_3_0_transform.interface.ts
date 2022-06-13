import { Matrix4 } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/maths/matrix/matrix-4.js"

/**
 * 
 */
export interface ITransform<M extends number[] = Matrix4> {
    matrix: M;
}