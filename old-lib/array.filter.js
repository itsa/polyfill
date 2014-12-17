if (!Array.filter) {
    (function (global) {
        "use strict";
        Array.prototype.filter = function filter(callback, scope) {
            var array = this,
                arrayB = [],
                length = array.length,
                element, index;

            for (index = 0; index<length; ++index) {
                element = array[index];
                if (callback.call(scope || global, element, index, array)) {
                    arrayB.push(element);
                }
            }

            return arrayB;
        };
    }(typeof global !== 'undefined' ? global : /* istanbul ignore next */ this));
}


