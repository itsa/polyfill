"use strict";

/*
 * Returns the right transform-property for the current environment.
 *
 * `transform`, `-webkit-transform`, `-moz-transform`, `-ms-transform`, `-o-transform` or `undefined` when not supported
 */

// CAUTIOUS: need a copy of hashmap --> we cannot use js-ext/extra/hashap.js for that would lead to circular references!
var createHashMap = require('../bin/local-hashmap.js').createMap;

module.exports = function (window) {

    // NOTE: CANNOT use dependency to js-ext/lib/object.js --> would be circular!
    if (!window._ITSAmodules) {
        Object.defineProperty(window, '_ITSAmodules', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: createHashMap() // `writable` is false means we cannot chance the value-reference, but we can change {} its members
        });
    }

    if (window._ITSAmodules.Transition) {
        return window._ITSAmodules.Transition; // Transition was already created
    }

    var DOCUMENT_STYLE = window.document.documentElement.style,
        RANSITION = 'ransition',
        TRANSITION = 't'+RANSITION,
        VENDORS = ['-webkit-', '-moz-', '-ms-', '-o-'],
        transition;

    // Map transition properties to vendor-specific versions.
    // One-off required for cssText injection.
    if ((TRANSITION in DOCUMENT_STYLE) && (TRANSITION+'Property' in DOCUMENT_STYLE) &&
        (TRANSITION+'Duration' in DOCUMENT_STYLE) && (TRANSITION+'TimingFunction' in DOCUMENT_STYLE) && (TRANSITION+'Delay' in DOCUMENT_STYLE)) {
        transition = TRANSITION;
    }
    else {
        VENDORS.some(function(val) { // then vendor specific
            var property1 = val + TRANSITION,
                property2 = val + 'T'+RANSITION;
            ((typeof DOCUMENT_STYLE[property1] !== 'undefined') || (typeof DOCUMENT_STYLE[property2] !== 'undefined')) && (transition=property1);
            return transition;
        });
    }

    window._ITSAmodules.Transition = transition || TRANSITION;

    return transition;
};