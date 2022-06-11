import { Matrix4 } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/maths/matrix/matrix-4.js";
import { ITransform } from "./1_3_3_0_transform.interface.js";

/**
 

**/
export class      InstanceTransform<M extends number[] = Matrix4>
       implements ITransform<M> {
    public matrix: M;
}