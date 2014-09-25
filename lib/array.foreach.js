if (!Array.forEach) {
    (function (global) {
        "use strict";
        Array.prototype.forEach = function forEach(callback, scope) {
            var array = this,
                length = array.length,
                index = 0;
            for (index = 0; index<length; ++index) {
                callback.call(scope || global, array[index], index, array);
            }
        };
    }(typeof global !== 'undefined' ? global : /* istanbul ignore next */ this));
}


