# CONTEXT ZONE
## ______________[Danger]
## _Abstract Built-in APIs_

These Built-in modules rely on an [at least one] external implementation.

They are shared between: 
- Runtime of compiled programs 
- REPL shell

```
If              [used in] 

a               program,

the             compiled form

of      these   modules
must be         copied
into

the             resulting source code.
------------------------------------

                Additonally,
an              underlying API implementation
must

be              supplied.
```