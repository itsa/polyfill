"use strict";

Array.prototype.indexOf || (Array.prototype.indexOf=function indexOf(searchElement) {
    var array = this,
        length = array.length,
        index = 0;
    for (index = 0; index < length; ++index) {
        if (array[index] === searchElement) {
            return index;
        }
    }
    return -1;
});