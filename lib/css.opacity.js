"use strict";

// based upon https://gist.github.com/amannm/4965459
module.exports = function (window) {
    window.CSSStyleDeclaration && (function(CSSStyleDeclarationPrototype) {
        CSSStyleDeclarationPrototype.opacity || Object.defineProperty(CSSStyleDeclarationPrototype, 'opacity', {
            get: function() {
                return '' + (parseFloat(((this.filter).substring(48)).replace(')', '')) / 100);
            },
            set: function(value) {
                this.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + Math.round(100 * value) + ')';
            }
        });
    }(window.CSSStyleDeclaration.prototype));
};