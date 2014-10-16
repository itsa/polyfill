if (!Array.every) {
    (function (global) {
        "use strict";
        Array.prototype.every = function every(callback, scope) {
            var array = this,
                length = array.length,
                index = 0;
            for (index; index<length; ++index) {
                if (!callback.call(scope || global, array[index], index, array)) {
                    break;
                }
            }
            return (index === length);
        };
    }(typeof global !== 'undefined' ? global : /* istanbul ignore next */ this));
}