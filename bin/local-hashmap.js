"use strict";

var merge = function (source, target) {
        var keys = Object.keys(source),
            l = keys.length,
            i = -1,
            key;
        while (++i < l) {
            key = keys[i];
            target[key] = source[key];
        }
    },
    hashMap = function(members) {
        // important to set the prototype to `null` --> this will exclude any Object.prototype members
        var obj = Object.create(null);
        merge(members, obj);
        return obj;
    };

module.exports = {
    createMap: hashMap
};