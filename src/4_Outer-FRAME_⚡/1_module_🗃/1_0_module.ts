import { CodeData } from "../../01_2_Sequence_📘🌊/0_source/source-code";

/** ************************************        ---------------------------
 * Module represents a Program, as....
 * 
 **/
(()=>{                               return {          
    hypothetical_Idea: [
    "╭┉┉┉┉┉┉┉┉┉┉┉┉┉┅┅┉┉┉┉┉┉┉┉┉┉┉┉╮"     +
    "┊                           ┊"     +  
    "┊ This is     **typically** ┊" +
    "| ████          a file,     ┊" +
    "|      and      █ ████      |" +
    "|                           |" + 
    "┊      could be a directory.|" +
    "┊               █ █████████ |" +
    "┊                           ┊"     +
    "╰┉┉┉┉┉┉┉┉┉┉┉┉┅┅┉┉┉┉┉┉┉┉┉┉┉┉┉╯",
    {           however:   {
                "depending": [
                    ['on', "module-structure.ts: ModuleTopology"],
                    ['Module can represent', 
                            ['a folder of files,', 
                               'functioning as', 
                               ['one',('volumetric text')  ]
                            ]                     
                    ]
                ]
            }
        }
    ]
};                                  })();
 
export class Module<ModuleTopology extends CodeData> {
    Name: string;
    Code: ModuleTopology;
    Dependencies: string[];
}