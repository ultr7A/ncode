import { CodeData } from "../../01_2_Sequence_📘🌊/0_source/source-code";


 
export class Module<ModuleTopology extends CodeData> {
    Name: string;
    Code: ModuleTopology;
    Dependencies: string[];
}