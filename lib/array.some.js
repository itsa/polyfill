if (!Array.some) {
    (function (global) {
        "use strict";
        Array.prototype.some = function some(callback, scope) {
            var array = this,
                length = array.length,
                index = 0;
            for (index = 0; index<length; ++index) {
                if (callback.call(scope || global, array[index], index, array)) {
                    break;
                }
            }
            return (index === length);
        };
    }(typeof global !== 'undefined' ? global : /* istanbul ignore next */ this));
}


