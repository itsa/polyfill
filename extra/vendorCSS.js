"use strict";

/*
 * Returns the vendor-specific transform-property for the current environment.
 *
 * `transform`, `-webkit-transform`, `-moz-transform`, `-ms-transform`, `-o-transform` or `undefined` when not supported
 */

require('js-ext/lib/object.js');

var toCamelCase = function(input) {
        return input.replace(/-(.)/g, function(match, group) {
            return group.toUpperCase();
        });
    },
    UNDEFINED = 'undefined';

module.exports = function (window) {

    if (!window._ITSAmodules) {
        Object.defineProperty(window, '_ITSAmodules', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: {} // `writable` is false means we cannot chance the value-reference, but we can change {} its members
        });
    }

    if (window._ITSAmodules.VendorCSS) {
        return window._ITSAmodules.VendorCSS; // VendorCSS was already created
    }

    var DOCUMENT_STYLE = window.document.documentElement.style,
        RUNNING_ON_NODE = (typeof global !== 'undefined') && (global.window!==window),
        VENDORS = ['-webkit-', '-moz-', '-ms-', '-o-'],
        vendorCSS;

    window._ITSAmodules.VendorCSS = vendorCSS = {
        generator: function(cssProperty) {
            var vendorProperty;
            if (cssProperty==='') {
                return '';
            }
            if (!RUNNING_ON_NODE && !vendorCSS.cssProps[cssProperty]) {
                if (typeof DOCUMENT_STYLE[cssProperty] !== UNDEFINED) {
                    vendorProperty = cssProperty;
                }
                else {
                    VENDORS.some(function(val) { // then vendor specific
                        var property = val + cssProperty,
                            propertyCamelCase = toCamelCase(property);
                        if ((typeof DOCUMENT_STYLE[property] !== UNDEFINED) || (typeof DOCUMENT_STYLE[propertyCamelCase] !== UNDEFINED)) {
                            vendorProperty = property;
                        }
                        return vendorProperty;
                    });
                }
                vendorCSS.cssProps[vendorProperty] = true;
            }
            return vendorProperty || cssProperty;
        },

        cssProps: {}
    };

    return vendorCSS;
};