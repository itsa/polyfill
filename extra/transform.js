"use strict";

/*
 * Returns the vendor-specific transform-property for the current environment.
 *
 * `transform`, `-webkit-transform`, `-moz-transform`, `-ms-transform`, `-o-transform` or `undefined` when not supported
 */

require('js-ext/lib/object.js');

module.exports = function (window) {

    if (!window._ITSAmodules) {
        Object.defineProperty(window, '_ITSAmodules', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: {} // `writable` is false means we cannot chance the value-reference, but we can change {} its members
        });
    }

    if (window._ITSAmodules.Transform) {
        return window._ITSAmodules.Transform; // Transform was already created
    }

    var DOCUMENT_STYLE = window.document.documentElement.style,
        VENDORS = ['-webkit-', '-moz-', '-ms-', '-o-'],
        RANSFORM = 'ransform',
        TRANSFORM = 't'+RANSFORM,
        transform;

    // Map transition properties to vendor-specific versions.
    // One-off required for cssText injection.
    if (typeof DOCUMENT_STYLE.transform !== 'undefined') {
        transform = TRANSFORM;
    }
    else {
        VENDORS.some(function(val) { // then vendor specific
            var property1 = val + TRANSFORM,
                property2 = val + 'T'+RANSFORM;
            ((typeof DOCUMENT_STYLE[property1] !== 'undefined') || (typeof DOCUMENT_STYLE[property2] !== 'undefined')) && (transform=property1);
            return transform;
        });
    }

    window._ITSAmodules.Transform = transform;

    return transform;
};