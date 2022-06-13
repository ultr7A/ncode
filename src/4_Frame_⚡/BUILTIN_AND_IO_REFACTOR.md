# Auto-Lexical Built-in Function  Implementation   Refactor:
-------------------------------------------------------------

-   _BuiltinFunctionObject 
    
    should 
    take
  
    
    string filePath   parameter

    instead
    of

    TypeScript  function-literal.


-   Special fields in jsScope, 
   
    such 
    as
    RegExp, node.js-specific terminal-size detection, etc 

    need 

    to  be  registered as a target-language specific 
                            implementation
                              
    -   with each un-parser implementation.        



