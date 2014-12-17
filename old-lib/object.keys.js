"use strict";

if (!Object.keys) {
    var hasOwnProp = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    Object.keys = function(obj) {
        var result = [], prop, i;

        for (prop in obj) {
            if (hasOwnProp.call(obj, prop)) {
                result.push(prop);
            }
        }

        if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProp.call(obj, dontEnums[i])) {
                    result.push(dontEnums[i]);
                }
            }
        }
        return result;
    };
}