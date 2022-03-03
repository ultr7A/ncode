


export function platformSpecificCallNoSpread(scope, nodeImpl: Function, webImpl: Function, args?: any[]) {
    if (eval('typeof Window') == 'undefined' && eval('typeof self') === 'undefined') {
        return nodeImpl(scope, args);
    }
    else if (eval('self').document != undefined) {
        return webImpl(scope, args);
    }
}




export function platformSpecificCall<R = Promise<unknown>, CTX = any>(scope: CTX,//Record<string, unknown>, 
    nodeImpl: Function, webImpl: Function, args?: any[]): R 
{
    if (eval('typeof Window') == 'undefined' && eval('typeof self') === 'undefined') {
        if (args) {
            return nodeImpl.apply(void 0, [ scope, ...args]);
        }
        else {
            return nodeImpl( scope, []);
        }
    } else if (eval('self').document != undefined) {
        if (args) {
            return webImpl.apply(void 0, [ scope, ...args]);
        }
        else {
            return webImpl( scope, []);
        }
    }
}