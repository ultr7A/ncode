export function platformSpecificCallNoSpread(scope, nodeImpl: Function, webImpl: Function, args?: any[]) {
    if (typeof Window == 'undefined' && typeof self === 'undefined') {
        return nodeImpl(scope, args);
    }
    else if (self.document != undefined) {
        return webImpl(scope, args);
    }
}

export function platformSpecificCall(scope: Record<string, unknown>, 
    nodeImpl: Function, webImpl: Function, args?: any[]) 
{
    if (typeof Window == 'undefined' && typeof self === 'undefined') {
        if (args) {
            return nodeImpl.apply(void 0, [ scope, ...args]);
        }
        else {
            return nodeImpl( scope, []);
        }
    } else if (self.document != undefined) {
        if (args) {
            return webImpl.apply(void 0, [ scope, ...args]);
        }
        else {
            return webImpl( scope, []);
        }
    }
}